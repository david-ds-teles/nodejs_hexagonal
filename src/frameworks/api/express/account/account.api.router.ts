import express, { Router } from 'express';
import { AccountAPI } from '../../../../account/api/account.api';
import { AccountService } from '../../../../account/core/services/account.service';
import { IAccountService } from '../../../../account/core/services/iaccount.service';
import { IAccountRepository } from '../../../../account/repository/iaccount.repository';
import { IMessage } from '../../../../commons/imessage';

export const accountRouter = (accountRepository: IAccountRepository, message: IMessage): Router => {
	const accountService: IAccountService = new AccountService(accountRepository, message);
	const accountApi = new AccountAPI(accountService);

	const router: Router = express.Router();
	router.use('/', accountApi.create);

	return router;
};
