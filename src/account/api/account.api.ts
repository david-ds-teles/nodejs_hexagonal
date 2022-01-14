import { Request, Response } from '../../commons/iapi.req.res';
import { Account } from '../core/entities/account';
import { IAccountService } from '../core/services/iaccount.service';
import { IAccountAPI } from './iaccount.api';

export class AccountAPI implements IAccountAPI {
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
}
