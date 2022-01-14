import { IDBDriver } from './commons/idb.driver';
import { MongoCollections } from './types/mongo.db.collections.type';
import { CommandLineInterface } from './frameworks/cli';
import { MongoDB } from './frameworks/db/mongodb/mongodb.driver';
(async () => {
	console.log('starting nodejs hexagonal example CLI mode');
	const dbDriver: IDBDriver<MongoCollections> = new MongoDB();
	await dbDriver.connect();

	const cli: CommandLineInterface<MongoCollections> = new CommandLineInterface(dbDriver);
	cli.start();
})();
