import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { EmailsList } from '../emails-list';
import { ReceivingEmailsService } from '../service/receiving-emails.service';

@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.css']
})
export class EmailsComponent implements OnInit {

  data: string[][];
  emails: EmailsList = new EmailsList();
  receivingEmailList: any;

  constructor(private receivingemailsservice: ReceivingEmailsService) { }

  ngOnInit(): void {
    let resp = this.receivingemailsservice.getReceivingEmails();
    resp.subscribe((data) => this.receivingEmailList = data);
  }

  onFileChange(evt: any) {
    let target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Negalima ikelti daugiau nei 1 failo');
    let reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      let bstr: string = e.target.result;
      let wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      let wsname: string = wb.SheetNames[0];
      let ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
    };
    reader.readAsBinaryString(target.files[0]);
  }

  onBtnClicklist() {
    for (let i = 0; i < this.data.length; i++) {
      this.emails.receivingEmail = this.data[i][0]
      this.receivingemailsservice.postReceivingEmail(this.emails).subscribe(data => { }, error => alert("Nepavyko patalpinti paštų adresų"));
    }
    location.reload();
  }

  onBtnClickDeleteList(id: number) {
    this.receivingemailsservice.deleteReceivingEmail(id).subscribe()
    location.reload();
  }

}
