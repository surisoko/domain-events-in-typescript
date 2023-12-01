import { server } from './app'
import { EventBus } from './modules/shared/domain/EventBus'
import { DomainEventSubscribers } from './modules/shared/infrastructure/EventBus/DomainEventSubscribers'
import { container } from './modules/shared/infrastructure/Inversify/inversify.config'

const port = 3000

async function configureEventBus () {
  const eventBus = container.get<EventBus>('EventBus')

  await eventBus.addSubscribers(DomainEventSubscribers.from(container))
}

configureEventBus()

let app = server.build()

app.listen(port, () => {
  console.log(`Running in http://localhost:${port}`)
})
