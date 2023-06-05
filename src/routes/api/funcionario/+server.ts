import { TABLE_NAME, db } from '$lib/aws';
import type { Funcionario } from '$lib/types';
import {
	PutCommand,
	ScanCommand,
	UpdateCommand,
	type PutCommandInput,
	type ScanCommandInput,
	type UpdateCommandInput
} from '@aws-sdk/lib-dynamodb';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async () => {
	const param: ScanCommandInput = {
		TableName: TABLE_NAME
	};

	const command = new ScanCommand(param);
	const data = await db.send(command);
	return json(data);
}) satisfies RequestHandler;

export const POST = (async ({ request }) => {
	const body = (await request.json()) as Funcionario;

	const param: PutCommandInput = {
		TableName: TABLE_NAME,
		Item: {
			sobrenome: body.sobrenome,
			dataInicio: body.dataInicio,
			nome: body.nome,
			ativo: body.ativo,
			id: body.id,
			cargo: body.cargo
		}
	};

	const command = new PutCommand(param);
	const data = await db.send(command);
	return json(data);
}) satisfies RequestHandler;

export const PUT = (async ({ request }) => {
	const body = await request.json();

	const param: UpdateCommandInput = {
		TableName: TABLE_NAME,
		Key: {
			id: body.id
		},
		UpdateExpression:
			'SET sobrenome = :sobrenome, dataInicio = :dataInicio, nome = :nome, ativo = :ativo, cargo = :cargo',
		ExpressionAttributeValues: {
			':sobrenome': body.sobrenome,
			':dataInicio': body.dataInicio,
			':nome': body.nome,
			':ativo': body.ativo,
			':cargo': body.cargo
		}
	};

	const command = new UpdateCommand(param);
	const data = db.send(command);
	return json(data);
}) satisfies RequestHandler;
