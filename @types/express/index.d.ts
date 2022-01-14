import { IMessage } from "../../src/commons/imessage";

declare global{
    namespace Express {
        interface Request {
            message: IMessage
        }
    }
}