import { accountCmd } from '../account';
import { ICommand } from '../adapters/icommand';
import { IDBDriver } from '../adapters/idb.driver';
import { IMessage } from '../adapters/imessage';
import { i18n, I18nMessage } from './i18n';

export class CommandLineInterface<DB> {
	private commands: Map<string, ICommand> = new Map();
	private i18nMessage: IMessage;

	constructor(db: IDBDriver<DB>) {
		this.i18nMessage = new I18nMessage();
		this.commands.set('account', accountCmd(db, this.i18nMessage));
	}

	start() {
		console.log('starting command line interface');

		if (process.argv == null || process.argv.length < 3) {
			const msg = this.i18nMessage.msg('command_args_not_provided');
			throw Error(msg);
		}

		const args: string[] = process.argv.slice(2);
		const commandKey = args[0];

		const isCommandExists = this.commands.has(commandKey);

		if (!isCommandExists) {
			const msg = this.i18nMessage.msg('command_provided_not_found', { cmd: commandKey });
			throw Error(msg);
		}

		const command = this.commands.get(commandKey);
		command?.exec(args);
	}
}
