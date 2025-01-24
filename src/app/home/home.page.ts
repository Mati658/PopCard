import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../services/storage.service';
import { NavController } from '@ionic/angular';
import { DatosService } from '../services/datos.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  fb = inject(FormBuilder);
  storage = inject(StorageService);
  navCtlr = inject(NavController);
  datos = inject(DatosService);

  formGroup : FormGroup;

  cantMazos : number = 0;
  
  mazo! : string;

  mazos : [] = [];


  constructor(){
    this.formGroup = this.fb.group({
      titulo: ["", [Validators.required]],
    }); 
    // this.storage.eliminarTodo();

    this.storage.obtenerNombresMazos().then((mazos:any)=>{
      console.log(mazos);
      this.mazos = mazos;
    })

    this.storage.obtenerTodosMazos().then((mazos:any)=>{
      console.log(mazos);
      // this.mazos = mazos;
    })

  }

  async crearMazo(){ //creo el mazo vacío
    console.log(this.mazo);
    await this.storage.guardarMazo(this.mazo, []);
    this.mazo = "";
  }

  enviarMazo(mazoSeleccionado:string){
    console.log(mazoSeleccionado)
    this.datos.setMazoSeleccionado = mazoSeleccionado;
  }

  router(path:string){
    this.navCtlr.navigateForward(path);
  }

}
