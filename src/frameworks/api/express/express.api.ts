import express, { Request, Response, Router } from 'express';
import { Repositories } from '../../../commons/idb.driver';
import { IMessage } from '../../../commons/imessage';
import { I18nMessage } from '../../i18n.message';
import { accountRouter } from './account/account.api.router';
import { errorHandler } from './middlewares/error.middleware';
import { l18nMiddleware } from './middlewares/i18n.middleware';

const app = express();
const PORT = process.env.PORT;

export class ExpressAPI {
	private i18nMessage: IMessage;

	constructor(readonly repositories: Repositories) {
		this.i18nMessage = new I18nMessage();
	}

	private configMiddlewared() {
		app.use(express.json());
		app.use(express.urlencoded({ extended: true }));
		app.use(this.l18nMiddleware);
	}

	private l18nMiddleware = (request: Request, _: Response, next: () => void): void => {
		l18nMiddleware(this.i18nMessage, request, next);
	};

	private configRouters() {
		const account: Router = accountRouter(this.repositories.account, this.i18nMessage);
		app.use('/account', account);
	}

	start(): void {
		console.log('starting express api');

		this.configMiddlewared();
		this.configRouters();
		app.use(errorHandler);

		app.listen(PORT, () => {
			console.log('express server started at port: ' + PORT);
		});
	}
}
