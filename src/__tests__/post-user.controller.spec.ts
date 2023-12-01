import "reflect-metadata"
import { agent } from './agent'
import "../modules/users/infrastructure/controller/save-user.controller"
import { cleanUpMetadata } from "inversify-express-utils"
import { container } from '../modules/shared/infrastructure/Inversify/inversify.config'
import { EventBus } from '../modules/shared/domain/EventBus'
import { FakeEventBus } from '../modules/shared/domain/fake/EventBus/FakeEventBus'
import { UserCreatedDomainEvent } from '../modules/users/domain/event/UserCreatedDomainEvent'
import httpStatus from 'http-status'

describe('Save user controller', () => {
  beforeEach(() => {
    cleanUpMetadata()
  })

  test('it send a user.created domain event when user is created', async () => {
    container.unbind('EventBus')

    container.bind(FakeEventBus).toSelf().inSingletonScope()
    container.bind<EventBus>('EventBus').toService(FakeEventBus)

    await agent
      .post('/user')
      .send({
        username: 'john',
        email: 'john@doe.com'
      })
      .expect(httpStatus.CREATED)

      const eventBus = container.get<EventBus>('EventBus') as FakeEventBus

      expect(eventBus.publishWasCalled).toBeTruthy()
      expect(eventBus.events.length).toBe(1)
      expect(eventBus.events[0].eventName).toBe(UserCreatedDomainEvent.EVENT_NAME)
  })
})
