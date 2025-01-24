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
  mazoEliminar! : string;

  mazos : any = [];


  constructor(){
    this.formGroup = this.fb.group({
      titulo: ["", [Validators.required]],
    }); 

    this.storage.getStorageObservable().subscribe((data:any)=>{
      this.mazos = Object.keys(data); // Obtén las claves de los datos
      console.log(data);

    })

    // this.storage.eliminarTodo();

    // this.storage.obtenerNombresMazos().then((mazos:any)=>{
    //   console.log(mazos);
    //   this.mazos = mazos;
    // })

    // this.storage.obtenerTodosMazos().then((mazos:any)=>{
    //   console.log(mazos);
    //   // this.mazos = mazos;
    // })

  }

  async crearMazo(){ //creo el mazo vacío
    console.log(this.mazo);
    await this.storage.guardarMazo(this.mazo, []);
    this.mazo = "";
  }

  async eliminarMazo(mazoSeleccionado:string){
    await this.storage.eliminarMazo(mazoSeleccionado);

  }

  enviarMazo(mazoSeleccionado:string){
    console.log(mazoSeleccionado)
    this.datos.setMazoSeleccionado = mazoSeleccionado;
  }

  router(path:string){
    this.navCtlr.navigateForward(path);
  }

  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        console.log(this.mazoEliminar);
      },
    },
    {
      text: 'Confirmar',
      role: 'confirm',
      handler: () => {
        this.eliminarMazo(this.mazoEliminar);
      },
    },
  ];

}
