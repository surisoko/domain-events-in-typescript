import { User } from "../entity/User";
import { UserId } from "../value-object/UserId";

export interface UserRepository {
    findByIdOrFail(userId: UserId): Promise<User>
}
