/**
 * l18n configuration to provide internationalized messages. This way, messages are easy to maintaining.
 *
 * The messages are generated inside locales directory, each json containing messages from the respective
 * language.
 */
import { I18n } from 'i18n';
import path from 'path';
import { IMessage } from '../adapters/imessage';

export const i18n = new I18n();

i18n.configure({
	defaultLocale: 'en',
	directory: path.join('./', 'locales'),
});

i18n.setLocale('en');

export class I18nMessage implements IMessage {
	msg(key: string, options?: any): string {
		return i18n.__(key, options);
	}

	plural(key: string, qtd: number): string {
		return i18n.__n(key, qtd);
	}
}
