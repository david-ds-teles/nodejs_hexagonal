import { Request, Response } from 'express';
import { IAccountService } from '../core/services/iaccount.service';

export class AccountAPI {
	constructor(private readonly accountService: IAccountService) {}

	create = async (req: Request, rsp: Response) => {
		console.log('starting account create api');

		try {
			const account = await this.accountService.create(req.body);
			rsp.status(201).send(account);
		} catch (err) {
			rsp.status(500).send(req.message.msg('account_creation_failed'));
		}
	};
}
