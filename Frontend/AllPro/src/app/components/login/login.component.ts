import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { RequestsService } from '../../services/requests.service';
import { Router } from '@angular/router';
import { login } from 'src/app/interfaces/newSession.interface';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formUser: FormGroup;

  constructor(private fb: FormBuilder, private rq: RequestsService, private route: Router, private http: HttpClient) {
    this.formUser = this.fb.group({
      userName: ['', Validators.required],
      userPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  Login() {
    if (this.formUser.valid) {
      const request = {
        UserName: this.formUser.controls['userName'].value,
        Password: this.formUser.controls['userPassword'].value
      };
      this.http.post(this.rq.newSession(), request)
        .subscribe((infoUser: login) => {
          if (infoUser.valideUser) {
            localStorage.setItem('userLogged', infoUser.valideUser.toString());
            if (infoUser.isAdministrator) {
              localStorage.setItem('isAdministrator', infoUser.isAdministrator.toString());
            }
            localStorage.setItem('idUser', infoUser.userId!.toString());
            localStorage.setItem('userName', infoUser.userName!.toString());
            this.route.navigateByUrl('/welcome');
          } else {
            Swal.fire({
              title: 'Error al ingresar',
              icon: 'error',
              html: 'Usuario o contraseña son inválidos',
              showCloseButton: true,
              confirmButtonText: 'Ok'
            })
          }
        });
    }
  }

}
