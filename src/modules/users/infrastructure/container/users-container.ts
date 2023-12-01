import "../../../users/infrastructure/controller"
import { SendWelcomeEmailOnUserCreated } from "../../../users/application/use-case/subscriber/SendWelcomeEmailOnUserCreated"
import { SendDataToCRMOnUserCreated } from "../../../users/application/use-case/subscriber/SendDataToCRMOnUserCreated"
import { CreateNewUser } from "../../../users/application/use-case/CreateNewUser"
import { DomainEventSubscriber } from "../../../shared/domain/DomainEventSubscriber"
import { DomainEvent } from "../../../shared/domain/DomainEvent"
import { baseContainer } from "../../../shared/infrastructure/Inversify/container"
import { SendWelcomeEmail } from "../../application/use-case/subscriber/SendWelcomeEmail"

// subscribers
baseContainer.bind<DomainEventSubscriber<DomainEvent>>('DomainEventSubscriber').to(SendWelcomeEmailOnUserCreated)
baseContainer.bind<DomainEventSubscriber<DomainEvent>>('DomainEventSubscriber').to(SendDataToCRMOnUserCreated)

// use case
baseContainer.bind<CreateNewUser>(CreateNewUser).to(CreateNewUser)
baseContainer.bind<SendWelcomeEmail>(SendWelcomeEmail).to(SendWelcomeEmail)
