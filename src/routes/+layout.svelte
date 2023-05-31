<script lang="ts">
	import '../app.css';
	import '@fontsource/roboto';
	import {easeEmphasizedDecel,easeEmphasizedAccel}from'$lib/animation';

	export let data;
</script>

<header class="flex flex-col gap-3 p-4 md:flex-row md:items-center">
	<figure>
		<img
			width="160"
			height="36"
			class="h-auto w-40"
			src="https://cdn.bitrix24.com.br/b13772517/sender/be6/be612427cf98746b2aabd3989116d1a8/c73ac8c47757f6a2ac317088ba524040.png"
		/>
	</figure>
	<h1 class="text-headline-small">Listagem de funcionarios</h1>
</header>

{#key data.currentRoute}
	<main
		in:fly={{ x: -5, duration: 500, delay: 200, easing: easeEmphasizedDecel }}
		out:fly={{ x: 5, duration: 200, easing: easeEmphasizedAccel }}
		class="flex flex-col gap-4 p-4 text-on-surface-variant"
	>
		<slot />
	</main>
{/key}
