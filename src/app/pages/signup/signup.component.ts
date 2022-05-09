import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service' ;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form:FormGroup;
  message:String=" ";
  cname='d-none';
  isprocessing:boolean = false;
  constructor(private fb: FormBuilder , private auth: AuthService ) {
    this.form = this.fb.group({
      'username':['',Validators.required],
      'email':['',[Validators.required,Validators.email]],
      'password':['',Validators.required],
    })
   }

  ngOnInit(): void {
  }

  signup(){
   this.isprocessing= true;
   const data = this.form.value;
   this.auth.signup(data).subscribe(
     (res) => {
         if(res.success)                                    //  alert("User Added Sucessfully in Db");
         {
           this.isprocessing =false;
           this.message = "User added Sucessfully";
           this.cname = 'alert alert-success';
         }
         else{
          this.isprocessing =false;
          this.message = res.message;
          this.cname = 'alert alert-danger';
         }
      },
     (err) => {
      this.isprocessing =false;
      this.message = err.message;
      this.cname = 'alert alert-danger';
      }
   );

  }

 getname(){
     return this.cname;
 }

 clear(){
  this.form.controls['username'].setValue("");
  this.form.controls['email'].setValue("");
  this.form.controls['password'].setValue("");
 }

}
