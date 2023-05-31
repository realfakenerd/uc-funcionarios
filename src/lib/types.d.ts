export interface Funcionario {
	id: number;
	nome: string;
	sobrenome: string;
	cargo: CARGO;
	dataInicio: string;
	ativo: boolean;
}

export const enum CARGO {
	DESENVOLVEDOR = 'DESENVOLVEDOR',
	ADMINISTRADOR = 'ADMINISTRADOR'
}

interface D {
	f: string;
	o: string;
}

export interface Routes {
	path: `/${string}`;
	title: string;
	d: D;
}
