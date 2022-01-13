import express from 'express';
import { accountRouter } from '../account';
import { IDBDriver } from '../adapters/idb.driver';
import { IMessage } from '../adapters/imessage';
import { i18n, I18nMessage } from './i18n';

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
		app.use(i18n.init);
	}

	private configRouters() {
		app.use('/account', accountRouter(this.dbDriver, this.i18nMessage));
	}

	start(): void {
		console.log('starting express api');

		this.configMiddlewared();
		this.configRouters();

		app.listen(PORT, () => {
			console.log('express server started at port: ' + PORT);
		});
	}
}
