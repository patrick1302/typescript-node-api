import {
  HttpResponse,
  HttpRequest,
  Controller,
  EmailValidator,
} from '../protocols';
import { MisingParamError, InvalidParamError } from '../erros';
import { badRequest, serverError } from '../helpers/http-helper';

export class SignUpController implements Controller {
  private readonly emailValitador: EmailValidator;

  constructor(emailValidator: EmailValidator) {
    this.emailValitador = emailValidator;
  }
  handle(httpRequest: HttpResponse): HttpRequest {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation',
      ];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MisingParamError(field));
        }
      }
      const isValid = this.emailValitador.isValid(httpRequest.body.email);
      if (!isValid) {
        return badRequest(new InvalidParamError('email'));
      }
    } catch (error) {
      return serverError();
    }
  }
}
