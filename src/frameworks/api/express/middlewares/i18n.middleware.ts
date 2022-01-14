import { Request } from 'express';
import { IMessage } from '../../../../commons/imessage';

export const l18nMiddleware = (i18n: IMessage, request: Request, next: () => void): void => {
	request.message = i18n;
	let lang = 'en';

	if (request.headers['accept-language']) {
		lang = request.headers['accept-language'];
	} else if (request.query['lang']) {
		lang = request.query['lang'] + '';
	}

	i18n.setLocale(lang);

	next();
};
