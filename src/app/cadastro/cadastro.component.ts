import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  cadastroForm: FormGroup

  msgReturn = "";

  constructor(
    private fb: FormBuilder,
    private dataService: ApiService,
    private router: Router
  ) {
    this.cadastroForm = this.fb.group({
      cep: ['',[Validators.required, Validators.maxLength(6), Validators.min(100000), Validators.max(999999)]],
      city: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  ngOnInit() {


  }

  backDashboard(){
      this.router.navigate(['/','dashboard']);
  }

  postdata(cadastroForm1: any) {

    this.msgReturn = "";

    if (this.cadastroForm.invalid){
      this.msgReturn = "Os campos são obrigatórios, para o cep digite um valor entre 100.000 e 999.999, somente números!";
      return;
    }

    this.dataService
      .cepPost(cadastroForm1.value.cep, cadastroForm1.value.city)
      .pipe(first())
      .subscribe(
        (data) => {
          console.log(data);
          const redirect = this.dataService.redirectUrl
            ? this.dataService.redirectUrl
            : '/dashboard/cadastro';
          this.msgReturn = data.msg;
          this.router.navigate([redirect]);
        },
        (error) => {
          this.msgReturn = 'Erro: ' + 'Object Keys: ' + Object.keys(error) + 'Object Values: ' + Object.values(error);
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

