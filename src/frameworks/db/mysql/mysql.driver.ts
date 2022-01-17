import { IDBDriver, Repositories } from '../../../commons/idb.driver';
import mysql, { Connection } from 'mysql';
import { MySqlAccountRepository } from './mysql.account.repository';

export class MySql implements IDBDriver {
	private db!: Connection;
	private repo!: Repositories;

	get repositories(): Repositories {
		return this.repo;
	}

	async connect() {
		console.log('starting mysql connection...');

		try {
			this.db = await mysql.createConnection({
				host: process.env.MYSQL_CONN || 'localhost',
				port: Number(process.env.MYSQL_PORT),
				database: process.env.DB_NAME,
				user: process.env.MYSQL_USER,
				password: process.env.MYSQL_PASS,
			});

			await this.db.connect();

			this.repo = {
				account: new MySqlAccountRepository(this.db),
			};

			console.log('mysql connection successfully initiated');
		} catch (err) {
			console.error('failed to connect to the db with error', err);
			process.exit(1);
		}
	}

	async close() {
		try {
			if (this.db) this.db.end();

			console.log('closing');
		} catch (err) {
			console.error('failed to close db connection with error', err);
			process.exit(1);
		}
	}
}
