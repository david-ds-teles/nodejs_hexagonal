import { IDBDriver } from './commons/idb.driver';
import { CommandLineInterface } from './frameworks/cli';
import { MySql } from './frameworks/db/mysql/mysql.driver';
(async () => {
	console.log('starting nodejs hexagonal example CLI mode');
	const dbDriver: IDBDriver = new MySql();
	await dbDriver.connect();

	const cli: CommandLineInterface = new CommandLineInterface(dbDriver);
	cli.start();
})();
