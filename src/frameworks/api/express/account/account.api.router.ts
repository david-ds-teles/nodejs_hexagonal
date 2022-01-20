import express, { Router } from 'express';
import { Account } from '../../../../account/core/entities/account';
import { AccountService } from '../../../../account/core/services/account.service';
import { IAccountService } from '../../../../account/core/services/iaccount.service';
import { IAccountRepository } from '../../../../account/repository/iaccount.repository';
import { Request, Response } from '../../../../commons/iapi.req.res';
import { IMessage } from '../../../../commons/imessage';

class AccountAPI {
	constructor(private readonly accountService: IAccountService) {}

	create = async (req: Request<Account>, res: Response<Account | string>, next: (arg: any) => void) => {
		console.log('starting account create api');

		try {
			const account = new Account(req.body.email);
			const result = await this.accountService.create(account);
			res.status(201).send(result);
		} catch (err) {
			next(err);
		}
	};

	update = async (req: Request<Account>, res: Response<Account | string>, next: (arg: any) => void) => {
		console.log('starting update api');

		try {
			const account = new Account(req.body.email, req.body._id);
			await this.accountService.update(account);
			res.status(200).send();
		} catch (err) {
			next(err);
		}
	};

	fetchByEmail = async (req: Request<Account>, res: Response<Account | string>, next: (arg: any) => void) => {
		console.log('starting fetchByEmail api', req.params);

		try {
			const account: Account = await this.accountService.fetchByEmail(req.params.email);
			res.status(200).send(account);
		} catch (err) {
			next(err);
		}
	};
}

export const expressAccountAPI = (accountRepository: IAccountRepository, message: IMessage): Router => {
	const accountService: IAccountService = new AccountService(accountRepository, message);
	const accountApi = new AccountAPI(accountService);

	const router: Router = express.Router();
	router.post('/', accountApi.create);
	router.put('/', accountApi.update);
	router.get('/:email', accountApi.fetchByEmail);

	return router;
};
