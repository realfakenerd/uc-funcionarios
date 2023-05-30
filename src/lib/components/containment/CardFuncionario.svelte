<script lang="ts">
	import type { CARGO } from '$lib/types';
	import { formatDate } from '$lib/utils';
	import Form from '../Form.svelte';
	import Icon from '../Icon.svelte';
	import BottomSheet from './BottomSheet.svelte';
	import Dialog from './Dialog.svelte';
	export let id: number;
	export let nome = '';
	export let sobrenome = '';
	export let cargo: CARGO;
	export let dataInicio: string | null;
	export let estaAtivo: boolean = true;

	let showEditBottomSheet = false;
	let isDeleteModalOpen = false;

	async function deletaFuncionario(e: CustomEvent<{ method: 'clickConfirm' | 'clickCancel' }>) {
		const method = e.detail.method;
		if (method === 'clickConfirm') {
			const res = await fetch('http://187.60.56.72:9191/funcionario/' + id, {
				method: 'DELETE'
			});
			console.log(await res.json());
			return;
		}
	}
</script>

<li class="card group" id={String(id)}>
	<hgroup class="group-hover:text-on-tertiary-container">
		<div>
			<h1>{nome} {sobrenome}</h1>
			{#if estaAtivo}
				<span>funcionario ativo</span>
			{/if}
		</div>
		<h2>{cargo.toLowerCase()}</h2>
	</hgroup>

	<section>
		<div>
			<p>inicou em: {dataInicio}</p>
		</div>
		<ul>
			<li>
				<button
					on:click={() => (showEditBottomSheet = true)}
					class="interactive-bg-secondary fill-on-secondary"
				>
					<Icon
						d={`M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z`}
					/>
				</button>
				{#if showEditBottomSheet}
					<BottomSheet height={370} on:close={() => (showEditBottomSheet = false)}>
						<Form {cargo} iniciouEm={dataInicio} {estaAtivo} {sobrenome} {nome} formMethod="PUT"/>
					</BottomSheet>
				{/if}
			</li>
			<li>
				<button
					on:click={() => (isDeleteModalOpen = !isDeleteModalOpen)}
					class="interactive-bg-error fill-on-error"
				>
					<Icon
						d={`M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z`}
					/>
				</button>
				<Dialog
					on:closed={deletaFuncionario}
					title="Remover funcionario?"
					cancelLabel="Não remover"
					confirmLabel="Remover"
					bind:open={isDeleteModalOpen}
				>
					Realmente deseja remover o funcionario {nome}
					{sobrenome}
				</Dialog>
			</li>
		</ul>
	</section>
</li>

<style lang="postcss">
	li.card {
		@apply gap-y-2 interactive-bg-surface-variant text-on-surface-variant;
	}

	hgroup > div {
		@apply inline-flex justify-between items-center gap-2 w-full;
	}

	h1 {
		@apply text-title-medium capitalize;
	}

	hgroup span {
		@apply text-label-small p-1 bg-primary flex items-center rounded-lg
		text-on-primary;
	}

	h2 {
		@apply capitalize text-label-small;
	}

	section {
		@apply flex flex-row justify-between items-center;
	}

	section > div {
		@apply p-2 bg-surface text-on-surface rounded-lg
			text-label-medium;
	}

	ul {
		@apply inline-flex;
	}

	ul li {
		@apply w-12 h-12 flex items-center justify-center;
	}

	li button {
		@apply w-10 h-10 flex items-center justify-center rounded-full;
	}

	
</style>
