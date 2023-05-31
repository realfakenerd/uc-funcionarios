<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import {
		heightTransition,
		outroClass,
		easeEmphasizedDecel,
		easeEmphasizedAccel
	} from '$lib/animation';
	import Sheet from './_Sheet.svelte';

	export let height = 160;
	export let showHandle = true;
	export let isDialog = true;
	export let closeOnMinimize = true;

	const dispatch = createEventDispatcher();
	let sheet: HTMLDivElement | null;
	$: if (sheet) height = Math.min(height, sheet.offsetHeight);
	$: if (height < 48) {
		if (closeOnMinimize) dispatch('close', 'minimized');
		else height = 48;
	}

	let isDragging = false;
	let startY: number;
	const handleMouseMove = (e: { clientY: number }) => {
		if (!isDragging) return;
		const distance = e.clientY - startY;
		height -= distance;
		startY = e.clientY;
	};
	let goingUp = true;
	const moveSheet = (e: MouseEvent) => {
		if (!sheet) return;
		if (e.detail) return;
		if (height === sheet.offsetHeight) goingUp = false;
		if (height === 48) goingUp = true;
		if (goingUp) height += 160;
		else height = Math.max(height - 160, 48);
	};
	const handleTouchMove = (e: TouchEvent) => {
		if (!isDragging) return;
		const distance = e.touches[0].clientY - startY;
		height -= distance;
		startY = e.touches[0].clientY;
	};
	const moveSheetTouch = (e: TouchEvent) => {
		if (!sheet) return;
		if (e.touches.length > 1) return;
		if (height === sheet.offsetHeight) goingUp = false;
		if (height === 48) goingUp = true;
		if (goingUp) height += 160;
		else height = Math.max(height - 160, 48);
	};
	const open = (node: HTMLDialogElement) => node.showModal();
</script>

<svelte:window
	on:mousemove={handleMouseMove}
	on:touchmove={handleTouchMove}
	on:mouseup={() => (isDragging = false)}
	on:touchend={() => (isDragging = false)}
/>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<svelte:element
	this={isDialog ? 'dialog' : 'div'}
	class="bottom-sheet"
	class:no-drag={!isDragging}
	style="max-height: {height}px;"
	use:open
	use:outroClass
	in:heightTransition={{ height, duration: 400, easing: easeEmphasizedDecel }}
	out:heightTransition={{ height, duration: 200, easing: easeEmphasizedAccel }}
	on:cancel|preventDefault={() => {
		dispatch('close', 'browser');
	}}
	on:mousedown={() => {
		if (isDialog) dispatch('close', 'click');
	}}
>
	<Sheet
		bind:container={sheet}
		on:wheel={(e) => (height += e.deltaY)}
		on:touchstart={(e) => {
			isDragging = true;
			startY = e.touches[0].clientY;
		}}
	>
		{#if showHandle}
			<div
				class="bottom-handler"
				on:mousedown|preventDefault={(e) => {
					isDragging = true;
					startY = e.clientY;
				}}
			>
				<button on:click={moveSheet} on:touchend={moveSheetTouch} />
			</div>
		{/if}
		<slot />
	</Sheet>
</svelte:element>

<style lang="postcss">
	.bottom-sheet {
		background-color: rgb(var(--color-surface));
		color: rgb(var(--color-on-surface));
		border-radius: 1.75rem 1.75rem 0 0;
		position: fixed;
		bottom: 0px;
		left: 50%;
		z-index: 1;
		width: 100%;
		max-width: 40rem;
		--tw-translate-x: -50%;
		transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate))
			skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x))
			scaleY(var(--tw-scale-y));
		overflow: hidden;
	}
	.bottom-handler {
		display: flex;
		height: 3rem;
		width: 100%;
		cursor: grab;
		align-items: center;
		justify-content: center;
	}
	.bottom-handler > button {
		background-color: rgb(var(--color-on-surface-variant) / 0.4);
		height: 0.25rem;
		width: 2rem;
		cursor: inherit;
		border-radius: 0.25rem;
		border-style: none;
		padding: 0px;
	}
	.bottom-handler > button:focus-visible {
		background-color: rgb(var(--color-on-surface-variant) / 0.5);
	}
	.bottom-handler > button:focus-visible::before {
		content: 'Press space to move bottom sheet';
		color: rgb(var(--color-on-surface));
		position: relative;
		left: -19rem;
		top: 0.5rem;
		display: inline-block;
		width: 40rem;
	}
	.bottom-handler > button:active {
		background-color: rgb(var(--color-on-surface-variant) / 0.6);
		cursor: grabbing;
	}
	dialog.bottom-sheet {
		bottom: 0px;
		left: 0px;
		margin-bottom: 0px;
		transform: none;
		border-style: none;
		padding: 0px;
	}
	dialog::backdrop {
		background-color: rgb(0 0 0 / 0.5);
		animation: backdropIn 400ms;
	}
	.leaving ::backdrop {
		animation: backdropOut 400ms !important;
	}
	@keyframes backdropIn {
		0% {
			background-color: rgb(0 0 0 / 0);
		}
		100% {
			background-color: rgb(0 0 0 / 0.5);
		}
	}
	@keyframes backdropOut {
		0% {
			background-color: rgb(0 0 0 / 0.5);
		}
		100% {
			background-color: rgb(0 0 0 / 0);
		}
	}
	.no-drag {
		transition: all 200ms;
	}
</style>
