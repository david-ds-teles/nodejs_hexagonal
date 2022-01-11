import express from 'express';
import { accountRouter } from '../account';
import { IDBDriver } from '../adapters/idb.driver';

const app = express();
const PORT = process.env.PORT;

export class ExpressAPI<DB> {
	constructor(readonly dbDriver: IDBDriver<DB>) {}

	private configMiddlewared() {
		app.use(express.json());
		app.use(express.urlencoded({ extended: true }));
	}

	private configRouters() {
		app.use('/account', accountRouter(this.dbDriver));
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
