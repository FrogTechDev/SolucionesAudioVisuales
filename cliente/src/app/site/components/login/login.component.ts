import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

    public user: User;
    public token;
    public identity;

  constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService
  ) {
      this.user = new User(1, '', '', '', '', true);
  }

  ngOnInit() {
  }

  doLogin(item) {
      this._userService.signup(this.user).subscribe(
          response => {
              this.token = response;
              localStorage.setItem('token', this.token);
              this._userService.signup(this.user, true).subscribe(
                resp => {
                    this.identity = resp;
                    localStorage.setItem('identity', JSON.stringify(this.identity));
                    this._router.navigate(['/admin']);
                },
                error => {
                    console.log(<any>error);
                }
              );
          },
          error => {
              console.log(<any>error);
          }
      );
  }
}
