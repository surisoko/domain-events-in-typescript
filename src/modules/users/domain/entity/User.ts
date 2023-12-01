import { AggregateRoot } from "../../../shared/domain/AggregateRoot"
import { UserCreatedDomainEvent } from "../event/UserCreatedDomainEvent"
import { UserId } from "../value-object/UserId"
import { UserName } from "../value-object/UserName"
import { UserEmail } from "../value-object/UserEmail"

export class User extends AggregateRoot {
    readonly id: UserId
    readonly name: UserName
    readonly email: UserEmail

    private constructor(
        id: UserId,
        name: UserName,
        email: UserEmail
    ) {
        super()
        this.id = id
        this.name = name
        this.email = email
    }

    static create(name: UserName, email: UserEmail): User {
        const user = new User(UserId.random(), name, email)

        user.record(
            new UserCreatedDomainEvent({
                aggregateId: user.id.value,
                name: user.name.value,
                email: user.email.value,
              })
        )

        return user
    }

    toPrimitives() {
        return {
            id: this.id.value,
            name: this.name.value,
            email: this.email.value,
        }
    } 
}