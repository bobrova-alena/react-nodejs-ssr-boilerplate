import { getClient, db_name } from './dbClient';
const db_collection = process.env.db_collection;

export interface IDocument {
  number: number;
}

export async function readNumber(): Promise<IDocument | undefined> {
  const client = getClient();
  if (!client) {
    return undefined;
  }

  try {
    await client.connect();
    const database = client.db(db_name);
    if (!db_collection) {
      throw console.error('collection name is empty');
    }
    const collection = database.collection(db_collection);
    const result = await collection.findOne({});
    return result;
  } finally {
    await client.close();
  }
}

export async function replaceNumber(number: number): Promise<void> {
  const client = getClient();
  if (!client) {
    return;
  }

  try {
    await client.connect();
    const database = client.db(db_name);
    if (!db_collection) {
      throw console.error('collection name is empty');
    }
    const collection = database.collection(db_collection);
    await collection.replaceOne({}, <IDocument>{ number });
  } finally {
    await client.close();
  }
}
