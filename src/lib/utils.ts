type DateStyle = Intl.DateTimeFormatOptions['dateStyle'];

export function formatDate(
	date: string | null | Date,
	dateStyle: DateStyle = 'medium',
	locales = 'pt-br'
) {
	if (date === null) return 'N/A'; 
	  
	const formatter = new Intl.DateTimeFormat(locales, { dateStyle });
	return formatter.format(new Date(String(date)));
}

export async function createOrUpdateFuncionario(formData: FormData) {
	const nome = formData.get('Nome');
	const sobrenome = formData.get('Sobrenome');
	const dataInicio = formData.get('inputDate');
	const cargo = formData.get('cargoSelect');
	const ativo = formData.get('estaAtivo');

	const date = (dataInicio as string).split('-') as [string, string, string] ;
	const lastDate = parseInt(date[2], 10);

	date[2] = String(lastDate + 1);

	return { nome, sobrenome, dataInicio: date.join('-'), cargo, ativo };
}
