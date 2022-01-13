import * as mongoDB from 'mongodb';
import { IDBDriver } from '../adapters/idb.driver';
import { MongoCollections } from '../types/mongo.db.collections.type';

export class MongoDB implements IDBDriver<MongoCollections> {
	private db!: mongoDB.Db;
	private client!: mongoDB.MongoClient;
	readonly collections: MongoCollections;

	constructor() {
		this.collections = {};
	}

	get conn(): MongoCollections {
		return this.collections;
	}

	private configCollections(): void {
		this.collections.account = this.db.collection('account');
	}

	async connect() {
		console.log('starting mongodb connection...');

		try {
			this.client = new mongoDB.MongoClient(process.env.DB_CONN || 'localhost');
			await this.client.connect();
			await this.client.db("admin").command({ ping: 1 });
			this.db = this.client.db(process.env.DB_NAME);
			this.configCollections();

			console.log('mongodb connection successfully initiated');
		} catch (err) {
			console.error('failed to connect to the db with error', err);
			process.exit(1);
		}
	}

	async close() {
		try {
			await this.client.close();
		} catch (err) {
			console.error('failed to close db connection with error', err);
			process.exit(1);
		}
	}
}
