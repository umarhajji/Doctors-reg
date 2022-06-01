import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Doctor } from '../Doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/users'
    httpOptions = {
      headers: new HttpHeaders ({
        'content-Type': 'application/json'
      })
    }
  constructor(private http: HttpClient) { }

  getDoctors(): Observable<Doctor[]>{
    return this.http.get<Doctor[]>(this.apiUrl)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  addDoctor(doctor: Doctor): Observable<Doctor>{
    return this.http.post<Doctor>(this.apiUrl, JSON.stringify(doctor), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
