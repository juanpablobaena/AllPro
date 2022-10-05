import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RequestsService } from '../../../services/requests.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-arrendar',
  templateUrl: './form-arrendar.component.html',
  styleUrls: ['./form-arrendar.component.css']
})
export class FormArrendarComponent implements OnInit {

  baseSrc: string = '../../../assets/propertys/'
  formProperty: FormGroup;
  selectedFile: any;
  uploadForm: FormGroup;


  constructor(private fb: FormBuilder, private http: HttpClient, private rq: RequestsService, private route: Router) {
    this.formProperty = this.fb.group({
      address: ['', Validators.required],
      direction: ['', Validators.required],
      area: ['', Validators.required],
      numRooms: ['', Validators.required],
      numBathrooms: ['', Validators.required],
      price: ['', Validators.required],
      stratum: ['', Validators.required],
      typeHouse: ['', Validators.required],
      typeProperty: ['', Validators.required],
      parking: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.uploadForm = this.fb.group({
      profile: ['']
    });
  }

  ngOnInit(): void {

  }

  back() {
    this.route.navigateByUrl('/arrendamientos')
  }

  createProperty() {
    if (this.formProperty.valid) {
      Swal.fire({
        title: 'Crear Propiedad',
        icon: 'question',
        html: '¿Está seguro de crear la propiedad?',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Ok',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          const request = {
            Address: this.formProperty.controls['address'].value,
            Location: this.formProperty.controls['direction'].value,
            Area: this.formProperty.controls['area'].value,
            NumRooms: this.formProperty.controls['numRooms'].value,
            NumBaths: this.formProperty.controls['numBathrooms'].value,
            Price: this.formProperty.controls['price'].value,
            Stratum: this.formProperty.controls['stratum'].value,
            TypeHouse: this.formProperty.controls['typeHouse'].value,
            TypeProperty: this.formProperty.controls['typeProperty'].value, 
            Parking: this.formProperty.controls['parking'].value,
            UserID: localStorage.getItem('idUser'),
            Description: this.formProperty.controls['description'].value
          };
          
          this.http.post(this.rq.createProperty(), request)
            .subscribe((resp: any) => {
              if (resp) {
                Swal.fire({
                  title: 'Propiedad creada',
                  icon: 'success',
                  html: 'La propiedad ha sido creada, debes esperar a que un administrador autorice tu inmueble para que lo puedas ver en el sitio.',
                  showCloseButton: true,
                  confirmButtonText: 'Ok'
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.route.navigateByUrl('/misarrendamientos')
                  }
                })
              } else { 
                Swal.fire({
                  title: 'Error',
                  icon: 'error',
                  html: 'Hubo un error al crear la propiedad',
                  showCloseButton: true,
                  confirmButtonText: 'Ok'
                })
              }
            });  
        }
      })
    } else {
      Swal.fire({
        title: 'Error',
        icon: 'error',
        html: 'Por favor diligencia todos los campos',
        showCloseButton: true,
        confirmButtonText: 'Ok'
      })
    }
  }

}
