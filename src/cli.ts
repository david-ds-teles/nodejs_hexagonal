import { IDBDriver } from './adapters/idb.driver';
import { MongoCollections } from './types/mongo.db.collections.type';
import { CommandLineInterface } from './frameworks/command.line.interface';
import { MongoDB } from './frameworks/mongodb';

(async () => {
	console.log('starting nodejs hexagonal example CLI mode');
	const dbDriver: IDBDriver<MongoCollections> = new MongoDB();
	await dbDriver.connect();

	const cli: CommandLineInterface<MongoCollections> = new CommandLineInterface(dbDriver);
	cli.start();
})();
