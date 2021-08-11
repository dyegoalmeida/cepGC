import { Cep } from './../lista/cep';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  id: number = 0;
  cep: string = '';
  city: string = '';
  msgError: string = '';
  arrayTable: Cep[] = [];

  constructor(
    private dataService: ApiService,
    private router: Router
  ){}

  backDashboard(){
    this.router.navigate(['/','dashboard']);
  }
  ngOnInit(): void {

    this.msgError = '';

    this.dataService
    .cepList()
    .subscribe(
      (data) => {

        this.arrayTable = data;

      },
      (error) => {

        this.msgError = 'Erro: ' + Object.values(error);

      }
    );

  }

}
