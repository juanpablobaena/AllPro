import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { property } from 'src/app/interfaces/property.interface';
import { RequestsService } from 'src/app/services/requests.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-arrendarpropios',
  templateUrl: './arrendarpropios.component.html',
  styleUrls: ['./arrendarpropios.component.css']
})
export class ArrendarpropiosComponent implements OnInit {

  propertys: property[] = [];
  idUser: string | undefined = ''; 
  location: any;

  constructor(private route: Router, private http: HttpClient, private rq: RequestsService) { }

ngOnInit(): void {
  this.idUser = localStorage?.getItem('idUser')?.toString();
    this.http.get(this.rq.getMyPropertys(this.idUser))
      .subscribe((resp: any) => {
      this.propertys = resp;
    });
  }

  newProperty() {
    this.route.navigateByUrl('/createProperty');
  }

  seemore(item: any) {
    localStorage.removeItem('item');
    localStorage.setItem('item', item);
    this.route.navigateByUrl('/visualizacion');
  }
  
}
