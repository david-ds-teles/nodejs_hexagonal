import express, { Router } from 'express';
import { ICommand } from '../adapters/icommand';
import { IDBDriver } from '../adapters/idb.driver';
import { AccountAPI } from './api/account.api';
import { AccountCmd } from './cmd/account.cmd';
import { AccountService } from './core/services/account.service';
import { IAccountService } from './core/services/iaccount.service';
import { IAccountRepository } from './db/iaccount.repository';
import { MongoDBAccountRepository } from './db/mongodb.account.repository';

export const accountCmd = <DB>(dbDriver: IDBDriver<DB>): ICommand => {
	const accountRepository: IAccountRepository = new MongoDBAccountRepository(dbDriver);
	const accountService: IAccountService = new AccountService(accountRepository);

	const cmd: ICommand = new AccountCmd(accountService);
	return cmd;
};

export const accountRouter = <DB>(dbDriver: IDBDriver<DB>): Router => {
	const accountRepository: IAccountRepository = new MongoDBAccountRepository(dbDriver);
	const accountService: IAccountService = new AccountService(accountRepository);

	const router: express.Router = express.Router();
	const api: AccountAPI = new AccountAPI(accountService);
	router.use('/', api.create);

	return router;
};
