import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginuserService } from '../service/loginuser.service';
import { User } from '../user';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  user: User = new User();

  constructor(private loginuserservice: LoginuserService,
    private router: Router) { }

  ngOnInit(): void {
  }

  userLogin() {
    this.loginuserservice.loginUser(this.user).subscribe(data => {
      sessionStorage.setItem('username', this.user.userId), this.router.navigate([''])
    }, error => alert("Neteisingas slaptažodis arba vardas"));
  }
  
}
