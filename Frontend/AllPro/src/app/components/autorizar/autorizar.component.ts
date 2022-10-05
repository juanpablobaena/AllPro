import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { RequestsService } from 'src/app/services/requests.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-autorizar',
  templateUrl: './autorizar.component.html',
  styleUrls: ['./autorizar.component.css']
})
export class AutorizarComponent implements OnInit {

  auths: any;

  constructor(private rq: RequestsService, private http: HttpClient) { }

  ngOnInit(): void {

    this.http.get(this.rq.getAuths())
      .subscribe((resp: any) => {
        this.auths = resp;
      });
  }

  autorization(item: any) {
    const request = {
      AuthID: item.AuthID,
      Address: item.Address,
      Location: item.Location,
      Area: item.Area,
      NumRooms: item.Num_rooms,
      NumBaths: item.Num_bathrooms,
      Price: item.Price,
      Stratum: item.Stratum,
      UserID: item.UserID,
      TypeHouse: item.TypeHouse,
      TypeProperty: item.TypeProperty,
      Parking: item.Parking,
      Description: item.Description
    };
    
    Swal.fire({
      title: 'Autorizar',
      icon: 'question',
      html: '¿Está seguro que desea autorizar la subida de esta propiedad?',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Autorizar',
      cancelButtonText: 'Cancelar'
    }).then((response) => {
      if (response.isConfirmed) {
        this.http.post(this.rq.authProperty(), request)
        .subscribe((resp: any) => {
          if (resp) {
            Swal.fire({
              title: 'Propiedad creada',
              icon: 'success',
              html: 'La propiedad ha sido autorizada',
              showCloseButton: true,
              confirmButtonText: 'Ok'
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            })
          } else { 
            Swal.fire({
              title: 'Error',
              icon: 'error',
              html: 'Hubo un error al autorizar la propiedad',
              showCloseButton: true,
              confirmButtonText: 'Ok'
            })
          }
        }); 
      }
    });
  }

  ban(auth: string) {
    Swal.fire({
      title: 'Eliminar',
      icon: 'warning',
      iconColor: '#EF4444',
      html: '¿Está seguro que desea denegar la subida de esta propiedad?',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Denegar',
      confirmButtonColor: '#EF4444',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(this.rq.deleteAuth(auth))
          .subscribe((resp: any) => {
            if (resp) {
              Swal.fire({
                title: 'Propiedad eliminada',
                icon: 'success',
                html: 'La propiedad ha sido eliminada con éxito',
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
                html: 'Hubo un error al denegar la propiedad',
                showCloseButton: true,
                confirmButtonText: 'Ok'
              });
            }
          });
      }
    });
  }
}
