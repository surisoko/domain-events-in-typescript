import { injectable, inject } from "inversify"
import { DomainEventClass } from '../../../../shared/domain/DomainEvent'
import { DomainEventSubscriber } from '../../../../shared/domain/DomainEventSubscriber'
import { UserCreatedDomainEvent } from '../../../domain/event/UserCreatedDomainEvent'
import { UserId } from '../../../domain/value-object/UserId'
import { SendWelcomeEmail } from './SendWelcomeEmail'

@injectable()
export class SendWelcomeEmailOnUserCreated implements DomainEventSubscriber<UserCreatedDomainEvent> {
  @inject(SendWelcomeEmail)
  private sendWelcomeEmail: SendWelcomeEmail

  subscribedTo(): DomainEventClass[] {
    return [UserCreatedDomainEvent]
  }

  async on(userCreatedDomainEvent: UserCreatedDomainEvent) {
    await this.sendWelcomeEmail.execute(new UserId(userCreatedDomainEvent.aggregateId))
  }
}
