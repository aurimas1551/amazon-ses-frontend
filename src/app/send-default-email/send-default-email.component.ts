import { Component, OnInit } from '@angular/core';
import { DefaultEmail } from '../default-email';
import { DefaultEmailServiceService } from '../service/default-email-service.service';

@Component({
  selector: 'app-send-default-email',
  templateUrl: './send-default-email.component.html',
  styleUrls: ['./send-default-email.component.css']
})
export class SendDefaultEmailComponent implements OnInit {

  receivingDefaultEmail: any;
  defaultEmail: DefaultEmail = new DefaultEmail();

  constructor(private defaultEmailService: DefaultEmailServiceService) { }

  ngOnInit(): void {
  }

  defaultEmailSubmit() {
    this.defaultEmailService.postDefaultEmail(this.defaultEmail).subscribe(data => {
      alert("Sėkmingai išsiuntėte laiškus")
    }, error => alert("Nepavyko išsiųsti laiškų"));
  }

}
