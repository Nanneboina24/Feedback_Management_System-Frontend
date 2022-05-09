import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service' ;
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  form: FormGroup;
  data1:any;
  constructor(private auth: AuthService, private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      'username':['',Validators.required],
      'email':['',Validators.required],
      'department':['',Validators.required],
      'year':['',Validators.required],
      'fbdata':['',Validators.required]

    })
  }

  ngOnInit(): void {
    this.getuserdata();
  //  this.data2=this.auth.getdata();
    //console.log(this.data2);
  }

  getuserdata(){
    this.auth.profile().subscribe(
      (res) => {
           if(res.success)
           {
             this.data1 = res.data;
             this.form.controls['username'].setValue(this.data1.username);
             this.form.controls['email'].setValue(this.data1.email);
            // this.auth.setdata(this.data1);
           }
           else{
                alert(res.message);
           }
      },
      (err) => {
        alert(err.message);
      }
    )
  }

  fsubmit(){
   const data = this.form.value;
   console.log(data);
   this.auth.fbacksave(data).subscribe(
     (res) => {
         if(res.success)                                    //  alert("User Added Sucessfully in Db");
         {
            alert(res.message);
            this.router.navigate(['/profile']);
         }
         else{
             alert(res.message);
             this.router.navigate(['/profile']);
         }
      },
     (err) => {
      alert(err.message);
      }
   );
  }

  fback(){
    this.router.navigate(['/profile']);
  }

}
