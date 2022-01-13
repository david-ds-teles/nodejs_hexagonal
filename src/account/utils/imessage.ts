export interface IMessage {
	msg(key: string, options?: any): string;
	plural(key: string, qtd: number): string;
	setLocale(lang: string): void;
}
