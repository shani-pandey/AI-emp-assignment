import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import { bottom } from '@popperjs/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  apiUrl = "https://ml.thelightbulb.ai/api/employees";

  getAllEmployee() :Observable<any> {
    return this.http.get(this.apiUrl)
  }

  addEmployee(formData:any):Observable<any>{
    return this.http.post(this.apiUrl, formData)
  }

  updateEmployee(empId:number,formData:any):Observable<any>{
    return this.http.put(`${this.apiUrl}${"/"+empId}`, formData)
  }

  deleteEmployee(empId:number):Observable<any>{
    return this.http.delete(`${this.apiUrl}${"/"+empId}`);
  }

  openSnackBar(message:string, action:any) {
    this._snackBar.open(message,action, {
      duration: -1, 
      verticalPosition: 'bottom',
    });
  }

}

