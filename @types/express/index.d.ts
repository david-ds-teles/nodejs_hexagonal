import { IMessage } from "../../src/adapters/imessage";

declare global{
    namespace Express {
        interface Request {
            message: IMessage
        }
    }
}