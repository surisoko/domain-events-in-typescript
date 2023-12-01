import * as express from "express"
import { interfaces, controller, response, httpPost, request } from "inversify-express-utils"
import { inject } from "inversify"
import { CreateNewUser } from "../../application/use-case/CreateNewUser"
import { UserName } from "../../domain/value-object/UserName"
import { UserEmail } from "../../domain/value-object/UserEmail"
import { InvalidArgumentError } from "../../../shared/domain/exception/InvalidArgumentError"
import httpStatus from "http-status"

@controller("/user")
export class CreateUserController implements interfaces.Controller {

  constructor(
    @inject(CreateNewUser) private createNewUser: CreateNewUser
  ) {}

  @httpPost("/")
  public async execute(
    @request() request: express.Request,
    @response() response: express.Response, 
  ) {
    try {
      this.createNewUser.execute(
        new UserName(request.body.username),
        new UserEmail(request.body.email),
      )
      
      return response.status(httpStatus.CREATED).send(`user created`)
    } catch (error: any) {
      if (error instanceof InvalidArgumentError) {
        return response.status(httpStatus.UNPROCESSABLE_ENTITY).json({
          message: error.message
        })
      }

      return response.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error'
      })
    }
    
  }
}
