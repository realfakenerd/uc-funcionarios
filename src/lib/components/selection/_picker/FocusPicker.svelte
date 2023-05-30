<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from '$lib/components/Icon.svelte';

	const dispatch = createEventDispatcher();
	const conditionalScroll = (node: Element, shouldScroll: boolean) => {
		if (shouldScroll) node.scrollIntoView({ block: 'nearest' });
	};
	export let options: { id: number; name: string; selected: boolean }[];
</script>

<div class="container">
	{#each options as { id, name, selected }}
		<button
			class="text-body-large"
			on:click={() => dispatch('chosen', id)}
			use:conditionalScroll={selected}
		>
			{#if selected}
				<Icon d={`M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z`} />
			{/if}
			{name}
		</button>
	{/each}
</div>

<style lang="postcss">
	.container {
		@apply flex flex-col flex-[1_0] overflow-auto mb-5;
	}
	button {
		@apply inline-flex items-center h-[3rem] pl-[3.5rem] flex-shrink-0 bg-transparent text-on-surface
	border-none relative cursor-pointer transition-all duration-200;
	}
	button :global(svg) {
		@apply w-6 h-6 absolute left-4 top-1/2 transform -translate-y-1/2;
	}

	@media (hover: hover) {
		button:hover {
			@apply bg-on-surface-variant/[0.8];
		}
		button:is(:focus-visible, :active) {
			@apply bg-on-surface-variant/[0.12];
		}
	}
</style>
