import { HttpResponse, HttpRequest } from '../protocols/http';
import { MisingParamError } from '../erros/missing-param-error';
import { badRequest } from '../helpers/http-helper';

export class SignUpController {
  handle(httpRequest: HttpResponse): HttpRequest {
    const requiredFields = ['name', 'email'];
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MisingParamError(field));
      }
    }
  }
}
