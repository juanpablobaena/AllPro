import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestsService } from 'src/app/services/requests.service';
import { login } from 'src/app/interfaces/newSession.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formUser: FormGroup;

  constructor(private fb: FormBuilder, private rq: RequestsService, private route: Router, private http: HttpClient) {
    this.formUser = this.fb.group({
      userName: ['', Validators.required],
      userEmail: ['', Validators.required],
      userPassword: ['', Validators.required],
      confirmUserPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  Register() {
    if (this.formUser.valid) {
      if (this.formUser.controls['userPassword'].value != this.formUser.controls['confirmUserPassword'].value) {
        Swal.fire({
          title: 'Error al registrarse',
          icon: 'error',
          html: 'Las contraseñas deben coincidir',
          showCloseButton: true
        });
      } else {
        const request = {
          UserName: this.formUser.controls['userName'].value,
          UserEmail: this.formUser.controls['userEmail'].value,
          UserPassword: this.formUser.controls['userPassword'].value,
          ConfirmUserPassword: this.formUser.controls['confirmUserPassword'].value
        };
        this.http.post(this.rq.registerUser(), request)
          .subscribe((response: login) => {
            if (response.valideUser) {
              Swal.fire({
                title: 'Usuario registrado con éxito',
                icon: 'success',
                showCloseButton: true,
                confirmButtonText: 'Ingresar'
              }).then((result) => {
                if (result.isConfirmed) {
                  this.route.navigateByUrl('/login');
                };
              });
            } else {
              Swal.fire({
                title: 'Error al ingresar',
                icon: 'error',
                html: 'El usuario y/o correo ya se encuentran registrados',
                showCloseButton: true,
                confirmButtonText: 'Ok',
              })
            }
          });
      }
    }
  }


}
