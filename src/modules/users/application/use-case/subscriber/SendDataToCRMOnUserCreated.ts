import { injectable } from "inversify"
import * as fs from 'fs'
import { DomainEventClass } from '../../../../shared/domain/DomainEvent'
import { DomainEventSubscriber } from '../../../../shared/domain/DomainEventSubscriber'
import { UserCreatedDomainEvent } from '../../../domain/event/UserCreatedDomainEvent'

@injectable()
export class SendDataToCRMOnUserCreated implements DomainEventSubscriber<UserCreatedDomainEvent> {
  subscribedTo(): DomainEventClass[] {
    return [UserCreatedDomainEvent]
  }

  async on(userCreatedDomainEvent: UserCreatedDomainEvent) {
    await fs.writeFile('test2.txt', `user data send to CRM with id: ${userCreatedDomainEvent.aggregateId}`, err => {
      if (err) {
        console.error(err)
      }
    })
  }
}
