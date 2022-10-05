import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { user } from 'src/app/interfaces/user.interface';
import { RequestsService } from 'src/app/services/requests.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  formInfoUser: FormGroup;
  idUser: string | undefined = '' ; 
  changePassword: boolean = false;

  constructor(private fb: FormBuilder, private rq: RequestsService, private http: HttpClient) {
    this.formInfoUser = this.fb.group({
      userName: ['', Validators.required],
      userEmail: ['', Validators.required],
      nameClient: [''],
      lastNameClient: [''],
      phoneClient1: [''],
      phoneClient2: [''],
      userPassword: [''],
      confirmNewUserPassword: ['']
    });
  }

  ngOnInit(): void {

    this.idUser = localStorage?.getItem('idUser')?.toString();

    this.http.get(this.rq.getInfoUser(this.idUser))
      .subscribe((resp: user) => {
        this.formInfoUser.controls['userName'].setValue(resp.userName)
        this.formInfoUser.controls['userEmail'].setValue(resp.userEmail)
        this.formInfoUser.controls['nameClient'].setValue(resp.nameClient)
        this.formInfoUser.controls['lastNameClient'].setValue(resp.lastNameClient)
        this.formInfoUser.controls['phoneClient1'].setValue(resp.phoneClient1)
        this.formInfoUser.controls['phoneClient2'].setValue(resp.phoneClient2)
        
      });
  }

  setInfouser() {
    if (this.formInfoUser.controls['userPassword'].value != '' && this.formInfoUser.controls['confirmNewUserPassword'].value == '') {
      Swal.fire({
        title: 'Error',
        icon: 'error',
        html: 'Para actualizar tu contraseña debes ingresar tu nueva contraseña',
        showCloseButton: true,
        confirmButtonText: 'Ok'
      });
    } else if (this.formInfoUser.controls['userPassword'].value == '' && this.formInfoUser.controls['confirmNewUserPassword'].value != '') {
      Swal.fire({
        title: 'Error',
        icon: 'error',
        html: 'Para actualizar tu contraseña debes ingresar tu contraseña actual',
        showCloseButton: true,
        confirmButtonText: 'Ok'
      });
    } else if (this.formInfoUser.controls['userPassword'].value != '' && this.formInfoUser.controls['confirmNewUserPassword'].value != '') { 
      this.changePassword = true;
      this.updateUser();
    } else {
      this.updateUser();
    }

  }

  updateUser() {
    const request = {
      UserName: this.formInfoUser.controls['userName'].value,
      UserEmail: this.formInfoUser.controls['userEmail'].value,
      NameClient: this.formInfoUser.controls['nameClient'].value,
      LastNameClient: this.formInfoUser.controls['lastNameClient'].value,
      PhoneClient1: this.formInfoUser.controls['phoneClient1'].value,
      PhoneClient2: this.formInfoUser.controls['phoneClient2'].value,
      UserPassword: this.formInfoUser.controls['userPassword'].value,
      ConfirmNewUserPassword: this.formInfoUser.controls['confirmNewUserPassword'].value,
      ChangePassword: this.changePassword
    };

    this.http.post(this.rq.setInfoUser(), request)
    .subscribe((resp: any) => {
      if (resp) {
        Swal.fire({
          title: 'Usuario actualizado',
          icon: 'success',
          html: 'Tu usuario ha sido actualizado con éxito',
          showCloseButton: true,
          confirmButtonText: 'Ok'
        });  
      } else {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          html: 'Tus contraseñas no coinciden. Por favor valida nuevamente.',
          showCloseButton: true,
          confirmButtonText: 'Ok'
        });  
      } 
    });
  }

}
