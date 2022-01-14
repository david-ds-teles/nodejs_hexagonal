import { Request, Response } from '../../commons/iapi.req.res';
import { Account } from '../core/entities/account';

export interface IAccountAPI {
	create(req: Request<Account>, res: Response<Account>, next: (arg: any) => void): void;
}
