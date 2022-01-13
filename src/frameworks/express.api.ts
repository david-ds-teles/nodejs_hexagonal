import express, { Request, Response } from 'express';
import { accountAPI } from '../account';
import { IDBDriver } from '../ports/idb.driver';
import { IMessage } from '../account/utils/imessage';
import { I18nMessage } from './i18n.message';
import { AccountAPI } from '../account/api/account.api';

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
		const api: AccountAPI = accountAPI(this.dbDriver, this.i18nMessage);
		const router: express.Router = express.Router();

		router.use('/', api.create);
		
		app.use('/account', router);
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
