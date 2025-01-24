import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartasPage } from './cartas.page';

import { CartasPageRoutingModule } from './cartas-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartasPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CartasPage]
})
export class CartasPageModule {}
