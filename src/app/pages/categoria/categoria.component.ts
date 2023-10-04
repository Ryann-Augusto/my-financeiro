import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from 'src/app/models/Categoria';
import { SelectModel } from 'src/app/models/SelectModel';
import { SistemaFinanceiro } from 'src/app/models/SistemaFinanceiro';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { MenuService } from 'src/app/services/menu.service';
import { SistemaService } from 'src/app/services/sistema.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent {
  constructor(public menuService: MenuService, public formBuilder: FormBuilder,
    public sistemaService : SistemaService, public authService : AuthService,
    public categoriaService : CategoriaService)
  {

  }

  listSistemas = new Array<SelectModel>();
  sistemaSelect = new SelectModel();

  categoriaForm:FormGroup;

  ngOnInit(){
    this.menuService.menuSelecionado = 3;

    this.categoriaForm = this.formBuilder.group
    ({
      name:['', [Validators.required]],
      sistemaSelect:['', [Validators.required]]
    })
    this.ListaSistemaUsuario();
  }

  dadosForm(){
    return this.categoriaForm.controls;
  }

  enviar(){
    debugger
    var dados = this.dadosForm();

    let item = new Categoria();
    item.Nome = dados["name"].value;

    item.Id =0;
    item.IdSistema = parseInt(this.sistemaSelect.id)

    this.categoriaService.AdicionarCategoria(item)
    .subscribe((response: Categoria) => {
      
      this.categoriaForm.reset();

    }, (error) => console.error(error),
      () => { })
  }

  ListaSistemaUsuario()
  {
    this.sistemaService.ListaSistemaUsuario(this.authService.getEmailUser())
    .subscribe((response : Array<SistemaFinanceiro>) => {
      var listSistemaFinanceiro =[];

      response.forEach(x => {
        var item = new SelectModel();
        item.id = x.Id.toString();
        item.name = x.Nome;

        listSistemaFinanceiro.push(item);
      });

      this.listSistemas = listSistemaFinanceiro;
    })
  }
}
