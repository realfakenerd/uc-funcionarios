<script lang="ts">
	import type { PageData } from './$types';
	import CardFuncionario from '$lib/components/containment/CardFuncionario.svelte';
	import TextField from '$lib/components/TextField.svelte';
	import type { CARGO } from '$lib/types';
	import DateFieldAndPicker from '$lib/components/selection/DateFieldAndPicker.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import BottomSheet from '$lib/components/containment/BottomSheet.svelte';
	export let data: PageData;
	let nome: string;
	let sobrenome: string;
	let iniciouEm: string;
	let cargo: CARGO;
	let estaAtivo = true;
	let showAddBottomSheet = false;
	console.log(data.funcionarios);
</script>

<ul class="grid gap-2">
	{#each data.funcionarios as funcionario (funcionario.id)}
		<CardFuncionario {...funcionario} />
	{/each}
</ul>

{#if showAddBottomSheet}
	<BottomSheet height={350} on:close={() => (showAddBottomSheet = false)}>
		<form class="pb-4" method="POST">
			<fieldset class="flex flex-col md:flex-row gap-2">
				<TextField value={nome} style="outlined" title="Nome" />
				<TextField value={sobrenome} style="outlined" title="Sobrenome" />
			</fieldset>

			<fieldset class="text-label-large">
				<label for="selection">Selecione um cargo</label>
				<select bind:value={cargo} name="cargoSelect" id="selection">
					<option value="DESENVOLVEDOR">Desenvolvedor</option>
					<option value="ADMINISTRADOR">Administrador</option>
				</select>
			</fieldset>

			<fieldset>
				<DateFieldAndPicker
					fieldOptions={{ name: 'inputDate' }}
					clearable={true}
					bind:value={iniciouEm}
					dateValidator={(d) => {
						const lastChar = d.charCodeAt(9);
						return Boolean(lastChar && lastChar % 2);
					}}
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
	</BottomSheet>
{/if}

<div class="fixed bottom-2 right-3">
	<button
		on:click={() => (showAddBottomSheet = true)}
		class="fab fab-normal interactive-bg-tertiary"
	>
		<Icon d={`M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z`} />
	</button>
</div>

<style>
	ul.grid {
		grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
	}
</style>
