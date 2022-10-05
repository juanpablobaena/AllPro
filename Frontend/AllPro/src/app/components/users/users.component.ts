import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Table } from 'primeng/table';
import { user } from 'src/app/interfaces/user.interface';
import { RequestsService } from 'src/app/services/requests.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any;
  formUser: FormGroup;
  dialogEdit: boolean = false;
  userEdit: string = '';
  @ViewChild('bk') bk: Table | undefined;

  constructor(private rq: RequestsService, private http: HttpClient, private fb: FormBuilder) {
    this.formUser = this.fb.group({
      userName: [''],
      userEmail: [''],
      nameClient: [''],
      lastNameClient: [''],
      phoneClient1: [''],
      phoneClient2: ['']
    });
  }

  ngOnInit(): void {

    this.http.get(this.rq.getUsers())
      .subscribe((resp: user) => {
        this.users = resp;
      });
  }

  newEdit(user: any) {
    this.dialogEdit = true;

    this.formUser.controls['userName'].setValue(user.UserName);
    this.formUser.controls['userEmail'].setValue(user.UserEmail);
    this.formUser.controls['nameClient'].setValue(user.NameClient);
    this.formUser.controls['lastNameClient'].setValue(user.LastNameClient);
    this.formUser.controls['phoneClient1'].setValue(user.PhoneClient1);
    this.formUser.controls['phoneClient2'].setValue(user.PhoneClient2);
    this.userEdit = user.UserID;
  }

  editUser() {
    const request = {
      UserId: this.userEdit,
      UserName: this.formUser.controls['userName'].value,
      UserEmail: this.formUser.controls['userEmail'].value,
      NameClient: this.formUser.controls['nameClient'].value,
      LastNameClient: this.formUser.controls['lastNameClient'].value,
      PhoneClient1: this.formUser.controls['phoneClient1'].value,
      PhoneClient2: this.formUser.controls['phoneClient2'].value
    };

    this.http.post(this.rq.editUser(), request)
      .subscribe((resp: any) => {
        this.dialogEdit = false;
        if (resp) {
          Swal.fire({
            title: 'Usuario actualizado',
            icon: 'success',
            html: 'El usuario ha sido actualizado con éxito',
            showCloseButton: true,
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        } else {
          Swal.fire({
            title: 'Error',
            icon: 'error',
            html: 'Hubo un error al actualizar el usuario',
            showCloseButton: true,
            confirmButtonText: 'Ok'
          });
        }
      });
  }

  delete(userID: string) {
    Swal.fire({
      title: 'Eliminar',
      icon: 'warning',
      iconColor: '#EF4444',
      html: '¿Está seguro que desea eliminar el usuario?',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#EF4444',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(this.rq.deleteUser(userID))
          .subscribe((resp: any) => {
            if (resp) {
              Swal.fire({
                title: 'Usuario eliminado',
                icon: 'success',
                html: 'El usuario ha sido eliminado con éxito',
                showCloseButton: true,
                confirmButtonText: 'Ok'
              }).then((result2) => {
                if (result2.isConfirmed) {
                  window.location.reload();
                }
              });
            } else {
              Swal.fire({
                title: 'Error',
                icon: 'error',
                html: 'Hubo un error al eliminar el usuario',
                showCloseButton: true,
                confirmButtonText: 'Ok'
              });
            }
          });
      }
    });
  }

  applyFilterGlobal($event: any, value: any) {
    this.bk!.filterGlobal(($event.target as HTMLInputElement).value, value);
  }

}
