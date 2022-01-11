import { ICommand } from '../../adapters/icommand';
import { IAccountService } from '../core/services/iaccount.service';

export class AccountCmd implements ICommand {
	private cmds: Map<string, (args: string[]) => {}> = new Map();

	constructor(private readonly accountService: IAccountService) {
		this.cmds.set('create-account', this.create);
	}

	exec(args: string[]): void {
		console.log('execute commands', args);

		const command = args[1];
		if (!this.cmds.has(command)) throw Error(`the command ${command} provided for ${args[0]} doesn't exists`);

		this.cmds.get(command)!(args);
	}

	create = async (args: string[]) => {
		const data = args[2];
		console.log('starting create account cmd with', data);

		if (data == null) throw Error(`data param not informed. You need provide the parameter in json valid format`);

		let accountJSON;

		try {
			accountJSON = JSON.parse(data);
			console.log(accountJSON);
		} catch (err) {
			console.error('failed to parse the json data');
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
	}
}
