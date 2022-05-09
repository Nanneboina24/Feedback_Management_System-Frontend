import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service' ;
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf' ;
import  autoTable  from 'jspdf-autotable';

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
  constructor( private auth: AuthService,private router: Router) {
    // this.datas=this.auth.getdata();
    // console.log(this.datas);
   }

  ngOnInit(): void {
    this.getprofile();

  }

  getprofile(){
     this.auth.profile().subscribe(
       (res) => {
            if(res.success)
            {
              this.data = res.data;
            //  this.auth.setdata(this.data);

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
    const edata = this.data;
    this.auth.fbackcheck(edata).subscribe(
      (res) => {
          if(res.success)                                    //  alert("User Added Sucessfully in Db");
          {
             alert(res.message);
             this.router.navigate(['/fback']);
          }
          else{
             // alert(res.message);
              this.dres = res.data;
              this.auth.setdata(this.dres)
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

  logout() {
     localStorage.clear()
     this.router.navigate(['/login']);
  }

}
