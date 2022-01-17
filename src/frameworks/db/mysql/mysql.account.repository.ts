import { Connection } from 'mysql';
import { Account } from '../../../account/core/entities/account';
import { IAccountRepository } from '../../../account/repository/iaccount.repository';

export class MySqlAccountRepository implements IAccountRepository {
	private conn: Connection;

	constructor(conn: Connection) {
		this.conn = conn;
	}

	async save(account: Account): Promise<string> {
		console.log('saving to an mySQL DB', account);

		const promisse: Promise<string> = new Promise((resolve, reject) => {
			this.conn.query({ sql: 'INSERT INTO account(email) VALUES (?)' }, [account.email], (err, result) => {
				if (err) {
					console.error('failed to create account with error', err);
					reject(err);
				} else {
					console.log('account saved');
					account._id = result.insertId;
					resolve(result.insertId);
				}
			});
		});

		return promisse;
	}

	update(account: Account): Promise<void> {
		console.log('update account to mysql DB', account);

		const promisse: Promise<void> = new Promise((resolve, reject) => {
			this.conn.query({ sql: 'UPDATE account SET email = ? WHERE _id = ?' }, [account.email, account._id], (err, result) => {
				if (err) {
					console.error('failed to update account with error', err);
					reject(err);
				} else {
					console.log('account updated', result);
					resolve();
				}
			});
		});

		return promisse;
	}

	fetchByEmail(email: string): Promise<Account> {
		console.log('fetchByEmail account by email from mysql DB', email);

		const promisse: Promise<Account> = new Promise((resolve, reject) => {
			this.conn.query({ sql: 'SELECT * FROM account WHERE email = ?' }, [email], (err, result) => {
				if (err) {
					console.error('failed to fetch account with error', err);
					reject(err);
				} else {
					console.log('account saved');
					resolve(result);
				}
			});
		});

		return promisse;
	}

}
