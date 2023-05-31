type DateStyle = Intl.DateTimeFormatOptions['dateStyle'];

export function formatDate(
	date: string | null | Date,
	dateStyle: DateStyle = 'medium',
	locales = 'pt-br'
) {
	const formatter = new Intl.DateTimeFormat(locales, { dateStyle });
	return formatter.format(new Date(String(date)));
}


export async function createOrUpdateFuncionario(formData: FormData) {
	const nome = formData.get('Nome');
	const sobrenome = formData.get('Sobrenome');
	const dataInicio = formData.get('inputDate');
	const cargo = formData.get('cargoSelect');
	const ativo = formData.get('estaAtivo');

	const date = (dataInicio as string).split('-');
	const lastDate = parseInt(date[2]);

	// @ts-expect-error tem um errinho chato aqui, mas da pra usar
	date[2] = lastDate + 1;

	return { nome, sobrenome, dataInicio: date.join('-'), cargo, ativo };
}