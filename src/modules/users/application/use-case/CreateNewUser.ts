import { inject, injectable } from "inversify"
import { User } from "../../domain/entity/User"
import { UserName } from "../../domain/value-object/UserName"
import { EventBus } from "../../../shared/domain/EventBus"
import { UserEmail } from "../../domain/value-object/UserEmail"

@injectable()
export class CreateNewUser {
    constructor(@inject("EventBus") private eventBus: EventBus) {}

    async execute(userName: UserName, userEmail: UserEmail) {
        const user = User.create(
            userName,
            userEmail,
        )

        await this.eventBus.publish(user.pullDomainEvents())
    }
}