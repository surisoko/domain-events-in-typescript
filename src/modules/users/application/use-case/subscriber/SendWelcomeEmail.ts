import { inject, injectable } from "inversify"
import { UserId } from "../../../domain/value-object/UserId"
import { UserRepository } from "../../../domain/repository/user.repository"
import { EmailService } from "../../../domain/service/email.service"

@injectable()
export class SendWelcomeEmail {
    constructor(
      @inject('UserRepository') private userRepository: UserRepository,
      @inject('EmailService') private emailService: EmailService
    ) {}

    async execute(userId: UserId): Promise<void> {     
      try {
        const user = await this.userRepository.findByIdOrFail(userId)
        await this.emailService.send(user.email)
      } catch(error: any) {
        // save error in tracing service
      }
    }
}
