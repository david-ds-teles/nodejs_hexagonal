import { IApi } from './commons/api';
import { IDBDriver } from './commons/idb.driver';
import { ExpressAPI } from './frameworks/api/express/express.api';
import { MongoDB } from './frameworks/db/mongodb/mongodb.driver';

(async () => {
	console.log('starting nodejs hexagonal example Express and Mongodb mode');

	const dbDriver: IDBDriver = new MongoDB();
	await dbDriver.connect();

	const api: IApi = new ExpressAPI(dbDriver.repositories);
	api.start();
})();
