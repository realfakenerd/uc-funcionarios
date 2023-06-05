type DateStyle = Intl.DateTimeFormatOptions['dateStyle'];

export function formatDate(
	date: string | null | Date,
	dateStyle: DateStyle = 'medium',
	locales = 'pt-br'
) {
	if (date === null) return 'N/A'; 
	  
	const formatter = new Intl.DateTimeFormat(locales, { dateStyle, timeZone: 'UTC' });
	return formatter.format(new Date(String(date)));
}

export const convertToBool = (val: unknown) => val !== 'false';

export async function createOrUpdateFuncionario(formData: FormData) {
	const nome = formData.get('Nome');
	const sobrenome = formData.get('Sobrenome');
	const dataInicio = formData.get('inputDate');
	const cargo = formData.get('cargoSelect');
	const ativo = formData.get('estaAtivo');


	return { nome, sobrenome, dataInicio, cargo, ativo };
}
