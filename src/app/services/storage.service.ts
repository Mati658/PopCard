import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storageSubject: BehaviorSubject<{ [key: string]: any }> = new BehaviorSubject({});
  initialized = false;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create(); // Inicializa el storage
    const allKeys = await this.storage.keys();
    const allData : any = {};

    for (const key of allKeys) {
      allData[key] = await this.storage.get(key);
    }

    this.storageSubject.next(allData); // Carga inicial del storage
    this.initialized = true;    
    console.log(allData);
  }

  getStorageObservable(): Observable<{ [key: string]: any }> {
    return this.storageSubject.asObservable();
  }

  async guardarMazo(titulo: string, mazo: any) {
    await this.storage.set(titulo, mazo);

    const currentData = this.storageSubject.getValue();
    currentData[titulo] = mazo; // Actualiza la cache interna
    this.storageSubject.next(currentData); // Notifica a los observadores

    console.log('mazo guardado:', mazo);

  }

  async obtenerMazo(titulo:string) {
    const mazo = await this.storage.get(titulo);
    return mazo || false; 
  }

  async eliminarMazo(mazo:string){
    await this.storage.remove(mazo) //para eliminar mazo entero, no cards. Para eliminar cards voy a modificar el json en sí
    
    const currentData = this.storageSubject.getValue();
    delete currentData[mazo]; // Elimina de la cache interna
    this.storageSubject.next(currentData); // Notifica a los observadores
    console.log(`${mazo} - Eliminado!`);
  }


  // async obtenerTodosMazos() {
  //   const keys = await this.storage.keys(); // Obtener todas las claves almacenadas
  //   console.log(keys)
  //   let allData : any = {};
  //   let i : number = 0;
  //   for (let key of keys) {
  //     i++
  //     const value = await this.storage.get(key); // Obtener el valor de cada clave
  //     allData[key] = value; // Almacenar el valor con su respectiva clave
  //     allData['total'] = i;
  //   }
  
  //   return allData; // Retorna un objeto con todas las claves y valores
  // }

  async obtenerNombresMazos() {
    return await this.storage.keys(); // Obtener todas las claves almacenadas
  }

  async eliminarTodo(){
    await this.storage.clear();
  }

}
