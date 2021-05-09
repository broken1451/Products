import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
})
export class NewProductComponent implements OnInit {
  public form!: FormGroup;
  public titulo: string = 'Crear Producto'
  public id!: string;

  get formValue() {
    return this.form.controls;
  }

  constructor(private router: Router,private activatedRoute: ActivatedRoute, private fb: FormBuilder, private toastr: ToastrService, private productoService: ProductoService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required],
    });
    // this.activatedRoute.snapshot.paramMap.get('id')
    this.activatedRoute.params.subscribe((urlParam: Params)=>{
      this.id = urlParam.id
    });
   if (this.id) {
    this.esEditar()
   }
  }

  onSubmit() {
    const producto: Producto = new Producto(
      this.formValue.producto.value,
      this.formValue.categoria.value,
      this.formValue.ubicacion.value,
      this.formValue.precio.value
    );

    if (this.id != null || this.id !='') {
      // editar
      if (this.id) {
        producto._id = this.id
        this.productoService.updateProduct(producto).subscribe(pdr=>{
          this.toastr.info('Producto Actualizado', 'Producto Actulizado con exito!');
          this.router.navigate(['/productos']);
    
        },(err)=>{
          console.log(err)
          this.form.reset();
        })
        
      }else{
        // agregar
        this.productoService.newProduct(producto).subscribe((prd)=>{
          this.toastr.success('Producto registrado', 'Producto registrado con exito!');
          this.router.navigate(['/productos']);
        }, (err)=>{
          console.log(err)
          this.form.reset();
        })
      }
    } 

  }

  volver() {
    this.router.navigate(['/productos/listar']);
  }


  esEditar(){
    if (this.id != null || this.id != '') {
      console.log('here')
      this.titulo = 'Editar Producto'
      this.productoService.getProductId(this.id).subscribe((data:any)=>{
        console.log({data})
        this.form.setValue({
          producto: data.productId.producto ,
          categoria: data.productId.categoria,
          ubicacion: data.productId.ubicacion,
          precio: data.productId.precio,
        })
      })  
    }
  }
}
