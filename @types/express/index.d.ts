import { IMessage } from "../../src/account/utils/imessage";

declare global{
    namespace Express {
        interface Request {
            message: IMessage
        }
    }
}