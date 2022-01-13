export interface IDBDriver<T> {
	connect(): void;
	close(): void;
	get conn(): T;
}
