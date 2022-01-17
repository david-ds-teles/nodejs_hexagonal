import { Connection } from 'mysql';
import { Account } from '../../../account/core/entities/account';
import { IAccountRepository } from '../../../account/repository/iaccount.repository';

export class MySqlAccountRepository implements IAccountRepository {
	private conn: Connection;

	constructor(conn: Connection) {
		this.conn = conn;
	}

	async save(account: Account): Promise<string> {
		console.log('saving to an mySQL database', account);

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
}
