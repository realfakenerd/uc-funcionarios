<script lang="ts">
	import type { CARGO } from '$lib/types';
	import { convertToBool, formatDate } from '$lib/utils';
	export let id: string;
	export let nome = '';
	export let sobrenome = '';
	export let cargo: CARGO;
	export let dataInicio: string;
	export let ativo: boolean;
</script>

<li>
	<a href={'/funcionario/' + id} class="group card" id={String(id)} aria-label={`Perfil de ${nome} ${sobrenome}`}>
		<hgroup class="group-hover:text-on-tertiary-container">
			<div>
				<h1 aria-label={`Nome: ${nome} ${sobrenome}`}>{nome} {sobrenome}</h1>
				{#if convertToBool(ativo)}
					<span class="bg-primary text-on-primary" role="status" aria-live="assertive">funcionario ativo</span>
					{:else}
					<span class="bg-error text-on-error" role="status" aria-live="assertive">funcionario não ativo</span>
				{/if}
			</div>
			<h2>{cargo.toLowerCase()}</h2>
		</hgroup>

		<section>
			<div>
				<p aria-live="polite">Iniciou em: {formatDate(dataInicio)}</p>
			</div>
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
		@apply flex items-center rounded-lg p-1 text-label-small;
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
</style>
