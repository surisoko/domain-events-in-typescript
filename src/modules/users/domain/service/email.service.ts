import { UserEmail } from "../value-object/UserEmail";

export interface EmailService {
    send(userEmail: UserEmail): Promise<void>
}
