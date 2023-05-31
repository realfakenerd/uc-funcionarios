<script lang="ts">
	import { goto } from '$app/navigation';
	import Form from '$lib/components/Form.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Dialog from '$lib/components/containment/Dialog.svelte';
	import { formatDate } from '$lib/utils';
	import type { PageData } from './$types';
	export let data: PageData;
	const { funcionario } = data;
	let isDeleteModalOpen = false;

	async function deletaFuncionario(e: CustomEvent<{ method: 'clickConfirm' | 'clickCancel' }>) {
		const method = e.detail.method;
		try {
			if (method === 'clickConfirm') {
				await fetch('/api/funcionario/' + funcionario.id, {
					method: 'DELETE'
				});
				goto('/');
			}
		} catch (error) {
			console.error(error);
		}
	}
</script>

<section class="flex flex-col gap-6">
	<div class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
		<div class="flex flex-row items-center gap-4">
			<button
				class="rounded-2xl fill-on-surface p-4 transition-all duration-200 hover:bg-surface-variant-hover hover:fill-on-surface-variant"
				on:click={() => history.back()}
			>
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"
					><path d="M0 0h24v24H0V0z" fill="none" /><path
						d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
					/></svg
				>
			</button>

			<h1 class="text-headline-large">{funcionario.nome} {funcionario.sobrenome}</h1>
		</div>

		<div class="flex flex-row gap-2">
			{#if funcionario.ativo}
				<div class="rounded-md bg-primary-container p-4 text-body-medium text-on-primary-container">
					Funcionario ativo
				</div>
			{/if}
			<div class="rounded-md bg-surface-variant p-4 text-body-medium text-on-surface-variant">
				{formatDate(funcionario.dataInicio)}
			</div>
		</div>
	</div>

	<div class="flex max-w-xl flex-col gap-4 md:self-center">
		<Form
			id={funcionario.id}
			cargo={funcionario.cargo}
			iniciouEm={funcionario.dataInicio}
			ativo={funcionario.ativo}
			sobrenome={funcionario.sobrenome}
			nome={funcionario.nome}
			atualizar
		/>

		<button
			on:click={() => (isDeleteModalOpen = !isDeleteModalOpen)}
			class="icon-left btn interactive-bg-error fill-on-error"
		>
			<Icon
				d={`M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z`}
			/>

			Remover funcionario
		</button>
		<Dialog
			on:closed={deletaFuncionario}
			title="Remover funcionario?"
			cancelLabel="Não remover"
			confirmLabel="Remover"
			bind:open={isDeleteModalOpen}
		>
			Realmente deseja remover o funcionario {funcionario.nome}
			{funcionario.sobrenome}
		</Dialog>
	</div>
</section>
