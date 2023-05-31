import { createOrUpdateFuncionario } from '$lib/utils';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, fetch }) => {
		const id = Math.round(Math.random() * 999);
		const funcionario = await createOrUpdateFuncionario(await request.formData());
		const res = await fetch('http://187.60.56.72:9191/funcionario', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id, ...funcionario })
		});

		if (res.ok) return { nome: funcionario.nome, success: true };
	}
};
