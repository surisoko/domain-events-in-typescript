import { EmailService } from "../../../domain/service/email.service";
import { UserEmail } from "../../../domain/value-object/UserEmail";

export class FakeEmailService implements EmailService {
    public sendWasCalled = false

    async send(userEmail: UserEmail): Promise<void> {
        this.sendWasCalled = true

        return new Promise((reject,resolve) => {
            resolve()
        })
    }
}