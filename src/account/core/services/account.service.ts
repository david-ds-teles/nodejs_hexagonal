import { IMessage } from '../../utils/imessage';
import { IAccountRepository } from '../repository/iaccount.repository';
import { Account } from '../entities/account';
import { IAccountService } from './iaccount.service';

export class AccountService implements IAccountService {
	constructor(private readonly repository: IAccountRepository, private readonly message: IMessage) {}

	async create(account: Account): Promise<Account> {
		console.log('AccountService.create', account);

		try {
			await this.repository.save(account);
			return account;
		} catch (err) {
			console.error(err);
			throw err;
		}
	}

	update(account: Account): void {
		console.log(account);
		throw new Error('Method not implemented.');
	}

	fetchByEmail(email: string): Account {
		console.log(email);
		throw new Error('Method not implemented.');
	}
}
