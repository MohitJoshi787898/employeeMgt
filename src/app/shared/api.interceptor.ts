import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private messageService: MessageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            this.messageService.add({ 
              severity: 'success', 
              summary: 'Success', 
              detail: 'Request successful!', 
              life: 5000 // Set life for this toast
            });
          }
        },
        (error) => {
          this.messageService.add({ 
            severity: 'error', 
            summary: 'Error', 
            detail: 'Request failed!', 
            life: 5000 // Set life for this toast
          });
        }
      )
    );
  }
}