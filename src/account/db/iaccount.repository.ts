import { Account } from '../core/entities/account';

export interface IAccountRepository {
	save(account: Account): Promise<string>;
}
