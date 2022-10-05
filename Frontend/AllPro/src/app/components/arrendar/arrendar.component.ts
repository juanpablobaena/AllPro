import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RequestsService } from '../../services/requests.service';
import { property } from '../../interfaces/property.interface';

@Component({
  selector: 'app-arrendar',
  templateUrl: './arrendar.component.html',
  styleUrls: ['./arrendar.component.css']
})
export class ArrendarComponent implements OnInit {

  propertys: property[] = [];
  islogged: boolean = false;

  constructor(private route: Router, private http: HttpClient, private rq: RequestsService) { }

  ngOnInit(): void {
    if (localStorage.getItem('userLogged') === 'true') {
      this.islogged = true;
      this.http.get(this.rq.getPropertys(localStorage.getItem('idUser')?.toString()))
        .subscribe((resp: any) => {
          this.propertys = resp;
        });
    } else {
      this.http.get(this.rq.getPropertys2())
      .subscribe((resp: any) => {
        this.propertys = resp;
      });
    }

  }

  seemore(item: any) {
    localStorage.removeItem('item');
    localStorage.setItem('item', item);
    this.route.navigateByUrl('/visualizacion');
  }

  newProperty() {
    this.route.navigateByUrl('/createProperty');
  }

}
