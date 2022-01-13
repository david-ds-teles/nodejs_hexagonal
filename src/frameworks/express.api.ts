import express, { Request, Response } from 'express';
import { accountRouter } from '../account';
import { IDBDriver } from '../adapters/idb.driver';
import { IMessage } from '../adapters/imessage';
import { I18nMessage } from './i18n';

const app = express();
const PORT = process.env.PORT;

export class ExpressAPI<DB> {
	private i18nMessage: IMessage;

	constructor(readonly dbDriver: IDBDriver<DB>) {
		this.i18nMessage = new I18nMessage();
	}

	private configMiddlewared() {
		app.use(express.json());
		app.use(express.urlencoded({ extended: true }));
		app.use(this.l18nMiddleware);
	}

	private configRouters() {
		app.use('/account', accountRouter(this.dbDriver, this.i18nMessage));
	}

	private l18nMiddleware = (request: Request, response: Response, next: () => void): void => {
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

	start(): void {
		console.log('starting express api');

		this.configMiddlewared();
		this.configRouters();

		app.listen(PORT, () => {
			console.log('express server started at port: ' + PORT);
		});
	}
}
