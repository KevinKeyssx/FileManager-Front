<script lang="ts">
	import TextInput from "$lib/components/TextInput.svelte";
	import NumberInput from "$lib/components/NumberInput.svelte";
	import Select from "$lib/components/shared/Select.svelte";
	import SwitchInput from "$lib/components/SwitchInput.svelte";
	import SliderInput from "$lib/components/SliderInput.svelte";
	import DropzoneUploader from "$lib/components/DropzoneUploader.svelte";
	import Dialog from "$lib/components/shared/Dialog.svelte";
	import { normalizeFolder, syncDimensions, clampQuality } from "$lib/form";
	import type { FormState, ImageFormatOption } from "$lib/types";

	let {
		open = $bindable( false )
	} = $props();

	let form: FormState = $state({
		folder         : "",
		format         : "avif",
		width          : 1080,
		height         : 1080,
		keepDims       : false,
		quality        : 10,
		transformation : ""
	});

	const formatOptions: ImageFormatOption[] = [
		{ value : "avif", label : "avif" },
		{ value : "webp", label : "webp" },
		{ value : "jpeg", label : "jpeg" },
		{ value : "png",  label : "png"  }
	];

	function updateFolder( v: string ) {
		form = { ...form, folder : v };
	}

	function updateFormat( v: string ) {
		form = { ...form, format : v };
	}

	function updateWidth( v: number ) {
		const updated = syncDimensions( v, form.height, form.keepDims );
		form          = {
			...form,
			width  : updated.width,
			height : updated.height
		};
	}

	function updateHeight( v: number ) {
		const updated = syncDimensions( form.width, v, form.keepDims );
		form          = {
			...form,
			width  : updated.width,
			height : updated.height
		};
	}

	function updateKeepDims( v: boolean ) {
		form = { ...form, keepDims : v };
		if ( v ) {
			const updated = syncDimensions( form.width, form.height, true );
			form          = {
				...form,
				width  : updated.width,
				height : updated.height
			};
		}
	}

	function updateQuality( v: number ) {
		form = { ...form, quality : clampQuality( v ) };
	}

	function updateTransformation( v: string ) {
		form = { ...form, transformation : v };
	}

	function onFileSelected( _f: File ) {
		// UI: aún sin subida real
	}
</script>

<Dialog
	bind:open={ open }
	title="Subir Imagen"
	description="Ajusta los parámetros de transformación para la subida de la imagen."
>
	<section class="space-y-4">
		<hr class="border-purple-700/50" />

		<DropzoneUploader onfileselected={ onFileSelected } />

		<TextInput
			id="folder"
			label="Folder"
			value={ form.folder }
			placeholder="Ejemplo: samples"
			onchange={ updateFolder }
		/>

		<Select
			id="format"
			label="Formar"
			value={ form.format }
			onchange={ updateFormat }
			options={ formatOptions }
		/>

		<SliderInput
			id="quality"
			label="Quality"
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
					id="keepDims"
					label="Conservar proporciones"
					checked={ form.keepDims }
					onchange={ updateKeepDims }
				/>
			</div>

			<div class="flex gap-4 items-center w-full">
				<div class="flex gap-3 w-full">
					<NumberInput
						id="width"
						label="Ancho"
						value={ form.width }
						min={ 1 }
						max={ 10000 }
						step={ 1 }
						onchange={ updateWidth }
					/>
					<NumberInput
						id="height"
						label="Alto"
						value={ form.height }
						min={ 1 }
						max={ 10000 }
						step={ 1 }
						onchange={ updateHeight }
					/>
				</div>
				<SwitchInput
					id="keepDims"
					label="Mantener"
					checked={ form.keepDims }
					onchange={ updateKeepDims }
				/>
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
				<div class="text-cyan-100/60">Dimensiones: <span class="text-white">{ form.width }x{ form.height }</span></div>
				<div class="text-cyan-100/60">Calidad: <span class="text-white">{ form.quality }%</span></div>
			</div>
		</div>

		<button
			class="w-full py-3 rounded-xl bg-linear-to-r from-cyan-600 to-purple-600 text-white font-bold shadow-lg hover:shadow-cyan-500/20 transition-all active:scale-[ 0.98 ]"
			onclick={ ( ) => open = false }
		>
			Comenzar Subida
		</button>
	</section>
</Dialog>