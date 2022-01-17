import { IApi } from './commons/api';
import { IDBDriver } from './commons/idb.driver';
import { ExpressAPI } from './frameworks/api/express/express.api';
import { FastifyAPI } from './frameworks/api/fastify/fastify.api';
import { MongoDB } from './frameworks/db/mongodb/mongodb.driver';
import { MySql } from './frameworks/db/mysql/mysql.driver';
(async () => {
	const DB: string = process.env.DB || 'mongodb';
	const API: string = process.env.API || 'express';
	console.log('starting nodejs hexagonal example');
	console.log('checking the DB type');

	const dbDriver: IDBDriver = DB === 'mongodb' ? new MongoDB() : new MySql();
	await dbDriver.connect();

	const api: IApi = API === 'express' ? new ExpressAPI(dbDriver.repositories) : new FastifyAPI(dbDriver.repositories);
	api.start();
})();
