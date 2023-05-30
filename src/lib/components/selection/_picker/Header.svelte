<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';

	export let currentView: 'calendar' | 'year' | 'month', focusedMonth: number, focusedYear: number;
	export let startYear: number, endYear: number;
	const yearClick = () => (currentView = currentView == 'calendar' ? 'year' : 'calendar');
	const monthClick = () => (currentView = currentView == 'calendar' ? 'month' : 'calendar');
	const getShortMonth = (month: number) =>
		new Date(0, month).toLocaleDateString(undefined, { month: 'short' });
</script>

<div class="container" class:choosing={currentView != 'calendar'}>
	<div>
		<button class="mover" on:click={() => (focusedMonth = (focusedMonth - 1 + 12) % 12)}>
			<Icon d={`M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z`} />
		</button>
		<button class="chooser text-label-large" on:click={monthClick} disabled={currentView == 'year'}>
			{getShortMonth(focusedMonth)}
			<Icon d={`M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z`} />
		</button>
		<button class="mover" on:click={() => (focusedMonth = (focusedMonth + 1) % 12)}>
			<Icon d={`M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z`} />
		</button>
	</div>
	<div>
		<button class="mover" disabled={focusedYear <= startYear} on:click={() => focusedYear--}>
			<Icon d={`M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z`} />
		</button>
		<button class="chooser text-label-large" on:click={yearClick} disabled={currentView == 'month'}>
			{focusedYear}
			<Icon d={`M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z`} />
		</button>
		<button class="mover" disabled={focusedYear >= endYear} on:click={() => focusedYear++}>
			<Icon d={`M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z`} />
		</button>
	</div>
</div>

<style lang="postcss">
	.container {
		border-bottom: solid 1px transparent;
		@apply flex h-[4rem] transition-all duration-200 flex-shrink fill-on-surface-variant;
	}
	.container > div {
		@apply flex flex-[1];
	}
	.choosing {
		@apply border-outline-variant;
	}

	button {
		@apply inline-flex items-center justify-center bg-transparent text-on-surface-variant p-0 border-none cursor-pointer
	transition-all duration-200;
	}
	button:enabled:hover {
		@apply bg-on-surface-variant/[0.08];
	}
	button:enabled:is(:focus-visible, :active) {
		@apply bg-on-surface-variant/[0.12];
	}
	button:disabled {
		@apply cursor-auto text-on-surface-variant/[0.38];
	}

	.chooser {
		flex-grow: 1;
	}
	.chooser :global(svg) {
		@apply w-[18px] h-[18px] -mr-1 ml-2;
	}
	.mover {
		width: 3rem;
	}
	.mover :global(svg) {
		width: 1.5rem;
		height: 1.5rem;
	}
	.choosing .mover {
		opacity: 0;
		width: 0;
	}
</style>
