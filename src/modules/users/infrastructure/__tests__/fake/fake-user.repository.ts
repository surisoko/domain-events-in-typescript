import { injectable } from "inversify";
import { User } from "../../../domain/entity/User";
import { UserRepository } from "../../../domain/repository/user.repository";
import { UserEmail } from "../../../domain/value-object/UserEmail";
import { UserId } from "../../../domain/value-object/UserId";
import { UserName } from "../../../domain/value-object/UserName";

@injectable()
export class FakeUserRepository implements UserRepository {
    public findOrFailWasCalled = false

    async findByIdOrFail(userId: UserId): Promise<User> {
        this.findOrFailWasCalled = true

        return new Promise((resolve, reject) => {
            const user = User.create(
                new UserName('John'),
                new UserEmail('john@doe.com'),
            )

            resolve(user)
        })
    }
}
