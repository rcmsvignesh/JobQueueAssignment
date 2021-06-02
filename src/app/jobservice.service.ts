import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private httpClient: HttpClient) { }

  getFromService(sreviceUrl: string): Observable<any> {
    return this.httpClient.get(sreviceUrl).pipe(catchError(this.handleError));
  }

  saveToService(sreviceUrl: string, itemToSave: any): Observable<any> {
    return this.httpClient.post<any>(sreviceUrl, itemToSave, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(catchError(this.handleError));
  }

  updateToService(sreviceUrl: string, itemToSave: any, itemIdToUpdate: number): Observable<any> {
    return this.httpClient.put<any>(sreviceUrl + '/' + itemIdToUpdate, itemToSave, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(catchError(this.handleError));
  }

  deleteToService(sreviceUrl: string, itemIdToDelete: number): Observable<any> {
    return this.httpClient.delete<any>(sreviceUrl + '/' + itemIdToDelete, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error :', errorResponse.error.message);
    } else {
      console.error('Server Side Error :', errorResponse);
    }
    return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
  }
}
