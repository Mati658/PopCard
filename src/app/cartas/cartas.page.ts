import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../services/storage.service';
import { DatosService } from '../services/datos.service';

@Component({
  selector: 'app-cartas',
  templateUrl: './cartas.page.html',
  styleUrls: ['./cartas.page.scss'],
  standalone: false,
})
export class CartasPage {

  fb = inject(FormBuilder);
  storage = inject(StorageService);
  datos = inject(DatosService);

  formGroup : FormGroup;
  
  cartaEliminar! : number;
  cartaSeleccionada! : string;
  pregunta! : string;
  respuesta! : string;

  cartas : any = [];


  constructor(){
    this.formGroup = this.fb.group({
      pregunta: ["", [Validators.required]],
      respuesta: ["", [Validators.required]],
    }); 
    // this.storage.eliminarTodo();

   

    this.storage.getStorageObservable().subscribe(()=>{
      this.storage.obtenerMazo(this.datos.getMazoSeleccionado).then((cartas:any)=>{
        console.log(cartas);
        this.cartas = cartas;
      })

    })
  }

  obtenerCartas(){
    
  }

  async aniadirCartas(){ //añado las cartas al carta seleccionado
    await this.storage.obtenerMazo(this.datos.getMazoSeleccionado).then((res:any)=>{
      res.push({question:this.pregunta, res:this.respuesta})
      console.log(this.datos.getMazoSeleccionado)
      console.log(res)
      this.storage.guardarMazo(this.datos.getMazoSeleccionado, res);
    })
  }

  async eliminarCarta(cartaSeleccionada:number){
    await this.storage.obtenerMazo(this.datos.getMazoSeleccionado).then((res:any)=>{
      res.splice(cartaSeleccionada)
      console.log(this.datos.getMazoSeleccionado)
      console.log(res)
      this.storage.guardarMazo(this.datos.getMazoSeleccionado, res);
    })

  }

  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        console.log(this.cartaEliminar);
      },
    },
    {
      text: 'Confirmar',
      role: 'confirm',
      handler: () => {
        this.eliminarCarta(this.cartaEliminar);
      },
    },
  ];

}
