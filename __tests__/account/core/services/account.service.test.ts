import { Account } from '../../../../src/account/core/entities/account';
import { AccountService } from '../../../../src/account/core/services/account.service';
import { IAccountService } from '../../../../src/account/core/services/iaccount.service';
import { IAccountRepository } from '../../../../src/account/repository/iaccount.repository';
import { InvalidDataError } from '../../../../src/commons/errors';
import { IMessage } from '../../../../src/commons/imessage';

import { mock } from 'jest-mock-extended';

const fakeRepository: IAccountRepository = {
	save: jest.fn().mockReturnValue(Promise.resolve('FAKE ID')),
	update: jest.fn().mockReturnValue(Promise.resolve()),
	fetchByEmail: jest.fn().mockImplementation((email: string) => new Account(email, 'FAKE ID')),
};

const accountService: IAccountService = new AccountService(fakeRepository, mock<IMessage>());

describe('Account Service', () => {
	test('should create an account successfully', async () => {
		const email = 'fake@fake.com';
		const account: Account = await accountService.create(new Account(email));
		expect(fakeRepository.save).toHaveBeenCalled();
		expect(account).not.toBeNull();
		expect(account.email).toBe(email);
	});

	test('should fail to create an account with a forbidden email provider', async () => {
		const email = 'fake@foo.com';
		try {
			await accountService.update(new Account(email, 'FAKE ID'));
		} catch (err) {
			expect(err).toBeInstanceOf(InvalidDataError);
		}
	});

	test('should update an account successfully', async () => {
		const email = 'fake@fake.com';
		const account: Account = new Account(email, 'FAKE ID');

		await accountService.update(account);
		expect(fakeRepository.update).toHaveBeenCalled();
		expect(account).not.toBeNull();
		expect(account.email).toBe(email);
	});

	test('should fail to update an account with a forbidden email provider', async () => {
		const email = 'fake@foo.com';
		try {
			await accountService.create(new Account(email));
		} catch (err) {
			expect(err).toBeInstanceOf(InvalidDataError);
		}
	});

	test('should fetch an account by email', async () => {
		const email = 'fake@fake.com';

		const account: Account = await accountService.fetchByEmail(email);
		expect(fakeRepository.fetchByEmail).toHaveBeenCalled();
		expect(account).not.toBeNull();
		expect(account._id).toBe('FAKE ID');
	});

	test('should fail to fetch an account with a forbidden email provider', async () => {
		const email = 'fake@foo.com';
		try {
			await accountService.fetchByEmail(email);
		} catch (err) {
			expect(err).toBeInstanceOf(InvalidDataError);
		}
	});
});
