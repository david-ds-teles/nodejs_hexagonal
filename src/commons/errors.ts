export class InvalidDataError {
	key: string;
	message: string;

	constructor(key: string, message: string) {
		this.key = key;
		this.message = message;
	}
}

export class NotFoundError {
	key: string;
	message: string;

	constructor(key: string, message: string) {
		this.key = key;
		this.message = message;
	}
}
