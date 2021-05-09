import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { NewProductComponent } from './new-product/new-product.component';
import { ListProductComponent } from './list-product/list-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NewProductComponent, ListProductComponent],
  exports: [NewProductComponent, ListProductComponent],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ComponentsModule {}
