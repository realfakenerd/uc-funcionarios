<script lang="ts">
	import type { HTMLFormAttributes } from 'svelte/elements';
	import type { CARGO } from '$lib/types';
	import TextField from './TextField.svelte';

	export let iniciouEm: string;
	export let estaAtivo = true;
	export let nome: string;
	export let sobrenome: string;
	export let cargo: CARGO | null = null;

	export let extraOptions = {} satisfies HTMLFormAttributes;
	export let formMethod: string;
</script>

<form class="pb-4 flex flex-col gap-y-2" method={formMethod} {...extraOptions}>
	<fieldset class="flex flex-col w-full md:flex-row gap-2">
		<TextField value={nome} style="outlined" title="Nome" />
		<TextField
			extraWrapperOptions={{ class: 'w-full' }}
			value={sobrenome}
			style="outlined"
			title="Sobrenome"
		/>
	</fieldset>

	<fieldset class="flex flex-col md:flex-row items-center justify-between w-full gap-2">
		<section class="select-container">
			<select required class="select-input" class:value={cargo} bind:value={cargo} name="cargoSelect" id="selection">
				<option value="DESENVOLVEDOR">Desenvolvedor</option>
				<option value="ADMINISTRADOR">Administrador</option>
			</select>
			<div class="select-layer" />
			<label class="select-label" for="cargoSelect">Selecione um cargo</label>
		</section>

		<TextField
			extraWrapperOptions={{ class: 'h-[3.5rem]' }}
			value={iniciouEm}
			style="outlined"
			isDate={true}
			name="inputDate"
			trailingIcon={'M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V10h16v11zm0-13H4V5h16v3z'}
		/>
	</fieldset>

	<fieldset class="text-label-large">
		<legend>está ativo</legend>
		<div class="radio-container">
			<input
				checked
				type="radio"
				id="radioSIM"
				name="estaAtivo"
				class="radio-input-primary radio-input"
				bind:group={estaAtivo}
				value={true}
			/>
			<label for="radioSIM">Sim</label>
		</div>

		<div class="radio-container">
			<input
				type="radio"
				id="radioNAO"
				bind:group={estaAtivo}
				name="estaAtivo"
				class="radio-input radio-input-primary"
				value={false}
			/>
			<label for="radioNAO">Não</label>
		</div>
	</fieldset>

	<button class="btn interactive-bg-primary-container w-full" type="submit">enviar</button>
</form>

<style lang="postcss">
	.select-container {
		@apply rounded-lg relative text-on-surface-variant h-14 w-full min-w-[15rem];
	}

	.select-input {
		@apply text-on-surface appearance-none absolute inset-0 px-4 w-full h-full
		border-none bg-transparent outline-none;
	}

	.select-container > .select-input:is(:focus, .value, :required:valid) ~ .select-label {
		@apply -top-2 left-3 px-1 bg-surface;
	}

	.select-input:is(:focus, .value, :required:valid) ~ .select-label {
		@apply text-label-small;
	}

	.select-container:focus-within > :is(.select-label, .select-layer) {
		@apply text-primary;
	}

	.select-container:focus-within > :is(.select-layer) {
		@apply ring-primary ring-2;
	}

	.select-layer {
		@apply text-outline pointer-events-none ring-1 ring-[currentColor] absolute inset-0 rounded-[inherit] transition-all duration-200;
	}

	.select-label {
		transition: all 250ms, font 500ms;
		transition-timing-function: cubic-bezier(0.254, 0.029, 0, 1.2);
		@apply text-[currentColor] pointer-events-none absolute left-4 top-4;
	}

	@media (hover: hover) {
		.select-container:hover > :is(.select-label, .select-layer) {
			@apply text-on-surface;
		}
	}
</style>
