import express, { Router } from 'express';
import { AccountAPI } from '../../../../account/api/account.api';
import { AccountService } from '../../../../account/core/services/account.service';
import { IAccountService } from '../../../../account/core/services/iaccount.service';
import { IAccountRepository } from '../../../../account/repository/iaccount.repository';
import { IDBDriver } from '../../../../commons/idb.driver';
import { IMessage } from '../../../../commons/imessage';
import { MongoDBAccountRepository } from '../../../db/mongodb/mongodb.account.repository';

export const accountRouter = <DB>(dbDriver: IDBDriver<DB>, message: IMessage): Router => {
	const accountRepository: IAccountRepository = new MongoDBAccountRepository(dbDriver);
	const accountService: IAccountService = new AccountService(accountRepository, message);
	const accountApi = new AccountAPI(accountService);

	const router: Router = express.Router();
	router.use('/', accountApi.create);

	return router;
};
