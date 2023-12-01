import "reflect-metadata"
import * as bodyParser from 'body-parser'
import { InversifyExpressServer } from 'inversify-express-utils'
import { container } from './modules/shared/infrastructure/Inversify/inversify.config'

let server = new InversifyExpressServer(container)
server.setConfig((app) => {
    app.use(bodyParser.urlencoded({
        extended: true
      }))

    app.use(bodyParser.json())
})

export { server }
