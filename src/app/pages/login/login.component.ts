import { Token } from '@angular/compiler';
import { Component } from '@angular/core';

import { FormBuilder, FormGroup, SelectControlValueAccessor, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor( public formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    public authServer: AuthService)
  {

  }
  
  loginForm: FormGroup;

  ngOnInit(): void{
    this.loginForm = this.formBuilder.group(
      {
        email :['',[Validators.required, Validators.email]],
        senha :['',[Validators.required]]
      }
    )
  }
  get dadosForm()
  {
    return this, this.loginForm.controls
  }

  loginUser()
  {
    this.loginService.login(this.dadosForm["email"].value, this.dadosForm["senha"].value).subscribe(
      token =>{
        this.authServer.setToken(token);
        this.authServer.UsuarioAutenticado(true);
        this.router.navigate(['/dashboard']);
      },
      err => {
        alert('Ocorreu um erro')
      }
    )
  }
}

