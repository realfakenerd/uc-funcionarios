<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import TextField from '$lib/components/TextField.svelte';
	import DatePickerDocked from './DatePickerDocked.svelte';
	import { enterExit } from '$lib/animation';

	type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
	export let fieldOptions: Optional<ComponentProps<TextField>, 'style'>;
	export let clearable = true;
	export let value: string;
	export let dateValidator: (date: string) => boolean = () => false; /* return true if invalid */
	let showingPicker = false,
		container: HTMLDivElement;
	function clickOutside(_: Node) {
		const handleClick = (event: Event) => {
			if (!container.contains(event.target as Node)) {
				showingPicker = false;
			}
		};
		document.addEventListener('click', handleClick, true);
		return {
			destroy() {
				document.removeEventListener('click', handleClick, true);
			}
		};
	}
</script>

<div class="container" bind:this={container}>
	<TextField
		style="outlined"
		isDate={true}
		bind:value
		trailingIcon={'M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V10h16v11zm0-13H4V5h16v3z'}
		on:trailingClick={() => (showingPicker = !showingPicker)}
		{...fieldOptions}
	/>
	{#if showingPicker}
		<div class="picker" transition:enterExit={{ duration: 400, moveY: false }} use:clickOutside>
			<DatePickerDocked
				{clearable}
				{dateValidator}
				date={value}
				on:close={() => (showingPicker = false)}
				on:setDate={(e) => {
					value = e.detail;
					showingPicker = false;
				}}
				on:clearDate={() => (value = '')}
			/>
		</div>
	{/if}
</div>

<style lang="postcss">
	.container {
		@apply relative;
	}
	.picker {
		@apply absolute top-[4.5rem] z-[999] rounded-[1rem];
	}
</style>
