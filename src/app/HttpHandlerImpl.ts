import {HttpEvent, HttpHandler, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

export class HttpHandlerImpl extends HttpHandler{
  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    return undefined;
  }
}
