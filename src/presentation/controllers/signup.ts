import { HttpResponse, HttpRequest } from '../protocols/http';
import { MisingParamError } from '../erros/missing-param-error';
import { badRequest, serverError } from '../helpers/http-helper';
import { Controller } from '../protocols/controller';
import { EmailValidator } from '../protocols/email-validator';
import { InvalidParamError } from '../erros/invalid-param-error';
import { ServerError } from '../erros/server-error';

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
