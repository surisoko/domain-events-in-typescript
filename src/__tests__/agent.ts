import supertest, { SuperTest, Test } from 'supertest'
import { server } from '../app'

export const agent: SuperTest<Test> = supertest(server.build())
