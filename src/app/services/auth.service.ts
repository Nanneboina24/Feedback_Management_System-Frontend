import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../pages/dialogs/confirm/confirm.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  signup(data:any): Observable<any> {  // backendurl          passing data(form body)
    return this.http.post("http://localhost:3000/auth/signup",data);
   }

  login(data:any): Observable<any> {
       return this.http.post("http://localhost:3000/auth/login",data);
    }

  profile(): Observable<any> {
      let headers = {
        'authorization': 'sumanth '+localStorage.getItem('token')
      }
      return this.http.get("http://localhost:3000/auth/profile",{headers:headers});
    }

  fbacksave(data:any): Observable<any> {
      return this.http.post("http://localhost:3000/auth/fbsave",data);
    }

  fbackcheck(data:any): Observable<any> {
      return this.http.post("http://localhost:3000/auth/fbcheck",data);
    }





    value:any;
    setdata(data:any) {
      this.value=data;
    }
    getdata()
    {
      return this.value;
    }

    confirmDialog(){
      this.dialog.open(ConfirmComponent);
    }




}
