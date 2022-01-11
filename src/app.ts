import { IDBDriver } from './adapters/idb.driver';
import { MongoCollections } from './types/mongo.db.collections.type';
import { ExpressAPI } from './frameworks/express.api';
import { MongoDB } from './frameworks/mongodb';

(async () => {
	console.log('starting nodejs hexagonal example');
	const dbDriver: IDBDriver<MongoCollections> = new MongoDB();
	await dbDriver.connect();

	const api: ExpressAPI<MongoCollections> = new ExpressAPI(dbDriver);
	api.start();
})();
