import "reflect-metadata"
import { cleanUpMetadata } from "inversify-express-utils"
import { DomainEvent } from "../modules/shared/domain/DomainEvent"
import { Uuid } from "../modules/shared/domain/value-object/Uuid"
import { SendWelcomeEmailOnUserCreated } from "../modules/users/application/use-case/subscriber/SendWelcomeEmailOnUserCreated"
import { UserCreatedDomainEvent } from "../modules/users/domain/event/UserCreatedDomainEvent"
import { FakeUserRepository } from "../modules/users/infrastructure/__tests__/fake/fake-user.repository"
import { UserRepository } from "../modules/users/domain/repository/user.repository"
import { DomainEventSubscriber } from "../modules/shared/domain/DomainEventSubscriber"
import { container } from "../modules/shared/infrastructure/Inversify/inversify.config"
import { FakeEmailService } from "../modules/users/infrastructure/__tests__/fake/email.service"
import { EmailService } from "../modules/users/domain/service/email.service"

describe('Send welcome email on user created', () => {
    beforeEach(() => {
        cleanUpMetadata()
    })

    test('It send a welcome email on user created event published', async () => {
        const fakeUserRepository = new FakeUserRepository()
        container.bind<UserRepository>('UserRepository').toConstantValue(fakeUserRepository)
        const fakeEmailService = new FakeEmailService()
        container.bind<EmailService>('EmailService').toConstantValue(fakeEmailService)
        container.bind<SendWelcomeEmailOnUserCreated>(SendWelcomeEmailOnUserCreated).to(SendWelcomeEmailOnUserCreated)

        const sendWelcomeEmailOnUserCreated = container.get<DomainEventSubscriber<DomainEvent>>(SendWelcomeEmailOnUserCreated)
        const userCreatedDomainEvent = UserCreatedDomainEvent.fromPrimitives({
            aggregateId: Uuid.random().toString(),
            attributes: { name: 'test', email: 'john@doe.com' },
            eventId: Uuid.random().toString(),
            occurredOn: new Date()
        })

        await sendWelcomeEmailOnUserCreated.on(userCreatedDomainEvent)

        expect(fakeUserRepository.findOrFailWasCalled).toBeTruthy()
        expect(fakeEmailService.sendWasCalled).toBeTruthy()
    })
})