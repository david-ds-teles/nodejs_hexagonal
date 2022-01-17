import { IAccountRepository } from '../account/repository/iaccount.repository';

export interface IDBDriver {
	connect(): void;
	close(): void;
	get repositories(): Repositories;
}

export type Repositories = {
	account: IAccountRepository;
};
