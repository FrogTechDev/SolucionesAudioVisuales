import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';
import { UserService } from '../../../service/user.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.scss'],
  providers: [UserService]
})
export class EditComponent implements OnInit {
    public title: string;
    public user: User;
    public token;
    public identity;
    public id;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
      this.title = 'Editar Usuario';
      this.user = new User(1, '', '', '', '', true);
      this.token = localStorage.getItem('token');
      this.identity = localStorage.getItem('identity');
   }

  ngOnInit() {
      this._route.params.subscribe(
        params => {
            this.id = +params['id'];
            this.getUsuario();
        }
    );
  }

  getUsuario() {
    this._userService.getUsuario(this.id).subscribe(
        response => {
            console.clear();
            console.log(response);
            if (response.status === 'success') {
                this.user = response.usuario;
            }
        },
        error => {}
    );
  }

  onSubmit(usuarioForm) {
    this._userService.update(this.token, this.user, this.id).subscribe(
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
