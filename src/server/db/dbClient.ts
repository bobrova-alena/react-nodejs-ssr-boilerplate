import { config } from 'dotenv';
import { MongoClient } from 'mongodb';

config();
const db_user = process.env.user?.toString();
const db_password = process.env.password?.toString();
export const db_name = process.env.db_name?.toString();

if (!db_user || !db_password || !db_name) {
  throw console.error('User name, password or db name are empty. db_user:');
}

const cluster_uri = process.env.cluster_uri?.toString().replace('<db_name>', db_name);
if (!cluster_uri) {
  throw console.error('cluster uri is empty');
}

const db_uri = process.env.uri
  ?.replace('<user>', db_user)
  .replace('<password>', db_password)
  .replace('<cluster_uri>', cluster_uri);

if (!db_uri) {
  throw console.error('db uri is empty');
}

export const getClient = (): MongoClient =>
  new MongoClient(db_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000,
  });
