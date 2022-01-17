import { InvalidDataError } from '../../../commons/errors';

export class Account {
	_id?: any;
	email: string;

	constructor(email: string, id?: any) {
		this.email = email;
		this._id = id;
	}

	idIsValid() {
		if (this._id == null) throw new InvalidDataError('invalid_id', '_id provider is invalid');
	}

	checkEmailProvider() {
		const emailReg = new RegExp(/^.+@.+\.com/g);
		const forbidenProviderReg = new RegExp(/^.+@foo\.com/g);

		if (this.email == null) throw new InvalidDataError('invalid_email', 'email null');

		let result = emailReg.exec(this.email);
		if (result == null) throw new InvalidDataError('invalid_email', `email provided ${this.email}`);

		result = forbidenProviderReg.exec(this.email);

		if (result != null) throw new InvalidDataError('account_email_provider_not_supported', this.email);
	}
}
