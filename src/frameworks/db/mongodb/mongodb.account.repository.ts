import * as mongoDB from 'mongodb';
import { Account } from '../../../account/core/entities/account';
import { IAccountRepository } from '../../../account/repository/iaccount.repository';
import { NotFoundError } from '../../../commons/errors';

export class MongoDBAccountRepository implements IAccountRepository {
	private accountCollection: mongoDB.Collection;

	constructor(collection: mongoDB.Collection) {
		this.accountCollection = collection;
	}

	async save(account: Account): Promise<string> {
		console.log('saving account to the DB', account);

		try {
			const result: mongoDB.Document = await this.accountCollection.insertOne(account);
			console.log('account saved with success with result', result);
			return result.insertedId.toString();
		} catch (err) {
			console.error('error when try to save an account', err);
			throw new Error('internal_error');
		}
	}

	async update(account: Account) {
		account.idIsValid();
		account.checkEmailProvider();

		try {
			
			const _id = new mongoDB.ObjectId(account._id);
			const updateAccount = {
				$set: {
					email: account.email
				},
			};

			const result = await this.accountCollection.updateOne({ _id }, updateAccount);
			console.log('account updated successfully with result', result);

		} catch (err) {
			console.error('error when try to update an account', err);
			throw new Error('internal_error');
		}
	}

	async fetchByEmail(email: string): Promise<Account> {

		try {
			
			const query = {email};
			const result:mongoDB.WithId<mongoDB.Document> | null = await this.accountCollection.findOne(query);

			if(result == null)
				throw new NotFoundError('not_found', 'account not found for email: '+email);

			console.log('fetchByEmail successfully with result', result);

			const account:Account = result as Account;
			return account;

		} catch (err) {
			if(err instanceof NotFoundError) throw err;

			console.error('error when try to fetch an account', err);
			throw new Error('internal_error');
		}
	}
}
