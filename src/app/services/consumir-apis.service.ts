import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { ipApp } from '../models/host';
import { pollyStruct } from '../models/polly';

@Injectable({
  providedIn: 'root'
})
export class ConsumirApisService {
  URL = ipApp;

  constructor(private http:HttpClient) { }

  public ObtenerVoz(entrada: pollyStruct){
    return this.http.post(`${this.URL}/getvoice`,entrada);
  }

  public ObtenerTexto(nombre: string){
    return this.http.post(`${this.URL}/getTextoPDF`, { "name": nombre });
  }
  

}
