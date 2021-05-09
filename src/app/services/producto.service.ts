import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../models/producto';

const URL = environment.url


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private httpClient: HttpClient) { }



  getProducts(): Observable<any>{
    // http://localhost:3000/api/productos/609759841c945955d1c74c25
    return this.httpClient.get(`${URL}/productos`)
  }

  delete(id:string){
    return this.httpClient.delete(`${URL}/productos/${id}`)
  }

  newProduct(producto:Producto){
    return this.httpClient.post(`${URL}/productos`, producto)
  }

  getProductId(id:string){
    return this.httpClient.get(`${URL}/productos/${id}`)
  }

  updateProduct(producto:Producto){
    console.log(producto)
    return this.httpClient.put(`${URL}/productos/${producto._id}`, producto)
  }
}
