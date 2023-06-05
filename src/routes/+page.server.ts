import { createOrUpdateFuncionario } from '$lib/utils';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, fetch }) => {
		const id = crypto.randomUUID();
		const funcionario = await createOrUpdateFuncionario(await request.formData());

		console.log({id,...funcionario})
		const res = await fetch('/api/funcionario', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id, ...funcionario })
		});

		if (res.ok) return { nome: funcionario.nome, success: true };
	}
};
