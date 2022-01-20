import { mock, mockReset } from 'jest-mock-extended';
import { AccountCmd } from '../../../src/account/cmd/account.cmd';
import { ICommand } from '../../../src/account/cmd/icommand';
import { IAccountService } from '../../../src/account/core/services/iaccount.service';
import { IMessage } from '../../../src/commons/imessage';

const messageProvider: IMessage = mock<IMessage>();
const accountService: IAccountService = mock<IAccountService>();

const accountCmd: ICommand = new AccountCmd(accountService, messageProvider);

describe('Account CMD', () => {
	beforeEach(() => {
		mockReset(messageProvider);
		mockReset(accountService);
	});

	test('should execute account command successfully', async () => {
		const args: string[] = ['account', 'create-account', '{"email":"david.ds.teles@gmail.com"}'];

		await accountCmd.exec(args);
		expect(accountService.create).toHaveBeenCalled();
	});

	test('should give an error for unegistered command', async () => {
		const args: string[] = ['account', 'foo_command'];

		try {
			await accountCmd.exec(args);
		} catch (err) {
			expect(err).not.toBeNull;
		}

		expect(accountService.create).not.toHaveBeenCalled();
	});

	test('should give an error for bad JSON format', async () => {
		const args: string[] = ['account', 'create-account', '{email: fail@foo.bar}'];

		try {
			await accountCmd.exec(args);
		} catch (err) {
			expect(err).not.toBeNull;
		}

		expect(accountService.create).not.toHaveBeenCalled();
	});
});
