import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError } from "rxjs";
import { AuthService } from "../services/auth/auth.service";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private router:Router) {}

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

        const authToken  = this.authService.getAuthToken()

            const authRequest = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + authToken)
            });
            
            return next.handle(authRequest).pipe(
              tap((event: HttpEvent<any>) => {
                  if (event instanceof HttpResponse) {

                      // Handle successful responses here

                  }
              }),
              catchError((error: any) => {
                  if (error instanceof HttpErrorResponse) {
                      
                      if (error.status === 401) {
                        
                          this.authService.logout(); 
                          this.router.navigate(['/sign']);
                      }
                  }
                  return throwError(error);
              })
          );
        
    }
}