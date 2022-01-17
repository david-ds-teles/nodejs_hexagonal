import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { IApi } from '../../../commons/api';
import { InvalidDataError, NotFoundError } from '../../../commons/errors';
import { Repositories } from '../../../commons/idb.driver';
import { IMessage } from '../../../commons/imessage';
import { I18nMessage } from '../../i18n.message';
import { fastifyAccountAPI } from './account/account.api.router';

const PORT = process.env.PORT;
const app = fastify();

export class FastifyAPI implements IApi {
	private i18n: IMessage;

	constructor(readonly repositories: Repositories) {
		this.i18n = new I18nMessage();
	}

	private i18nHook = (request: FastifyRequest, _: any, done: any) => {
		let lang = 'en';

		const query: any = request.query;

		if (request.headers['accept-language']) {
			lang = request.headers['accept-language'];
		} else if (query['lang']) {
			lang = query['lang'] + '';
		}

		this.i18n.setLocale(lang);
		done();
	};

	private errorHandler = (err: any, req: FastifyRequest, res: FastifyReply) => {
		if (err instanceof InvalidDataError) {
			res.status(400).send(this.i18n.msg(err.key));
			return;
		}

		if (err instanceof NotFoundError) {
			res.status(404).send(this.i18n.msg(err.key));
			return;
		}

		res.status(500).send(this.i18n.msg('internal_error'));
	};

	private configRouters() {
		console.log('configuring fastify routes');

		const accountRouter = fastifyAccountAPI(this.repositories.account, this.i18n);
		app.register(accountRouter, { prefix: '/account' });
	}

	start() {
		console.log('starting fastify api');

		app.setErrorHandler(this.errorHandler);
		app.addHook('preHandler', this.i18nHook);

		this.configRouters();

		app.listen(Number(PORT), (err, address) => {
			if (!err) {
				console.log('fastify server started at port: ' + address);
			} else {
				console.error('error trying to start fastify server with', err);
				process.exit(1);
			}
		});
	}
}
