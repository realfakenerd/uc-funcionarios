<script lang="ts">
	import CardFuncionario from '$lib/components/containment/CardFuncionario.svelte';
	import type { ActionData, PageData } from './$types';
	export let data: PageData;
	export let form: ActionData;

	console.log(form)
</script>

<ul class="grid gap-2">
	{#each data.funcionarios as funcionario (funcionario.id)}
		<CardFuncionario {...funcionario} />
	{/each}
</ul>

<style>
	ul.grid {
		grid-template-columns: repeat(auto-fill, minmax(22rem, 1fr));
	}
</style>
