import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectModel } from 'src/app/models/SelectModel';
import { SistemaFinanceiro } from 'src/app/models/SistemaFinanceiro';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';
import { SistemaService } from 'src/app/services/sistema.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent {
  constructor(public menuService: MenuService, public formBuilder: FormBuilder,
    public sistemaService : SistemaService, public authService : AuthService)
  {

  }

  listSistemas = new Array<SelectModel>();
  sistemaSelect = new SelectModel();

  categoriaForm:FormGroup;

  ngOnInit(){
    this.menuService.menuSelecionado = 3;

    this.categoriaForm = this.formBuilder.group
    ({
      name:['', [Validators.required]]
    })
    this.ListaSistemaUsuario();
  }

  dadosForm(){
    return this.categoriaForm.controls;
  }

  enviar(){
    debugger
    var dados = this.dadosForm();

    alert(dados["name"].value);
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
