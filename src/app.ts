import { IDBDriver } from './commons/idb.driver';
import { MongoCollections } from './types/mongo.db.collections.type';
import { ExpressAPI } from './frameworks/api/express/express.api';
import { MongoDB } from './frameworks/db/mongodb/mongodb.driver';
(async () => {
	console.log('starting nodejs hexagonal example');
	const dbDriver: IDBDriver<MongoCollections> = new MongoDB();
	await dbDriver.connect();

	const api: ExpressAPI<MongoCollections> = new ExpressAPI(dbDriver);
	api.start();
})();
