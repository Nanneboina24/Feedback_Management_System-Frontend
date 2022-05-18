import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service' ;
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  data: any;
  dres:any;
  msg:any;
  value:any;
  admin:any;
  constructor( private auth: AuthService,private router: Router) {
    // this.datas=this.auth.getdata();
    // console.log(this.datas);
   }

  ngOnInit(): void {
    this.admin = this.auth.getadmin();
    if(this.admin !== "admin")
    {
       this.getprofile();
    }
    else{
      this.msg="Welcome Admin..";
    }

  }

  getprofile(){
     this.auth.profile().subscribe(
       (res) => {
            if(res.success)
            {
              this.data = res.data;
              this.msg="Welcome "+this.data.username;

            }
            else{
              this.msg="Please Login First";
                 this.logout();
            }
       },
       (err) => {
        this.msg="Please Login First";
       // alert(err.message);
       // setTimeout(this.logout, 1000);
       // this.logout();

       }
     )
  }

  fbackin(){
    if(this.admin === "admin"){
      this.auth.fbackadmin().subscribe(
        (res) => {
          if(res.success)
          {
             alert(res.message);
             this.dres = res.data;
             //console.log(this.dres.length);
              this.auth.setdata(this.dres);
              this.auth.confirmDialog();
          }
          else{
              alert(res.message);
          }
       },
      (err) => {
       alert(err.message);
       }

      );
    }
    else{
    const edata = this.data;
    this.auth.fbackcheck(edata).subscribe(
      (res) => {
          if(res.success)
          {
             alert(res.message);
             this.router.navigate(['/fback']);
          }
          else{
              alert(res.message);
              this.dres = res.data;
              this.auth.setdata(this.dres);
             // console.log(this.dres[0].username);
             // this.makepdf();
              this.auth.confirmDialog();
              // this.value=this.auth.getdata();
              // console.log("yes/no",this.value);
              // if(this.value == "yes"){
              //   console.log("go yes")
              //   this.makepdf();
              // }
          }
       },
      (err) => {
       alert(err.message);
       }
    );

    }
  }

  logout() {
     localStorage.clear()
     this.auth.setadmin("");
     this.router.navigate(['/login']);
  }

}
