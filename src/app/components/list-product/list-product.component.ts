import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
})
export class ListProductComponent implements OnInit {
  public productos: Producto[] = [];

  constructor(
    private router: Router,
    private prodoctService: ProductoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllProduct();
  }

  newProduct() {
    this.router.navigate(['/productos/newProduct']);
  }

  getAllProduct() {
    this.prodoctService.getProducts().subscribe(
      (prod) => {
        this.productos = prod.productos;
        console.log(prod);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  delete(product: Producto) {
    this.prodoctService.delete(product._id!).subscribe((prd) => {
      this.toastr.error('El producto fue eliminado con exito', `El producto ${product} fue eliminado`)
      this.getAllProduct()
    },(err) => {
      console.log(err);
    });
  }

  edit(product:Producto){
    this.router.navigate(['/productos/actualizarProduct', product._id])
    console.log(product)
  }

}
