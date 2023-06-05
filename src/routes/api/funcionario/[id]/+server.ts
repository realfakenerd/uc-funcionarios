import { TABLE_NAME, db } from '$lib/aws';
import {
	DeleteCommand,
	GetCommand,
	type DeleteCommandInput,
	type GetCommandInput
} from '@aws-sdk/lib-dynamodb';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async ({ params }) => {
	const param: GetCommandInput = {
		TableName: TABLE_NAME,
		Key: {
			id: params.id
		}
	};

	const command = new GetCommand(param);
	const data = await db.send(command);
	return json(data);
}) satisfies RequestHandler;

export const DELETE = (async ({ params }) => {
	const param: DeleteCommandInput = {
		TableName: TABLE_NAME,
		Key: {
			id: { S: params.id }
		}
	};

	const command = new DeleteCommand(param);
	const data = await db.send(command);
	return json(data);
}) satisfies RequestHandler;
