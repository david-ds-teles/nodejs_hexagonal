import express, { Request, Response, Router } from 'express';
import { InvalidDataError } from '../../../commons/errors';
import { Repositories } from '../../../commons/idb.driver';
import { IMessage } from '../../../commons/imessage';
import { I18nMessage } from '../../i18n.message';
import { expressAccountAPI } from './account/account.api.router';

const app = express();
const PORT = process.env.PORT;

export class ExpressAPI {
	private i18nMessage: IMessage;

	constructor(readonly repositories: Repositories) {
		this.i18nMessage = new I18nMessage();
	}

	private l18nMiddleware = (request: Request, _: Response, next: () => void): void => {
		request.message = this.i18nMessage;
		let lang = 'en';

		if (request.headers['accept-language']) {
			lang = request.headers['accept-language'];
		} else if (request.query['lang']) {
			lang = request.query['lang'] + '';
		}

		this.i18nMessage.setLocale(lang);

		next();
	};

	private errorHandler = (err: any, req: Request, res: Response, next: () => void): void => {
		if (err instanceof InvalidDataError) {
			res.status(400).send(this.i18nMessage.msg(err.key));
			return;
		}

		res.status(500).send(this.i18nMessage.msg('internal_error'));
		next();
	};

	private configRouters() {
		const account: Router = expressAccountAPI(this.repositories.account, this.i18nMessage);
		app.use('/account', account);
	}

	start(): void {
		console.log('starting express api');

		app.use(express.json());
		app.use(express.urlencoded({ extended: true }));
		app.use(this.l18nMiddleware);

		this.configRouters();

		app.use(this.errorHandler);

		app.listen(PORT, () => {
			console.log('express server started at port: ' + PORT);
		});
	}
}
