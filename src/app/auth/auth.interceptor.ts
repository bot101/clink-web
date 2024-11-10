import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest, HttpResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError } from "rxjs";
import { AuthService } from "../services/auth/auth.service";
import { Router } from "@angular/router";


export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);
    const authToken = authService.getAuthToken()

    const authRequest = req.clone({
        headers: req.headers.set("Authorization",
            "Bearer " + authToken)
    });

    return next(authRequest).pipe(
        tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {

                // Handle successful responses here

            }
        }),
        catchError((error: any) => {
            if (error instanceof HttpErrorResponse) {

                if (error.status === 401) {

                    authService.signOut();
                    router.navigate(['/sign']);
                }
            }
            return throwError(error);
        })
    );

}
