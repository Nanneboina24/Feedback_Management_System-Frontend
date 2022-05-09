import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service'
import { jsPDF } from 'jspdf' ;
import  autoTable  from 'jspdf-autotable';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
   dres:any;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  dialogyes(){
    this.makepdf();
  }
  dialogno(){

  }
  makepdf(){
    this.dres=this.auth.getdata();
    var pdf =new jsPDF('p','pt','a4');
    pdf.setTextColor(255,189,46);
    pdf.setFont("bold");
    pdf.setFontSize(20);
    pdf.text("Feedback Response",220,70);

    autoTable(pdf,{
      styles: { fillColor: [106,108,109] },
     // columnStyles: { 0: { halign: 'center', fillColor: [0, 255, 0] } }, // Cells in first column centered and green
      margin: { top: 100 },

      head: [['Name', 'Email', 'Department','Year','Feedback']],
      body: [
        [ this.dres[0].username,
          this.dres[0].email,
          this.dres[0].department,
          this.dres[0].year,
          this.dres[0].fbdata
        ],
      ],
    })
    pdf.save('feedback.pdf');
  }


}
