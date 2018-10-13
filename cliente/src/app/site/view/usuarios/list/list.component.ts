import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';
import { UserService } from '../../../service/user.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-list',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    public usuarios: Array<User>;
    public selectedUsuario: User;
    cols: any[];
    buttons: boolean;

  constructor(
      private _router: Router,
      private _route: ActivatedRoute,
      private _userService: UserService
  ) {
      this.buttons = false;
  }

  ngOnInit() {
      this._userService.getUsuarios().subscribe(
          response => {
              if (response.status === 'success') {
                this.usuarios = response.usuarios;
              }
              console.log(this.usuarios);
          },
          error => {
              console.log(error);
          }
      );
      this.cols = [
        { field: 'Nombre', header: 'Nombre' },
        { field: 'Usuario', header: 'Usuario' },
        { field: 'Correo', header: 'Correo' },
        { field: 'IsActivo', header: 'Estado' }
    ];
  }
  public onRowSelect(row) {
      this.buttons = true;
      console.log(this.selectedUsuario);
  }

  public onRowUnselect(row) {
      this.buttons = false;
    console.log(this.selectedUsuario);
  }
}
