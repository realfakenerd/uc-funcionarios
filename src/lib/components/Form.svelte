<script lang="ts">
	import type { CARGO } from '$lib/types';
	import TextField from './TextField.svelte';

	export let iniciouEm: string;
	export let ativo = 'true';
	export let nome: string;
	export let sobrenome: string;
	export let cargo: CARGO | null = null;
	export let id: number | null = null;
	export let atualizar = false;
</script>

<form class="flex flex-col gap-y-2 pb-4" method="POST">
	<fieldset class="flex w-full flex-col gap-2 md:flex-row">
		<TextField value={nome} style="outlined" title="Nome" />
		<TextField
			extraWrapperOptions={{ class: 'w-full' }}
			value={sobrenome}
			style="outlined"
			title="Sobrenome"
		/>
	</fieldset>

	<fieldset class="flex w-full flex-col items-center justify-between gap-2 md:flex-row">
		<section class="select-container">
			<select
				required
				class="select-input"
				class:value={cargo}
				bind:value={cargo}
				name="cargoSelect"
				id="selection"
			>
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
			icon={'M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V10h16v11zm0-13H4V5h16v3z'}
		/>
	</fieldset>

	<fieldset class="text-label-large">
		<legend>Está ativo</legend>
		<section class="inline-flex gap-4">
			<label class="my-2 flex items-center gap-2">
				<div class="radio-container">
					<input
						type="radio"
						id="radioSIM"
						name="estaAtivo"
						class="radio-input"
						bind:group={ativo}
						value="true"
					/>
					<div class="radio-layer" />
				</div>
				Sim
			</label>

			<label class="my-2 flex items-center gap-2">
				<div class="radio-container">
					<input
						type="radio"
						id="radioNAO"
						bind:group={ativo}
						name="estaAtivo"
						class="radio-input"
						value="false"
					/>
					<div class="radio-layer" />
				</div>
				Não
			</label>
		</section>
	</fieldset>

	<button name="btnId" value={id} class="btn interactive-bg-primary-container w-full" type="submit">
		{atualizar ? 'Atualizar' : 'Enviar'}
	</button>
</form>

<style lang="postcss">
	.select-container {
		@apply relative h-14 w-[20rem] min-w-[15rem] max-w-full rounded-lg text-on-surface-variant;
	}

	.select-input {
		@apply absolute inset-0 h-full w-full appearance-none border-none bg-transparent
		px-4 text-on-surface outline-none;
	}

	.select-container > .select-input:is(:focus, .value, :required:valid) ~ .select-label {
		@apply -top-2 left-3 bg-surface px-1;
	}

	.select-input:is(:focus, .value, :required:valid) ~ .select-label {
		@apply text-label-small;
	}

	.select-container:focus-within > :is(.select-label, .select-layer) {
		@apply text-primary;
	}

	.select-container:focus-within > :is(.select-layer) {
		@apply ring-2 ring-primary;
	}

	.select-layer {
		@apply pointer-events-none absolute inset-0 rounded-[inherit] text-outline ring-1 ring-[currentColor] transition-all duration-200;
	}

	.select-label {
		transition: all 250ms, font 500ms;
		transition-timing-function: cubic-bezier(0.254, 0.029, 0, 1.2);
		@apply pointer-events-none absolute left-4 top-4 text-[currentColor];
	}

	@media (hover: hover) {
		.select-container:hover > :is(.select-label, .select-layer) {
			@apply text-on-surface;
		}
	}
</style>
