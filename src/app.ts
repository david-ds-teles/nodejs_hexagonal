import { IDBDriver } from './commons/idb.driver';
import { ExpressAPI } from './frameworks/api/express/express.api';
import { MySql } from './frameworks/db/mysql/mysql.driver';
(async () => {
	console.log('starting nodejs hexagonal example');
	// const dbDriver: IDBDriver<MongoCollections> = new MongoDB();
	const dbDriver: IDBDriver = new MySql();
	await dbDriver.connect();

	const api: ExpressAPI = new ExpressAPI(dbDriver.repositories);
	api.start();
})();
