<script lang="ts">
	import type { CARGO } from '$lib/types';
	import Form from '../Form.svelte';
	import Icon from '../Icon.svelte';
	import BottomSheet from './BottomSheet.svelte';
	import Dialog from './Dialog.svelte';
	export let id: number;
	export let nome = '';
	export let sobrenome = '';
	export let cargo: CARGO;
	export let dataInicio: string;
	export let ativo: string;

	let showEditBottomSheet = false;
	let isDeleteModalOpen = false;

	async function deletaFuncionario(e: CustomEvent<{ method: 'clickConfirm' | 'clickCancel' }>) {
		const method = e.detail.method;
		try {
			if (method === 'clickConfirm') {
				await fetch('http://187.60.56.72:9191/funcionario/' + id, {
					method: 'DELETE'
				});
				location.reload();
			}
		} catch (error) {
			console.error(error);
		}
	}

	const data = dataInicio?.split('-').reverse().join('/');
</script>

<li>
	<a href={'/funcionario/' + id} class="group card" id={String(id)}>
		<hgroup class="group-hover:text-on-tertiary-container">
			<div>
				<h1>{nome} {sobrenome}</h1>
				{#if ativo}
					<span>funcionario ativo</span>
				{/if}
			</div>
			<h2>{cargo.toLowerCase()}</h2>
		</hgroup>

		<section>
			<div>
				<p>Iniciou em: {data}</p>
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
							<Form
								{id}
								{cargo}
								iniciouEm={dataInicio}
								{ativo}
								{sobrenome}
								{nome}
								action="?/updateFuncionario"
							/>
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
	</a>
</li>

<style lang="postcss">
	a.card {
		@apply interactive-bg-surface-variant w-full gap-y-2 text-on-surface-variant;
	}

	hgroup > div {
		@apply inline-flex w-full items-center justify-between gap-2;
	}

	h1 {
		@apply text-title-medium capitalize;
	}

	hgroup span {
		@apply flex items-center rounded-lg bg-primary p-1 text-label-small
		text-on-primary;
	}

	h2 {
		@apply text-label-small capitalize;
	}

	section {
		@apply flex flex-row items-center justify-between;
	}

	section > div {
		@apply rounded-lg bg-surface p-2 text-label-medium
			text-on-surface;
	}

	ul {
		@apply inline-flex;
	}

	ul li {
		@apply flex h-12 w-12 items-center justify-center;
	}

	li button {
		@apply flex h-10 w-10 items-center justify-center rounded-full;
	}
</style>
