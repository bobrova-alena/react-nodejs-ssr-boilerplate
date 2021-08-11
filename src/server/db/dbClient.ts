import { config } from 'dotenv';
import { MongoClient } from 'mongodb';

config();
let hasAllCredentials = true;
const db_user = process.env.user?.toString();
const db_password = process.env.password?.toString();

export const db_name = process.env.db_name?.toString();
let db_uri = '';

if (db_user && db_password && db_name) {
  const cluster_uri = process.env.cluster_uri?.toString().replace('<db_name>', db_name);
  if (cluster_uri && process.env.uri) {
    db_uri = process.env.uri
      .replace('<user>', db_user)
      .replace('<password>', db_password)
      .replace('<cluster_uri>', cluster_uri);
  } else {
    hasAllCredentials = false;
    ('The cluster_uri variable is empty. Add an .env file or set the enviroment variables.');
  }
} else {
  hasAllCredentials = false;
  console.warn(
    'User name, password or db name are empty. Add an .env file or set the enviroment variables.'
  );
}

export const getClient = (): MongoClient | undefined => {
  if (hasAllCredentials && db_uri.length > 0) {
    return new MongoClient(db_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 30000,
    });
  }
  return undefined;
};
