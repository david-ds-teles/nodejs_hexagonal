import { accountCmd } from '../account';
import { ICommand } from '../adapters/icommand';
import { IDBDriver } from '../adapters/idb.driver';

export class CommandLineInterface<DB> {
	private commands: Map<string, ICommand> = new Map();

	constructor(db: IDBDriver<DB>) {
		this.commands.set('account', accountCmd(db));
	}

	start() {
		console.log('starting command line interface');

		if (process.argv == null || process.argv.length < 3) throw Error('you need provide a command');

		const args: string[] = process.argv.slice(2);
		const commandKey = args[0];

		const isCommandExists = this.commands.has(commandKey);

		if (!isCommandExists) throw Error(`the command ${commandKey} provided doesn't exists`);

		const command = this.commands.get(commandKey);
		command?.exec(args);
	}
}
