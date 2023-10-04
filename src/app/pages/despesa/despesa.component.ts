import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from 'src/app/models/Categoria';
import { Despesa } from 'src/app/models/Despesa';
import { SelectModel } from 'src/app/models/SelectModel';
import { SistemaFinanceiro } from 'src/app/models/SistemaFinanceiro';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { DespesaService } from 'src/app/services/despesa.service';
import { MenuService } from 'src/app/services/menu.service';
import { SistemaService } from 'src/app/services/sistema.service';

@Component({
  selector: 'app-despesa',
  templateUrl: './despesa.component.html',
  styleUrls: ['./despesa.component.scss']
})
export class DespesaComponent {
  constructor(public menuService: MenuService, public formBuilder: FormBuilder, 
    public sistemaService : SistemaService, public authService : AuthService,
    public categoriaService : CategoriaService, 
    public despesaService : DespesaService)
  {

  }

  listSistemas = new Array<SelectModel>();
  sistemaSelect = new SelectModel();

  listCategorias = new Array<SelectModel>();
  categoriaSelect = new SelectModel();

  color = 'accent';
  checked = false;
  disabled = false;

  despesaForm:FormGroup;

  ngOnInit(){
    this.menuService.menuSelecionado = 4;

    this.despesaForm = this.formBuilder.group
    ({
      name:['', [Validators.required]],
      valor:['', [Validators.required]],
      data:['', [Validators.required]],
      sistemaSelect:['', [Validators.required]],
      categoriaSelect:['', [Validators.required]],
    })

    this.ListaCategoriasUsuario();
  }

  dadosForm(){
    return this.despesaForm.controls;
  }

  enviar(){
    debugger
    var dados = this.dadosForm();

    let item = new Despesa();
    item.Nome = dados["name"].value;
    item.Id =0;
    item.Valor = dados["valor"].value;
    item.Pago = this.checked;
    item.DataVencimento = dados["data"].value;

    item.IdCategoria = parseInt(this.categoriaSelect.id);
    
    this.despesaService.AdicionarDespesa(item)
    .subscribe((response: Despesa) => {
      
      this.despesaForm.reset();

    }, (error) => console.error(error),
      () => { })
  }

  handleChangePago(item: any){
    debugger
    this.checked = item.checked as boolean;
  }

  ListaCategoriasUsuario()
  {
    this.categoriaService.ListarCategoriasUsuario(this.authService.getEmailUser())
    .subscribe((response : Array<Categoria>) => {
      var listaCategorias =[];

      response.forEach(x => {
        var item = new SelectModel();
        item.id = x.Id.toString();
        item.name = x.Nome;

        listaCategorias.push(item);
      });

      this.listCategorias = listaCategorias;
    })
  }
}
