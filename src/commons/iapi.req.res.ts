import { IMessage } from './imessage';

export interface Request<T> {
	message: IMessage;
	body: T;
}

export interface Response<T> {
	status(code: number): Response<T>;
	send(body?: T): void;
}
