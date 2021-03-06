import { ICommand } from './icommand';
import { IMessage } from '../../commons/imessage';
import { IAccountService } from '../core/services/iaccount.service';
import { Account } from '../core/entities/account';

type exec = {
	(args: string[]): Promise<void>;
};

export class AccountCmd implements ICommand {
	private cmds: Map<string, exec> = new Map();

	constructor(private readonly accountService: IAccountService, private readonly message: IMessage) {
		this.cmds.set('create-account', this.create);
	}

	async exec(args: string[]) {
		console.log('execute commands', args);

		const command = args[1];
		if (!this.cmds.has(command)) {
			const msg = this.message.msg('command_provided_for_args_not_found', { cmd: command, arg: args[0] });
			return Promise.reject(new Error(msg));
		}

		const execFunc = this.cmds.get(command);
		if (execFunc != null) {
			return await execFunc(args);
		} else {
			const msg = this.message.msg('command_provided_for_args_not_found', { cmd: command, arg: args[0] });
			return Promise.reject(new Error(msg));
		}
	}

	create = async (args: string[]) => {
		const data = args[2];
		console.log('starting create account cmd with', data);

		if (data == null) {
			const msg = this.message.msg('account_create_data_param_not_found');
			return Promise.reject(new Error(msg));
		}

		let accountJSON;

		try {
			accountJSON = JSON.parse(data);
			console.log(accountJSON);
		} catch (err) {
			console.error('failed to parse the json data', err);
			return Promise.reject(err);
		}

		try {
			const accountCreated = await this.accountService.create(new Account(accountJSON.email));
			console.log('account created', accountCreated);
			return Promise.resolve();
		} catch (err) {
			console.error('failed to create user with error', err);
			return Promise.reject(err);
		}
	};
}
