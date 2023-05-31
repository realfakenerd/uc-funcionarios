type DateStyle = Intl.DateTimeFormatOptions['dateStyle'];

export function formatDate(
	date: string | null | Date,
	dateStyle: DateStyle = 'medium',
	locales = 'pt-br'
) {
	const formatter = new Intl.DateTimeFormat(locales, { dateStyle });
	return formatter.format(new Date(String(date)));
}
