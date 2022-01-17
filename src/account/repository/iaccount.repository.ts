import { Account } from '../core/entities/account';

export interface IAccountRepository {
	save(account: Account): Promise<string>;
	update(account: Account): Promise<void>;
	fetchByEmail(email: string): Promise<Account>;
}
