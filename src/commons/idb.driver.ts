import { IAccountRepository } from '../account/repository/iaccount.repository';

export interface IDBDriver {
	connect(): Promise<void>;
	close(): Promise<void>;
	get repositories(): Repositories;
}

export type Repositories = {
	account: IAccountRepository;
};
