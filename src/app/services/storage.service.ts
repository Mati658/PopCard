import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  async guardarMazo(titulo : string, mazo: any) {
    await this.storage.set(titulo, mazo);
    console.log('mazo guardado:', mazo);
  }

  async obtenerMazo(titulo:string) {
    const mazo = await this.storage.get(titulo);
    return mazo || false; 
  }

  async eliminarMazo(mazo:string){
    await this.storage.remove(mazo) //para eliminar mazo entero, no cards. Para eliminar cards voy a modificar el json en sí
    console.log("Eliminado!");
  }

  async obtenerTodosMazos() {
    const keys = await this.storage.keys(); // Obtener todas las claves almacenadas
    console.log(keys)
    let allData : any = {};
    let i : number = 0;
    for (let key of keys) {
      i++
      const value = await this.storage.get(key); // Obtener el valor de cada clave
      allData[key] = value; // Almacenar el valor con su respectiva clave
      allData['total'] = i;
    }
  
    return allData; // Retorna un objeto con todas las claves y valores
  }

  async obtenerNombresMazos() {
    return await this.storage.keys(); // Obtener todas las claves almacenadas
  }

  async eliminarTodo(){
    await this.storage.clear();
  }

}
