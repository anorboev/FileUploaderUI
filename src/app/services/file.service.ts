import { Injectable } from '@angular/core';
import { Observable, throwError, Observer } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { GlobalVariable } from '../globals';
import { FileValidation } from './file-validations.model';
import { FileModel } from './file-model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseApiUrl = GlobalVariable.BASE_API_URL;

  constructor(private http: HttpClient, private userService: UserService) { }
  
  getFileValidation() : Observable<FileValidation> {
    return this.http.get<FileValidation>(this.baseApiUrl + "file/getvalidationsrules")
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  getFileList() : Observable<FileModel[]> {
    return this.http.get<FileModel[]>(this.baseApiUrl + "file")
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  createFile(name: string, file: File): Observable<any> {
    var formData: any = new FormData();
    formData.append("file", file);
    formData.append("username", this.userService.getUsername());
    return this.http.post(this.baseApiUrl + 'file/' + name, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.errorMgmt)
    )
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      var message = error.error.Message ? error.error.Message : error.message;
      errorMessage = `Error Code: ${error.status}\nMessage: ${message}`;
    }
    return throwError(errorMessage);
  }

}