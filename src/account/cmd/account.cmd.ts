import { ICommand } from '../../adapters/icommand';
import { IMessage } from '../../adapters/imessage';
import { IAccountService } from '../core/services/iaccount.service';

export class AccountCmd implements ICommand {
	private cmds: Map<string, (args: string[]) => {}> = new Map();

	constructor(private readonly accountService: IAccountService, private readonly message: IMessage) {
		this.cmds.set('create-account', this.create);
	}

	exec(args: string[]): void {
		console.log('execute commands', args);

		const command = args[1];
		if (!this.cmds.has(command)) {
			const msg = this.message.msg('command_provided_for_args_not_found', { cmd: command, arg: args[0] });
			throw Error(msg);
		}

		this.cmds.get(command)!(args);
	}

	create = async (args: string[]) => {
		const data = args[2];
		console.log('starting create account cmd with', data);

		if (data == null) {
			const msg = this.message.msg('account_create_data_param_not_found');
			throw Error(msg);
		}

		let accountJSON;

		try {
			accountJSON = JSON.parse(data);
			console.log(accountJSON);
		} catch (err) {
			console.error('failed to parse the json data', err);
			process.exit(1);
		}

		try {
			const accountCreated = await this.accountService.create(accountJSON);
			console.log('account created', accountCreated);
			process.exit(0);
		} catch (err) {
			console.error('failed to create user with error', err);
			process.exit(1);
		}
	};
}
