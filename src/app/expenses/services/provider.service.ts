import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Provider} from '../models/provider';
import {PORT} from "../const";

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  private http = inject(HttpClient);
  private url = PORT + "providers?supplierOrEmployeeType"
  // private url ="https://my-json-server.typicode.com/113898-KUMIEC/getSupplier/suppliers"

  constructor() { }

  getAllProviders(type?:any):Observable<Provider[]>{
    try {
      console.log(type);
      if(type !== null|| type !== undefined){
        return this.http.get<Provider[]>(`${this.url}=${type}`);
      }
      return this.http.get<Provider[]>(`${this.url}=SUPPLIER`);

    } catch (error) {
      throw error;
    }
  }
  getAllEmployees(): Observable<Provider[]> {
    return this.http.get<Provider[]>(`${this.url}=EMPLOYEES`);
  }
}
