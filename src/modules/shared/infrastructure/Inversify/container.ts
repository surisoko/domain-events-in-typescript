import { Container } from "inversify"

const baseContainer = new Container({ skipBaseClassChecks: true })

export { baseContainer }
