import { Account } from '../entities/account';

export interface IAccountRepository {
	save(account: Account): Promise<string>;
}
