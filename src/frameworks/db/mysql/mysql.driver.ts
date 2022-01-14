import { IDBDriver } from '../../../commons/idb.driver';

export class MySql implements IDBDriver<any> {

	get conn(): any {
		return null;
	}

	async connect() {
		console.log('starting mysql connection...');

		try {
			console.log('mysql connection successfully initiated');
		} catch (err) {
			console.error('failed to connect to the db with error', err);
			process.exit(1);
		}
	}

	async close() {
		try {
			console.log('closing');
		} catch (err) {
			console.error('failed to close db connection with error', err);
			process.exit(1);
		}
	}
}
