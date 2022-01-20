export interface ICommand {
	exec(args: string[]): Promise<void>;
}
