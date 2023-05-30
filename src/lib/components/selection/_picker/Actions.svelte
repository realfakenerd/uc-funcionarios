<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let clearable: boolean;
	export let chosenDate: boolean;
	const dispatch = createEventDispatcher();
</script>

<div class="container">
	{#if clearable}
		<span class="left">
			<button class="btn" on:click={() => dispatch('clear')}>Clear</button>
		</span>
	{/if}
	<button class="btn" on:click={() => dispatch('cancel')}>Cancel</button>
	<button class="btn" disabled={!clearable && !chosenDate} on:click={() => dispatch('ok')}>
		OK
	</button>
</div>

<style lang="postcss">
	.container {
		@apply flex py-2 px-3 justify-end;
	}
	.container > .left {
		margin-right: auto;
	}
</style>
