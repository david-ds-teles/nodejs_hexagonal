import { IAccountRepository } from '../../db/iaccount.repository';
import { Account } from '../entities/account';
import { IAccountService } from './iaccount.service';

export class AccountService implements IAccountService {
	constructor(private readonly repository: IAccountRepository) {}

	async create(account: Account): Promise<Account> {
		console.log('AccountService.create', account);

		try {
			await this.repository.save(account);
			return account;
		} catch (err) {
			console.error('account creation failed with error', err);
			throw Error('account creation failed');
		}
	}

	update(account: Account): void {
		throw new Error('Method not implemented.');
	}

	fetchByEmail(email: string): Account {
		throw new Error('Method not implemented.');
	}
}
