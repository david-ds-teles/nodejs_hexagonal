import { IAccountRepository } from '../core/repository/iaccount.repository';
import { Account } from '../core/entities/account';
import { MongoCollections } from '../../types/mongo.db.collections.type';
import { IDBDriver } from '../../ports/idb.driver';
import * as mongoDB from 'mongodb';

export class MongoDBAccountRepository implements IAccountRepository {
	private accountCollection: mongoDB.Collection;

	constructor(db: IDBDriver<MongoCollections>) {
		this.accountCollection = db.conn.account!;
	}

	async save(account: Account): Promise<string> {
		console.log('saving account to the DB', account);

		const result: mongoDB.Document = await this.accountCollection.insertOne(account);
		console.log('account saved with success with result', result);
		return result.insertedId.toString();
	}
}
