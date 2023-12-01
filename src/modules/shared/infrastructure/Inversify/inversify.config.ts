import { EventBus } from "../../domain/EventBus"
import { InMemoryAsyncEventBus } from "../EventBus/InMemorty/InMemoryAsyncEventBus"
import { baseContainer } from "./container"
import '../../../users/infrastructure/container/users-container'

// event bus
baseContainer.bind(InMemoryAsyncEventBus).toSelf().inSingletonScope()
baseContainer.bind<EventBus>('EventBus').toService(InMemoryAsyncEventBus)

export { baseContainer as container }
