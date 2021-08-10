import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  cadastroForm: FormGroup;

  msgReturn = "";
  login = "";

  constructor(
    private fb: FormBuilder,
    private dataService: ApiService,
    private router: Router,
    private user: LoginComponent
  ) {

    this.cadastroForm = this.fb.group({
      cep: ['',[Validators.required, Validators.maxLength(6), Validators.min(100000), Validators.max(999999)]],
      city: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  ngOnInit() {


  }

  postdata(cadastroForm1: any) {
    this.dataService
      .cepPost(cadastroForm1.value.cep, cadastroForm1.value.city)
      .pipe(first())
      .subscribe(
        (data) => {
          const redirect = this.dataService.redirectUrl
            ? this.dataService.redirectUrl
            : '/dashboard/cadastro';
            this.msgReturn = "CEP cadastrado com sucesso! ";
          this.router.navigate([redirect]);
        },
        (error) => {
          this.msgReturn = 'Ocorreu um erro: ' + '\n' + error.message + '\n' + error.statusText + '\n' + error.url;
        }
      );
  }

  get cep() {
    return this.cadastroForm.get('cep');
  }

  get city() {
    return this.cadastroForm.get('city');
  }

}

