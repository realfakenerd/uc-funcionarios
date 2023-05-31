<script lang="ts">
	import { easeEmphasizedAccel, easeEmphasizedDecel, enterExit, outroClass } from '$lib/animation';
	import { createEventDispatcher, tick } from 'svelte';

	export let title: string;
	export let confirmLabel: string;
	export let cancelLabel: string | null = null;
	export let preventDismiss = false;
	const dispatch = createEventDispatcher();
	export let open = false;
	let dialog: HTMLDialogElement;
	$: {
		if (!dialog) break $;
		tick().then(() => {
			if (open && !dialog.hasAttribute('open')) {
				dialog.showModal();
			} else if (!open && dialog.hasAttribute('open')) {
				dialog.close();
			}
		});
	}
</script>

{#key open}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<dialog
		bind:this={dialog}
		on:cancel|preventDefault={() => {
			if (preventDismiss) return;
			open = false;
			dispatch('closed', { method: 'browser' });
		}}
		on:click={() => {
			if (preventDismiss) return;
			open = false;
			dispatch('closed', { method: 'clickedOutside' });
		}}
		in:enterExit={{ duration: 400, easing: easeEmphasizedDecel }}
		out:enterExit={{ duration: 200, easing: easeEmphasizedAccel }}
		use:outroClass
	>
		<div class="container" on:click|stopPropagation>
			<h2 class="text-headline-small">{title}</h2>
			<hr class="divider-middle divider border-on-error-container/70" />
			<div class="text-body-medium text-on-error-container/70"><slot /></div>
			<div class="buttons">
				{#if cancelLabel}
					<button
						class="btn interactive-bg-error-container"
						on:click={() => {
							open = false;
							dispatch('closed', { method: 'clickCancel' });
						}}
					>
						{cancelLabel}
					</button>
				{/if}
				<button
					class="btn interactive-bg-error"
					on:click={() => {
						open = false;
						dispatch('closed', { method: 'clickConfirm' });
					}}
				>
					{confirmLabel}
				</button>
			</div>
		</div>
	</dialog>
{/key}

<style lang="postcss">
	dialog {
		@apply overflow-auto rounded-[1.75rem] border-none bg-error-container p-0;
	}
	dialog::backdrop {
		background-color: rgb(0 0 0 / 0.5);
		animation: backdropIn 500ms;
	}
	:global(.leaving):is(dialog)::backdrop {
		animation: backdropOut 250ms;
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
	.container {
		@apply flex min-w-[17.5rem] max-w-[35rem] flex-col gap-y-4 p-6;
	}
	.buttons {
		@apply flex justify-end gap-x-2;
	}
</style>
