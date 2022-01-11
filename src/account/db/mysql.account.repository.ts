import { Account } from '../core/entities/account';
import { IAccountRepository } from './iaccount.repository';

export class MySqlAccountRepository implements IAccountRepository {
	async save(account: Account): Promise<string> {
		console.log('saving to an mySQL database');
		return Promise.resolve('Fake ID');
	}
}
