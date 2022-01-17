import { Account } from '../entities/account';

export interface IAccountService {
	create(account: Account): Promise<Account>;
	update(account: Account): void;
	fetchByEmail(email: string): Promise<Account>;
}
