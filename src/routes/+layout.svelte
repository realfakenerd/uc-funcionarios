<script lang="ts">
	import { easeEmphasizedAccel, easeEmphasizedDecel } from '$lib/animation';
	import Form from '$lib/components/Form.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Dialog from '$lib/components/containment/Dialog.svelte';
	import '@fontsource/roboto';
	import { fly } from 'svelte/transition';
	import '../app.css';
	import type { ActionData, LayoutData } from './$types';
	export let data: LayoutData;
	let showModal = false;
</script>

<header class="flex flex-col gap-3 p-4 md:flex-row md:items-center">
	<figure>
		<img
			width="160"
			height="36"
			class="h-auto w-40"
			alt="UC logo"
			src="https://cdn.bitrix24.com.br/b13772517/sender/be6/be612427cf98746b2aabd3989116d1a8/c73ac8c47757f6a2ac317088ba524040.png"
		/>
	</figure>
	<h1 class="text-headline-small">Listagem de funcionários</h1>
</header>

{#key data.currentRoute}
	<main
		in:fly={{ y: -5, duration: 500, delay: 200, easing: easeEmphasizedDecel }}
		out:fly={{ y: 5, duration: 200, easing: easeEmphasizedAccel }}
		class="flex flex-col gap-4 p-4"
	>
		<slot />
	</main>
{/key}

<Dialog
	title="Remover funcionario?"
	on:click
	confirmLabel=""
	bind:open={showModal}
>
	<Form iniciouEm="" nome="" sobrenome="" />
</Dialog>

<div class="fixed bottom-2 right-3">
	<button
		on:click={() => (showModal = true)}
		class="fab fab-normal interactive-bg-tertiary"
		title="FAB"
	>
		<Icon d={`M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z`} />
	</button>
</div>
