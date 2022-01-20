import { IMessage } from '../../../commons/imessage';
import { IAccountRepository } from '../../repository/iaccount.repository';
import { Account } from '../entities/account';
import { IAccountService } from './iaccount.service';

export class AccountService implements IAccountService {
	constructor(private readonly repository: IAccountRepository, private readonly message: IMessage) {}

	async create(account: Account): Promise<Account> {
		console.log('AccountService.create', account);

		try {
			account.checkEmailProvider();
			await this.repository.save(account);
			return account;
		} catch (err) {
			console.error('error trying to create an account', err);
			throw err;
		}
	}

	async update(account: Account): Promise<void> {
		console.log('AccountService.update', account);

		try {
			account.checkEmailProvider();
			await this.repository.update(account);
		} catch (err) {
			console.error('error trying to update an account', err);
			throw err;
		}
	}

	async fetchByEmail(email: string): Promise<Account> {
		console.log('AccountService.fetchByEmail', email);

		try {
			new Account(email).checkEmailProvider();
			const account: Account = await this.repository.fetchByEmail(email);
			return account;
		} catch (err) {
			console.error('error trying to fetch an account by email', err);
			throw err;
		}
	}
}
