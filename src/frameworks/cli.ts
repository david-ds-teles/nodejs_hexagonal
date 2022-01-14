import { ICommand } from '../account/cmd/icommand';
import { IDBDriver } from '../commons/idb.driver';
import { IMessage } from '../commons/imessage';
import { I18nMessage } from './i18n.message';
import { IAccountRepository } from '../account/repository/iaccount.repository';
import { MongoDBAccountRepository } from './db/mongodb/mongodb.account.repository';
import { IAccountService } from '../account/core/services/iaccount.service';
import { AccountService } from '../account/core/services/account.service';
import { AccountCmd } from '../account/cmd/account.cmd';

export class CommandLineInterface<DB> {
	private commands: Map<string, ICommand> = new Map();
	private i18nMessage: IMessage;

	constructor(db: IDBDriver<DB>) {
		this.i18nMessage = new I18nMessage();
		const accountRepository: IAccountRepository = new MongoDBAccountRepository(db);
		const accountService: IAccountService = new AccountService(accountRepository, this.i18nMessage);
		const cmd: ICommand = new AccountCmd(accountService, this.i18nMessage);
		this.commands.set('account', cmd);
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
