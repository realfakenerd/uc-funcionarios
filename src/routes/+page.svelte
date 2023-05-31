<script lang="ts">
	import type { PageData } from './$types';
	import CardFuncionario from '$lib/components/containment/CardFuncionario.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import BottomSheet from '$lib/components/containment/BottomSheet.svelte';
	import Form from '$lib/components/Form.svelte';
	import { writable } from 'svelte/store';
	export let data: PageData;
	const funcionarios = writable(data.funcionarios);
	let showAddBottomSheet = false;
</script>

<ul class="grid gap-2">
	{#each $funcionarios as funcionario (funcionario.id)}
		<CardFuncionario {...funcionario} />
	{/each}
</ul>

{#if showAddBottomSheet}
	<BottomSheet height={350} on:close={() => (showAddBottomSheet = false)}>
		<Form
			iniciouEm=""
			nome=""
			sobrenome=""
			formMethod="POST"
			extraOptions={{ action: '?/createFuncionario' }}
		/>
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
