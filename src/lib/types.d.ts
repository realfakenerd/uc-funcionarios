export interface Funcionario {
	sobrenome:  string;
    dataInicio: string;
    nome:       string;
    ativo:      boolean;
    id:         string;
    cargo:      CARGO;
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

export interface FuncionariosDB {
    $metadata:    Metadata;
    Count:        number;
    Items:        Funcionario[];
    ScannedCount: number;
}

export interface Metadata {
    httpStatusCode:  number;
    requestId:       string;
    attempts:        number;
    totalRetryDelay: number;
}


export interface FuncionarioDB {
    $metadata: Metadata;
    Item:      Funcionario;
}
