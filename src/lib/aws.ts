import { PRIVATE_ACCESS_KEY, PRIVATE_SECRET_ACCESS_KEY } from '$env/static/private';
import {DynamoDBClient} from '@aws-sdk/client-dynamodb';

const db = new DynamoDBClient({
    region: 'sa-east-1',
    credentials: {
        accessKeyId: PRIVATE_ACCESS_KEY,
        secretAccessKey: PRIVATE_SECRET_ACCESS_KEY
    }
});

const TABLE_NAME = 'Funcionarios'
export {
    db,
    TABLE_NAME
};