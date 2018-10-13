import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';
import { UserService } from '../../../service/user.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  providers: [UserService]
})
export class CreateComponent implements OnInit {

    public title: string;
    public user: User;
    public token;
    public identity;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
      this.title = 'Nuevo Usuario';
      this.user = new User(1, '', '', '', '', true);
      this.token = localStorage.getItem('token');
      this.identity = localStorage.getItem('identity');
   }

  ngOnInit() {
  }

  onSubmit(usuarioForm) {
      this._userService.create(this.token, this.user).subscribe(
          response => {
              if (response.status === 'success') {
                this.user = response.usuario;
                usuarioForm.reset();
                this._router.navigate(['/admin/usuario']);
              }
          },
          error => {}
      );
  }

}
