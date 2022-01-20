import * as mongoDB from 'mongodb';
import { IDBDriver, Repositories } from '../../../commons/idb.driver';
import { MongoDBAccountRepository } from './mongodb.account.repository';

export class MongoDB implements IDBDriver {
	private client!: mongoDB.MongoClient;
	private repo!: Repositories;

	get repositories(): Repositories {
		return this.repo;
	}

	async connect(): Promise<void> {
		console.log('starting mongodb connection...');

		try {
			this.client = new mongoDB.MongoClient(process.env.DB_CONN || 'localhost');
			await this.client.connect();
			await this.client.db('admin').command({ ping: 1 });
			const db = this.client.db(process.env.DB_NAME);

			this.repo = {
				account: new MongoDBAccountRepository(db.collection('account')),
			};

			console.log('mongodb connection successfully initiated');
			return Promise.resolve();
		} catch (err) {
			console.error('failed to connect to the db with error', err);
			process.exit(1);
		}
	}

	async close(): Promise<void> {
		try {
			await this.client.close();
			return Promise.resolve();
		} catch (err) {
			console.error('failed to close db connection with error', err);
			process.exit(1);
		}
	}
}
