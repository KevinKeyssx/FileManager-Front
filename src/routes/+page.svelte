<script lang="ts">
    import TextInput from '$lib/components/TextInput.svelte';
    import NumberInput from '$lib/components/NumberInput.svelte';
    import SelectInput from '$lib/components/SelectInput.svelte';
    import SwitchInput from '$lib/components/SwitchInput.svelte';
    import SliderInput from '$lib/components/SliderInput.svelte';
    import DropzoneUploader from '$lib/components/DropzoneUploader.svelte';
    import { normalizeFolder, syncDimensions, clampQuality } from '$lib/form';
    import type { FormState, ImageFormatOption } from '$lib/types';
    
    let form: FormState = $state({
        folder: '',
        format: 'avif',
        width: 1080,
        height: 1080,
        keepDims: false,
        quality: 10,
        transformation: ''
    });

    const formatOptions: ImageFormatOption[] = [
        { value: 'avif', label: 'avif' },
        { value: 'webp', label: 'webp' },
        { value: 'jpeg', label: 'jpeg' },
        { value: 'png', label: 'png' }
    ];

    function updateFolder(v: string) { form = { ...form, folder: v }; }
    function updateFormat(v: string) { form = { ...form, format: v }; }
    function updateWidth(v: number) {
        const updated = syncDimensions(v, form.height, form.keepDims);
        form = { ...form, width: updated.width, height: updated.height };
    }
    function updateHeight(v: number) {
        const updated = syncDimensions(form.width, v, form.keepDims);
        form = { ...form, width: updated.width, height: updated.height };
    }
    function updateKeepDims(v: boolean) {
        form = { ...form, keepDims: v };
        if (v) {
        const updated = syncDimensions(form.width, form.height, true);
        form = { ...form, width: updated.width, height: updated.height };
        }
    }
    function updateQuality(v: number) { form = { ...form, quality: clampQuality(v) }; }
    function updateTransformation(v: string) { form = { ...form, transformation: v }; }
    function onFileSelected(_f: File) {
        // UI: aún sin subida real
    }
    </script>

<main class="max-w-4xl mx-auto p-8 bg-neon-glass rounded-2xl shadow-2xl border-2 border-slate-700/50 my-auto space-y-4">
    <h1 class="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-300 to-purple-400 drop-shadow-sm">UploadFiles</h1>

    <hr class="border-cyan-600/50" />

    <DropzoneUploader onfileselected={ onFileSelected } />
    <TextInput id="folder" label="Folder" value={ form.folder } placeholder="Ejemplo: samples" onchange={ updateFolder } />

    <SelectInput id="format" label="Formar" value={ form.format } onchange={ updateFormat } options={ formatOptions } />

    <SliderInput id="quality" label="Quality" value={ form.quality } min={ 10 } max={ 100 } step={ 10 } onchange={ updateQuality } />

    <div class="bg-neon-glass p-6 rounded-2xl shadow-2xl border-2 border-slate-700/50 space-y-4">
        <div class="w-full flex justify-between">
            <p>Dimensiones</p>

            <SwitchInput id="keepDims" label="Conservar dimensiones" checked={ form.keepDims } onchange={ updateKeepDims } />
        </div>

        <div class="flex gap-3 items-center w-full">
            
            <div class="flex gap-3 w-full">
                <NumberInput id="width" label="Width" value={ form.width } min={ 1 } max={ 10000 } step={ 1 } onchange={ updateWidth } />
                <NumberInput id="height" label="Height" value={ form.height } min={ 1 } max={ 10000 } step={ 1 } onchange={ updateHeight } />
            </div>
            
            <SwitchInput id="keepDims" label="Mantener" checked={ form.keepDims } onchange={ updateKeepDims } />
        </div>
    </div>

    <TextInput id="transformation" label="Transformation" value={ form.transformation } placeholder="" onchange={ updateTransformation } />

    <hr class="border-purple-700/50" />


    <div class=" p-5 rounded-xl bg-slate-950/40 border border-slate-700/50 backdrop-blur-md shadow-inner transition-all duration-300 hover:bg-slate-950/50">
        <div class="text-sm font-medium text-cyan-300 mb-2 tracking-wide uppercase">Vista previa (en tiempo real)</div>
        <div class="text-sm">Folder transformado: <span class="font-mono text-white">{normalizeFolder(form.folder || '') || '(vacío)'}</span></div>
        <div class="text-sm mt-1">Formato seleccionado: <span class="font-mono">{form.format}</span></div>
        <div class="text-sm mt-1">Dimensiones: {form.width} x {form.height}</div>
        <div class="text-sm mt-1">KeepDims: {form.keepDims ? 'true' : 'false'}</div>
        <div class="text-sm mt-1">Quality: {form.quality}</div>
    </div>
</main>