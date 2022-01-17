import { IApi } from './commons/api';
import { IDBDriver } from './commons/idb.driver';
import { FastifyAPI } from './frameworks/api/fastify/fastify.api';
import { MySql } from './frameworks/db/mysql/mysql.driver';
(async () => {
	console.log('starting nodejs hexagonal example fastify and mysql mode');

	const dbDriver: IDBDriver = new MySql();
	await dbDriver.connect();

	const api: IApi = new FastifyAPI(dbDriver.repositories);
	api.start();
})();
