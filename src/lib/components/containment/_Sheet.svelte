<script lang="ts">
	export let container: HTMLDivElement | null = null;
</script>

<div
	class="bottom-content"
	bind:this={container}
	on:wheel|preventDefault
	on:touchstart|preventDefault
	on:mousedown|stopPropagation
>
	<slot />
</div>

<style lang="postcss">
	.bottom-content {
		@apply min-h-full bg-primary/5 px-4;
	}
</style>
