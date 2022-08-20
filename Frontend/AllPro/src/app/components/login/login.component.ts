import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { RequestsService } from '../../services/requests.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formUser: FormGroup;

  constructor(private fb: FormBuilder, private rq: RequestsService, private route: Router) {
    this.formUser = this.fb.group({
      usuario: ['', Validators.required],
      contrasenia: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  Login() {
    if (this.formUser.valid) {
      this.rq.newSession(this.formUser)
        .subscribe((infoUser: any) => {
          if (infoUser.valideUser) {
              localStorage.setItem('userLogged', infoUser.validateUser.toString());
            if (infoUser.isAdministrator) {
              localStorage.setItem('isAdministrator', infoUser.isAdministrator.toString());
            }
            this.route.navigateByUrl('/welcome');
          } else {
            Swal.fire({
              title: 'Error al ingresar',
              icon: 'error',
              html: 'Usuario o contraseña son inválidos',
              showCloseButton: true,
              confirmButtonText: 'Ok',
            })
          }
        });
    } else {
      Swal.fire({
        title: 'Error al ingresar',
        icon: 'error',
        html: 'Por favor diligencia todos los campos',
        showCloseButton: true,
        confirmButtonText: 'Ok',
      })
    }
  }

}
