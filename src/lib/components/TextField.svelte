<script lang="ts">
	import type {
		HTMLAttributes,
		HTMLInputAttributes,
		HTMLTextareaAttributes
	} from 'svelte/elements';
	import Icon from '$lib/components/Icon.svelte';
	import { createEventDispatcher } from 'svelte';
	let wrapper: HTMLDivElement, textarea: HTMLTextAreaElement;
	let id = `input-${Math.random() * 1.23}`;
	export let value = '';
	export let error = false;
	export let style: 'filled' | 'outlined' = 'outlined';
	export let icon: string | null = null;
	export let trailingIcon: string | null = null;
	export let iconError: string | null = '';
	export let title = '';
	export let name = title;
	export let display = 'inline-flex';
	export let isDate = false;
	export let isTextarea = false;
	export let supportingText: null | string = null;
	const dispatch = createEventDispatcher();
	export let extraWrapperOptions = {} satisfies HTMLAttributes<HTMLDivElement>;
	export let extraInputOptions = {} satisfies HTMLInputAttributes & HTMLTextareaAttributes;
	function resize() {
		textarea.style.height = 'unset';
		wrapper.style.height = 'unset';
		const height = textarea.scrollHeight + 'px';
		textarea.style.height = height;
		wrapper.style.height = height;
	}
</script>

<section {...extraWrapperOptions}>
	<div
		class="text-field-container style-{style}"
		class:error
		class:has-icon={icon}
		bind:this={wrapper}
		style="display: {display}"
	>
		{#if isTextarea}
			<textarea
				{name}
				bind:value
				bind:this={textarea}
				{id}
				class="text-field-input"
				class:value
				required
				rows="1"
				on:input={resize}
				{...extraInputOptions}
			/>
		{:else}
			<input
				{name}
				bind:value
				class:value
				required
				type="text"
				{id}
				class="text-field-input"
				on:click={(e) => {
					if (
						isDate &&
						!window.matchMedia('(orientation: portrait) or (forced-colors: active)').matches
					)
						e.preventDefault();
				}}
				{...isDate ? { type: 'date' } : {}}
				{...extraInputOptions}
			/>
		{/if}
		{#if icon}
			<span class="leading-icon">
				<Icon d={icon} />
			</span>
		{/if}
		{#if error}
			<span class="trailing-icon">
				<Icon d={iconError ?? ''} />
			</span>
		{/if}
		{#if trailingIcon}
			<div class="trailing-button">
				<Icon d={trailingIcon} />
			</div>
		{/if}
		<div class="text-field-layer" />
		<label for={id}>
			{title}
		</label>
	</div>
	{#if supportingText}
		<p class="supporting" class:error>{supportingText}</p>
	{/if}
</section>

<style lang="postcss">
	.text-field-container {
		@apply relative h-14 w-full min-w-[15rem] text-on-surface-variant;
	}
	.text-field-container :global(svg) {
		@apply h-6 w-6;
	}
	.text-field-input {
		@apply absolute inset-0 h-full w-full appearance-none border-none bg-transparent 
		px-4 text-on-surface outline-none;
	}
	textarea {
		@apply resize-none;
	}
	.text-field-layer {
		@apply pointer-events-none absolute inset-0 rounded-[inherit] transition-all duration-200;
	}
	label {
		transition: all 250ms, font 500ms;
		transition-timing-function: cubic-bezier(0.254, 0.029, 0, 1.2);
		color: rgb(var(--error, currentColor));
		@apply pointer-events-none absolute left-4 top-4;
	}
	.error {
		--error: var(--color-error);
	}
	.supporting {
		@apply mt-1 px-4 text-label-small text-on-surface-variant;
	}
	.supporting.error {
		@apply text-error;
	}

	.style-filled {
		@apply rounded-t-lg bg-surface-variant;
	}
	.style-filled > .text-field-layer {
		color: rgb(var(--error, var(--color-on-surface-variant)));
		@apply border-b-2 border-[currentColor];
	}
	.style-filled > .text-field-input {
		@apply pb-2 pt-6;
	}
	.style-filled .text-field-input:is(:focus, .value, :required:valid, [type='date']) ~ label {
		@apply top-2;
	}

	.style-outlined {
		@apply rounded-lg;
	}
	.style-outlined > .text-field-layer {
		color: rgb(var(--error, var(--color-outline)));
		@apply ring-1 ring-[currentColor];
	}
	.style-outlined > .text-field-input {
		@apply py-4;
	}
	.style-outlined .text-field-input:is(:focus, .value, :required:valid, [type='date']) ~ label {
		background-color: rgb(var(--color-surface));
		@apply -top-2 left-3 px-1;
	}

	.text-field-input:is(:focus, .value, :required:valid, [type='date']) ~ label {
		@apply text-label-small;
	}

	.leading-icon,
	.trailing-icon {
		fill: rgb(var(--error, var(--color-on-surface)));
		@apply pointer-events-none inline-flex self-center;
	}
	.leading-icon {
		@apply ml-4 mr-3;
	}
	.trailing-icon {
		margin: 0 0.75rem 0 auto;
		fill: rgb(var(--error));
	}
	.trailing-button {
		fill: rgb(var(--error, var(--color-primary)));
		@apply absolute bottom-0 right-0 top-0 inline-flex w-[3.25rem] items-center justify-center 
		border-none bg-transparent text-on-surface-variant transition-all duration-200;
	}
	.trailing-button:is(:focus-visible, :active) {
		background-color: rgb(var(--color-on-surface-variant) / 0.12);
	}
	.has-icon > .text-field-input {
		@apply pl-[3.25rem];
	}
	.has-icon > label {
		@apply left-[3.25rem];
	}
	.has-trailing-icon > .text-field-input {
		@apply pr-[3.25rem];
	}

	@media (hover: hover) {
		.error:hover {
			--error: var(--color-on-error-container);
		}
		.text-field-container:hover > :is(label, .text-field-layer) {
			color: rgb(var(--error, var(--color-on-surface)));
		}
		.style-filled:hover > .text-field-layer {
			background-color: rgb(var(--color-on-surface) / 0.08);
		}
	}
	.text-field-container:focus-within > :is(label, .text-field-layer) {
		color: rgb(var(--error, var(--color-primary)));
	}

	.text-field-container:focus-within > :is(.text-field-layer) {
		@apply ring-2 ring-primary;
	}
	.text-field-input[type='date'] {
		@apply pl-[0.875rem];
	}
	.has-icon > .text-field-input[type='date'] {
		@apply pl-[3.25rem];
	}
	@supports (-moz-appearance: none) {
		.text-field-input[type='date'] {
			@apply pl-3;
		}
		.has-icon > .text-field-input[type='date'] {
			@apply pl-12;
		}
	}
	.has-trailing-icon.text-field-input[type='date'] {
		@apply pr-4;
	}
	.text-field-input[type='date'] ~ .trailingButton {
		@apply hidden;
	}
	.text-field-input[type='date']::-webkit-calendar-picker-indicator,
	.text-field-input[type='date']::-webkit-inner-spin-button {
		display: none;
		appearance: none;
	}
	@media (orientation: landscape) and (forced-colors: none) {
		.text-field-input[type='date'] {
			padding-right: 3.25rem;
		}
		.text-field-input[type='date'] ~ .trailingButton {
			display: inline-flex;
		}

		@supports not selector(::-webkit-calendar-picker-indicator) {
			.text-field-input[type='date'] {
				clip-path: inset(0 3.25rem 0 0);
			}
			.has-trailing-icon.text-field-input[type='date'] {
				padding-right: 0;
			}
		}
	}
</style>
