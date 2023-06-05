import type { FuncionariosDB } from '../lib/types';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const res = await fetch('/api/funcionario');
	const data = (await res.json()) as FuncionariosDB;

	return {
		funcionarios: data.Items
	};
}) satisfies PageLoad;
