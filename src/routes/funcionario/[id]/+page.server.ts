import { createOrUpdateFuncionario } from '$lib/utils';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, fetch }) => {
		const data = await request.formData();
		const id = data.get('btnId');
		const funcionario = await createOrUpdateFuncionario(data);
		const res = await fetch('/api/funcionario', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id, ...funcionario })
		});

		if (res.ok) return { nome: funcionario.nome, success: true };
	}
};
