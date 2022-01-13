describe('testing jest configuration to work with typescript', () => {
	const message = 'hello ts-jest is fine';

	test('hello test config ok', () => {
		expect(message).toBe('hello ts-jest is fine');
	});
});
