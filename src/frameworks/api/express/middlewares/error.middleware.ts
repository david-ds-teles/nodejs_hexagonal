import { Request, Response } from 'express';
import { InvalidDataError } from '../../../../commons/errors';

export const errorHandler = (err: any, req: Request, res: Response, next: () => void): void => {
	if (err instanceof InvalidDataError) {
		res.status(400).send(req.message.msg(err.key));
		return;
	}

	res.status(500).send(req.message.msg('internal_error'));
	next();
};
