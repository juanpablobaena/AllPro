import { Injectable } from '@angular/core';
import { property } from '../interfaces/property.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  baseUrl: string = 'https://localhost:44360/';

  constructor(private route: Router) { }
  
  newSession() {
    return this.baseUrl + 'api/acceso/LoginUsers';
  }

  registerUser() {
    return this.baseUrl + 'api/acceso/RegisterUsers';
  }

  getInfoUser(id: any) {
    return this.baseUrl + `api/acceso/GetInfoUser/${id}`;
  }

  setInfoUser() {
    return this.baseUrl + `api/acceso/SetInfoUser`;
  }

  getUsers() {
    return this.baseUrl + 'api/acceso/GetUsers';
  }

  getAuths() {
    return this.baseUrl + 'api/acceso/GetAuths';
  }

  editUser() {
    return this.baseUrl + 'api/acceso/UpdateUser';
  }
  
  deleteUser(id: string) {
    return this.baseUrl + `api/acceso/DeleteUser/${id}`;
  }

  deleteAuth(id: string) {
    return this.baseUrl + `api/acceso/DeleteAuth/${id}`;
  }

  deleteProperty(id: any) {
    return this.baseUrl + `api/acceso/DeleteProperty/${id}`;
  }

  createProperty() {
    return this.baseUrl + 'api/acceso/CreateProperty';
  }

  authProperty() {
    return this.baseUrl + 'api/acceso/AuthProperty';
  }

  getPropertys(id: any) {
    return this.baseUrl + `api/acceso/GetPropertys/${id}`;
  }

  getPropertys2() {
    return this.baseUrl + `api/acceso/GetPropertys2/`;
  }

  getMyPropertys(id: string | undefined) {
    return this.baseUrl + `api/acceso/GetMyPropertys/${id}`;
  }
  
  getVisualization(idProperty: any, idUser: any) {
    return this.baseUrl + `api/acceso/PreviewProperty/${idProperty}/${idUser}`;
  }

  updateProperty() {
    return this.baseUrl + `api/acceso/UpdateProperty`;
  }


}
