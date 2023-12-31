import { DomainEvent } from "../../../shared/domain/DomainEvent"

type CreateUserDomainEventAttributes = {
  readonly name: string
  readonly email: string
}

export class UserCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'user.created'
  readonly name: string
  readonly email: string

  constructor({
    aggregateId,
    name,
    email,
    eventId,
    occurredOn
  }: {
    aggregateId: string
    eventId?: string
    name: string
    email: string
    occurredOn?: Date
  }) {
    super({ eventName: UserCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn })
    this.name = name
    this.email = email
  }

  static fromPrimitives(params: {
    aggregateId: string
    attributes: CreateUserDomainEventAttributes
    eventId: string
    occurredOn: Date
  }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params
    return new UserCreatedDomainEvent({
      aggregateId,
      name: attributes.name,
      email: attributes.email,
      eventId,
      occurredOn
    })
  }

  toPrimitives(): CreateUserDomainEventAttributes {
    const { name, email } = this
    return {
      name,
      email,
    }
  } 
}
