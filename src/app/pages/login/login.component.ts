import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service' ;
import { Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form:FormGroup;
  constructor(private fb: FormBuilder,
    private auth: AuthService ,
    private router: Router) {
    this.form = this.fb.group({

      'email':['',Validators.required],
      'password':['',Validators.required]

    })
   }

  ngOnInit(): void {
  }

  login(){
    const data = this.form.value;
    const aemail=data.email;
    const apass = data.password;
    if(aemail==="admin@gmail.com" && apass=== "admin123")
    {
       this.auth.setadmin("admin");
       //console.log(this.auth.getadmin());
       alert("Admin Sucessfully Logged!");
       this.router.navigate(['/profile']);
    }
    else{
      this.auth.login(data).subscribe(
        (res) => {
             localStorage.setItem('token',res.token);
             alert(res.message);
             this.router.navigate(['/profile']);
        },
        (err) => {
          alert(err.message);
        }
      )
    }


  }

  clear(){

    this.form.controls['email'].setValue("");
    this.form.controls['password'].setValue("");
   }

}
