import { HttpResponse, HttpRequest } from '../protocols/http';
import { MisingParamError } from '../erros/missing-param-error';

export class SignUpController {
  handle(httpRequest: HttpResponse): HttpRequest {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MisingParamError('name'),
      };
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MisingParamError('email'),
      };
    }
  }
}
