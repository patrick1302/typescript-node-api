import { HttpResponse, HttpRequest } from '../protocols/http';
import { MisingParamError } from '../erros/missing-param-error';
import { badRequest } from '../helpers/http-helper';

export class SignUpController {
  handle(httpRequest: HttpResponse): HttpRequest {
    if (!httpRequest.body.name) {
      return badRequest(new MisingParamError('name'));
    }
    if (!httpRequest.body.email) {
      return badRequest(new MisingParamError('email'));
    }
  }
}
