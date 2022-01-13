import { IDBDriver } from '../ports/idb.driver';
import { AccountAPI } from './api/account.api';
import { AccountCmd } from './cmd/account.cmd';
import { ICommand } from './cmd/icommand';
import { IAccountRepository } from './core/repository/iaccount.repository';
import { AccountService } from './core/services/account.service';
import { IAccountService } from './core/services/iaccount.service';
import { MongoDBAccountRepository } from './db/mongodb.account.repository';
import { IMessage } from './utils/imessage';

export const accountCmd = <DB>(dbDriver: IDBDriver<DB>, message: IMessage): ICommand => {
	const accountRepository: IAccountRepository = new MongoDBAccountRepository(dbDriver);
	const accountService: IAccountService = new AccountService(accountRepository, message);

	const cmd: ICommand = new AccountCmd(accountService, message);
	return cmd;
};

export const accountAPI = <DB>(dbDriver: IDBDriver<DB>, message: IMessage): AccountAPI => {
	const accountRepository: IAccountRepository = new MongoDBAccountRepository(dbDriver);
	const accountService: IAccountService = new AccountService(accountRepository, message);
	const api: AccountAPI = new AccountAPI(accountService);
	return api;
};
