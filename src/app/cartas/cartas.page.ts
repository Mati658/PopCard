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
  
  cartaSeleccionada! : string;
  pregunta! : string;
  respuesta! : string;

  cartas : [] = [];


  constructor(){
    this.formGroup = this.fb.group({
      pregunta: ["", [Validators.required]],
      respuesta: ["", [Validators.required]],
    }); 
    // this.storage.eliminarTodo();

    this.storage.obtenerMazo(this.datos.getMazoSeleccionado).then((cartas:any)=>{
      console.log(cartas);
      this.cartas = cartas;
    })
  }

  obtenerCartas(){
    
  }

  aniadirCartas(){ //añado las cartas al carta seleccionado
    this.storage.obtenerMazo(this.cartaSeleccionada).then((res:any)=>{
      res.push({question:this.pregunta, res:this.respuesta})
      console.log(res)
      this.storage.guardarMazo(this.cartaSeleccionada, res);
    })
  }

}
