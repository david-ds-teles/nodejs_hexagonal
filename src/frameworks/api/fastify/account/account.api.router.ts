import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from 'fastify';
import { Account } from '../../../../account/core/entities/account';
import { AccountService } from '../../../../account/core/services/account.service';
import { IAccountService } from '../../../../account/core/services/iaccount.service';
import { IAccountRepository } from '../../../../account/repository/iaccount.repository';
import { IMessage } from '../../../../commons/imessage';

class FastifyAccountAPI {
	constructor(readonly accountService: IAccountService) {}

	create = async (req: FastifyRequest, res: FastifyReply) => {
		const data: any = req.body;
		const result = await this.accountService.create(new Account(data.email));
		res.status(201).send(result);
	};
}

export const fastifyAccountAPI = (accountRepository: IAccountRepository, imessage: IMessage) => {
	const accountService: IAccountService = new AccountService(accountRepository, imessage);
	const accountApi: FastifyAccountAPI = new FastifyAccountAPI(accountService);

	return (app: FastifyInstance, options: FastifyPluginOptions, done: any) => {
		app.post('/', accountApi.create);
		done();
	};
};
