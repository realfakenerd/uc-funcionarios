<script lang="ts">
	import CardFuncionario from '$lib/components/containment/CardFuncionario.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<ul class="grid gap-2">
	{#each data.funcionarios as funcionario (funcionario.id)}
		<CardFuncionario {...funcionario} />
	{/each}
</ul>

<style>
	ul.grid {
		grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
	}
</style>
