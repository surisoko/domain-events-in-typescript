import { injectable } from "inversify"
import { DomainEvent } from "../../DomainEvent"
import { EventBus } from "../../EventBus"
import { DomainEventSubscribers } from "../../../infrastructure/EventBus/DomainEventSubscribers"
import { EventEmitter } from "stream"

@injectable()
export class FakeEventBus extends EventEmitter implements EventBus {
    public events: DomainEvent[]
    public subscribers: DomainEventSubscribers

    public publishWasCalled = false
    public addSubscribersWasCalled = false

    async publish(events: DomainEvent[]): Promise<void> {
        this.publishWasCalled = true
        this.events = events
    }

    addSubscribers(subscribers: DomainEventSubscribers): void {
        this.addSubscribersWasCalled = true
        this.subscribers = subscribers
    }
}