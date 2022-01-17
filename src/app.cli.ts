import { IDBDriver } from './commons/idb.driver';
import { CommandLineInterface } from './frameworks/cli';
import { MongoDB } from './frameworks/db/mongodb/mongodb.driver';
(async () => {
	console.log('starting nodejs hexagonal example CLI mode');
	const dbDriver: IDBDriver = new MongoDB();
	await dbDriver.connect();

	const cli: CommandLineInterface = new CommandLineInterface(dbDriver);
	cli.start();
})();
