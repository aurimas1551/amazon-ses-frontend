import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginuserService } from '../service/loginuser.service';

@Component({
  selector: 'app-user-logout',
  templateUrl: './user-logout.component.html',
  styleUrls: ['./user-logout.component.css']
})
export class UserLogoutComponent implements OnInit {

  constructor(private logoutuserservice: LoginuserService,
    private router: Router) { }

  ngOnInit(): void {
    this.logoutuserservice.logOutUser();
    this.router.navigate(['login']);
  }

}
