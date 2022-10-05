import { Component, OnInit, Output } from '@angular/core';
import { property } from '../../../interfaces/property.interface';
import { RequestsService } from '../../../services/requests.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-visualizacion',
  templateUrl: './visualizacion.component.html',
  styleUrls: ['./visualizacion.component.css']
})
export class VisualizacionComponent implements OnInit {

  item: any;
  formInfo: FormGroup;
  myProperty: boolean = false;
  address: string = '';
  location: string = '';
  area: string = '';
  numRooms: string = '';
  numBathrooms: string = '';
  price: string = '';
  stratum: string = '';
  typeHouse: string = '';
  typeProperty: string = '';
  parking: string = '';
  description: string = '';
  userEmail: string = '';
  nameClient: string = '';
  lastNameClient: string = '';
  phoneClient1: string = '';
  phoneClient2: string = '';

  constructor(private rq: RequestsService, private http: HttpClient, private route: Router, private fb: FormBuilder) {
    this.formInfo = this.fb.group({
      address: ['', Validators.required],
      location: ['', Validators.required],
      area: ['', Validators.required],
      numRooms: ['', Validators.required],
      numBathrooms: ['', Validators.required],
      price: ['', Validators.required],
      stratum: ['', Validators.required],
      typeHouse: ['', Validators.required],
      typeProperty: ['', Validators.required],
      parking: ['', Validators.required],
      description: ['', Validators.required],
      userEmail: [''],
      nameClient: [''],
      lastNameClient: [''],
      phoneClient1: [''],
      phoneClient2: ['']
    });
  }

  ngOnInit(): void {
    this.http.get(this.rq.getVisualization(localStorage.getItem('item')?.toString(), localStorage.getItem('idUser')?.toString()))
      .subscribe((resp: any) => {
        if (resp.myProperty) {
          this.myProperty = true;
          this.formInfo.controls['address'].setValue(resp.address);
          this.formInfo.controls['area'].setValue(resp.area);
          this.formInfo.controls['description'].setValue(resp.description);
          this.formInfo.controls['location'].setValue(resp.location);
          this.formInfo.controls['numBathrooms'].setValue(resp.num_bathrooms);
          this.formInfo.controls['numRooms'].setValue(resp.num_rooms);
          this.formInfo.controls['parking'].setValue(resp.parking);
          this.formInfo.controls['price'].setValue(resp.price);
          this.formInfo.controls['stratum'].setValue(resp.stratum);
          this.formInfo.controls['typeHouse'].setValue(resp.typeHouse);
          this.formInfo.controls['typeProperty'].setValue(resp.typeProperty);
          this.formInfo.controls['nameClient'].setValue(resp.nameClient);
          this.formInfo.controls['lastNameClient'].setValue(resp.lastNameClient);
          this.formInfo.controls['phoneClient1'].setValue(resp.phoneClient1);
          this.formInfo.controls['phoneClient2'].setValue(resp.phoneClient2);
          this.formInfo.controls['userEmail'].setValue(resp.userEmail);
        } else {
          this.address = resp.address;
          this.location = resp.location;
          this.area = resp.area;
          this.numRooms = resp.num_rooms;
          this.numBathrooms = resp.num_bathrooms;
          this.price = resp.price;
          this.stratum = resp.stratum;
          this.typeHouse = resp.typeHouse;
          this.typeProperty = resp.typeProperty;
          this.parking = resp.parking;
          this.description = resp.description;
          this.userEmail = resp.userEmail;
          this.nameClient = resp.nameClient;
          this.lastNameClient = resp.lastNameClient;
          this.phoneClient1 = resp.phoneClient1;
          this.phoneClient2 = resp.phoneClient2;
        } 
    });
  }

  trashId() {
    localStorage.removeItem('item');
    this.route.navigateByUrl('/misarrendamientos');
  }

  trashId2() {
    localStorage.removeItem('item');
    this.route.navigateByUrl('/arrendamientos');
  }

  deleteProperty() {
    Swal.fire({
      title: 'Eliminar',
      icon: 'warning',
      iconColor: '#EF4444',
      html: '¿Está seguro que desea eliminar su propiedad?',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#EF4444',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(this.rq.deleteProperty(localStorage.getItem('item')?.toString()))
          .subscribe((resp: any) => {
            if (resp) {
              Swal.fire({
                title: 'Usuario eliminado',
                icon: 'success',
                html: 'La propiedad ha sido eliminada con éxito',
                showCloseButton: true,
                confirmButtonText: 'Ok'
              }).then((result2) => {
                if (result2.isConfirmed) {
                  this.trashId();
                }
              });
            } else {
              Swal.fire({
                title: 'Error',
                icon: 'error',
                html: 'Hubo un error al eliminar la propiedad',
                showCloseButton: true,
                confirmButtonText: 'Ok'
              });
            }
          });
      }
    });
  }

  updateProperty() {
    if (this.formInfo.valid) {
      const request = {
        Address: this.formInfo.controls['address'].value,
        Area: this.formInfo.controls['area'].value,
        Description: this.formInfo.controls['description'].value,
        Location: this.formInfo.controls['location'].value,
        Num_rooms: this.formInfo.controls['numBathrooms'].value,
        Num_bathrooms: this.formInfo.controls['numRooms'].value,
        Parking: this.formInfo.controls['parking'].value,
        Price: this.formInfo.controls['price'].value,
        Stratum: this.formInfo.controls['stratum'].value,
        TypeHouse: this.formInfo.controls['typeHouse'].value,
        TypeProperty: this.formInfo.controls['typeProperty'].value,
        NameClient: this.formInfo.controls['nameClient'].value,
        LastNameClient: this.formInfo.controls['lastNameClient'].value,
        PhoneClient1: this.formInfo.controls['phoneClient1'].value,
        PhoneClient2: this.formInfo.controls['phoneClient2'].value,
        UserEmail: this.formInfo.controls['userEmail'].value,
        PropertyID: localStorage.getItem('item')?.toString()
      };
  
      this.http.post(this.rq.updateProperty(), request)
      .subscribe((resp: any) => {
        if (resp) {
          Swal.fire({
            title: 'Propiedad actualizada',
            icon: 'success',
            html: 'Tu propiedad ha sido actualizada con éxito',
            showCloseButton: true,
            confirmButtonText: 'Ok'
          }).then((resp) => {
            if (resp.isConfirmed) {
              this.trashId();
            }
          });  
        } else {
          Swal.fire({
            title: 'Error',
            icon: 'error',
            html: 'Hubo un error al actualizar la propiedad',
            showCloseButton: true,
            confirmButtonText: 'Ok'
          });  
        } 
      });
    } else {
      Swal.fire({
        title: 'Error',
        icon: 'error',
        html: 'Todos los campos son obligatorios',
        showCloseButton: true,
        confirmButtonText: 'Ok'
      });  
    }
  }

}
