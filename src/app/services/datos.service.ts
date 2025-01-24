import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  private mazoSeleccionado! : string;
  
  constructor() { }

  
  public set setMazoSeleccionado(v : string) {
    this.mazoSeleccionado = v;
  }
  
  public get getMazoSeleccionado() : string {
    return this.mazoSeleccionado;
  }
}
