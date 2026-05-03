<script lang="ts">
	import { createMutation, useQueryClient } from "@tanstack/svelte-query";
	
	import {
        normalizeFolder,
        clampQuality
    }                       from "$lib/form";
	import type {
        FormState,
        ImageFormatOption
    }                       from "$lib/types";
    import TextInput        from "$lib/components/shared/TextInput.svelte";
	import NumberInput      from "$lib/components/shared/NumberInput.svelte";
	import Select           from "$lib/components/shared/Select.svelte";
	import SwitchInput      from "$lib/components/shared/SwitchInput.svelte";
	import SliderInput      from "$lib/components/shared/SliderInput.svelte";
	import DropzoneUploader from "$lib/components/shared/DropzoneUploader.svelte";
	import Dialog           from "$lib/components/shared/Dialog.svelte";


    let {
		open          = $bindable( false ),
		initialFolder = ""
	} = $props<{ 
		open?          : boolean; 
		initialFolder? : string;
	}>( );


    let selectedFile: File | null = $state( null );
	let form: FormState           = $state({
		// svelte-ignore state_referenced_locally
		folder         : initialFolder || "",
		format         : "avif",
		width          : null,
		height         : null,
		keepDims       : true,
		useOriginal    : true,
		quality        : 50,
		transformation : ""
	});


    const queryClient = useQueryClient( );


    const uploadMutation = createMutation( ( ) => ( {
		mutationFn : async ( ) => {
			if ( !selectedFile ) throw new Error( "No file selected" );

			const formData = new FormData( );
			formData.append( "file", selectedFile );

			const params = new URLSearchParams( {
				folder  : form.folder,
				format  : form.format,
				quality : form.quality.toString( )
			} );

			if ( form.width )  params.set( "width",  form.width.toString( ) );
			if ( form.height ) params.set( "height", form.height.toString( ) );
			if ( form.transformation ) params.set( "transformation", form.transformation );

			const res = await fetch( `/api/filemanager/upload?${ params.toString( ) }`, {
				method : "POST",
				body   : formData
			} );

			if ( !res.ok ) {
				const errorData = await res.json( );
				throw new Error( errorData.error || "Error al subir archivo" );
			}

			return res.json( );
		},
		onSuccess : ( data ) => {
			// Inyectar manualmente el nuevo recurso en la caché para feedback instantáneo
			queryClient.setQueryData( [ "files", form.folder ], ( old : any ) => {
				if ( !old ) return old;
				return {
					...old,
					total_count : ( old.total_count || 0 ) + 1,
					resources   : [ data, ...( old.resources || [ ] ) ]
				};
			} );
			
			open         = false;
			selectedFile = null;
		}
	} ) );


	// Sincronizar folder inicial cuando cambia el prop o se abre el dialogo
	$effect( ( ) => {
		if ( open && initialFolder ) {
			form.folder = initialFolder;
		}
	} );


    const formatOptions: ImageFormatOption[] = [
		{ value : "avif", label : "AVIF" },
		{ value : "webp", label : "WEBP" },
		{ value : "jpeg", label : "JPEG" },
		{ value : "png",  label : "PNG"  }
	];


    function updateFolder( v: string ) {
		form.folder = v;
	}


    function updateFormat( v: string ) {
		form.format = v;
	}


    function updateWidth( v: number ) {
		form.width = v;
		if ( form.keepDims ) {
			form.height = v;
		}
	}


    function updateHeight( v: number ) {
		form.height = v;
		if ( form.keepDims ) {
			form.width = v;
		}
	}


    function updateKeepDims( v: boolean ) {
		form.keepDims = v;
		if ( v && form.width !== null ) {
			form.height = form.width;
		}
	}


    function updateUseOriginal( v: boolean ) {
		form.useOriginal = v;
		form.width       = v ? null : ( form.width ?? 1080 );
		form.height      = v ? null : ( form.height ?? 1080 );
	}


    function updateQuality( v: number ) {
		form.quality = clampQuality( v );
	}


    function updateTransformation( v: string ) {
		form.transformation = v;
	}


    function onFileSelected( f: File | null ) {
		selectedFile = f;
	}


    function startUpload( ) {
		uploadMutation.mutate( );
	}
</script>


<Dialog
	bind:open={ open }
	title="Subir Imagen"
	description="Ajusta los parámetros de transformación para la subida de la imagen."
>
	<section class="space-y-4">
		<hr class="border-purple-700/50" />

		<TextInput
			id="folder"
			label="Carpeta"
			value={ form.folder }
			placeholder="Ejemplo: samples"
			onchange={ updateFolder }
		/>

		<DropzoneUploader onfileselected={ onFileSelected } />

		<Select
			id="format"
			label="Formato"
			value={ form.format }
			onchange={ updateFormat }
			options={ formatOptions }
		/>

		<SliderInput
			id="quality"
			label="Calidad"
			value={ form.quality }
			min={ 10 }
			max={ 100 }
			step={ 10 }
			onchange={ updateQuality }
		/>

		<div class="bg-slate-900/40 p-6 rounded-2xl shadow-inner border border-slate-700/50 space-y-4">
			<div class="w-full flex justify-between items-center">
				<p class="text-sm font-medium text-cyan-200">Dimensiones</p>

                <SwitchInput
					id="useOriginal"
					label="Dimensiones originales"
					checked={ form.useOriginal }
					onchange={ updateUseOriginal }
				/>
			</div>

			<div class="flex gap-4 items-center w-full">
				<div class="flex gap-3 w-full opacity-100 transition-opacity" class:opacity-40={ form.useOriginal }>
					<NumberInput
						id="width"
						label="Ancho"
						value={ form.width }
						min={ 1 }
						max={ 10000 }
						step={ 1 }
						onchange={ updateWidth }
						disabled={ form.useOriginal }
					/>

                    <NumberInput
						id="height"
						label="Alto"
						value={ form.height }
						min={ 1 }
						max={ 10000 }
						step={ 1 }
						onchange={ updateHeight }
						disabled={ form.useOriginal }
					/>
				</div>

                <div class="shrink-0" class:opacity-40={ form.useOriginal }>
					<SwitchInput
						id="keepDims"
						label="Mantener"
						checked={ form.keepDims }
						onchange={ updateKeepDims }
						disabled={ form.useOriginal }
					/>
				</div>
			</div>
		</div>

		<TextInput
			id="transformation"
			label="Transformación (Opcional)"
			value={ form.transformation }
			placeholder="Parámetros extra..."
			onchange={ updateTransformation }
		/>

		<div class="p-5 rounded-xl bg-slate-950/40 border border-slate-700/50 backdrop-blur-md">
			<div class="text-[ 10px ] font-bold text-cyan-500 mb-2 tracking-widest uppercase">Vista previa</div>

            <div class="grid grid-cols-2 gap-2 text-xs">
				<div class="text-cyan-100/60">Folder: <span class="text-white">{ normalizeFolder( form.folder ) || "(raíz)" }</span></div>

                <div class="text-cyan-100/60">Formato: <span class="text-white">{ form.format }</span></div>

                <div class="text-cyan-100/60">Dimensiones: <span class="text-white">{ form.useOriginal ? "Original" : `${ form.width }x${ form.height }` }</span></div>

                <div class="text-cyan-100/60">Calidad: <span class="text-white">{ form.quality }%</span></div>
			</div>
		</div>

		<button
			class    = "w-full py-3 rounded-xl bg-linear-to-r from-cyan-600 to-purple-600 text-white font-bold shadow-lg hover:shadow-cyan-500/20 transition-all active:scale-[ 0.98 ] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
			onclick  = { startUpload }
			disabled = { uploadMutation.isPending || !selectedFile }
		>
			{#if uploadMutation.isPending}
				<div class="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
				Subiendo...
			{:else}
				Comenzar Subida
			{/if}
		</button>
	</section>
</Dialog>
