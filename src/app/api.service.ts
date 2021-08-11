import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Cep } from './../app/lista/cep';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  redirectUrl: string;

  constructor(private httpClient: HttpClient) {
    this.redirectUrl = '';
  }

  baseUrl: string = 'http://localhost/cepGC/php';

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  public userlogin(username: any, password: any) {
    return this.httpClient
      .post<any>(this.baseUrl + '/login.php', { username, password })
      .pipe(
        map((User) => {
          this.setToken(User[0].name);
          this.getLoggedInName.emit(true);
          return User;
        })
      );
  }

  public cepPost(cep: number, city: string) {
    return this.httpClient
      .post<any>(this.baseUrl + '/cadastro.php', { cep, city})
      .pipe(
        map((cep) => {
          return cep;
        })
      );
  }

  public cepList() {
    return this.httpClient
      .get<Cep[]>(this.baseUrl + '/lista.php',{})
      .pipe(
        map((list) => {
          return list;
        })
      );
  }

  public userregistration(name: any, email: any, pwd: any) {
    return this.httpClient
      .post<any>(this.baseUrl + '/register.php', { name, email, pwd })
      .pipe(
        map((User) => {
          return User;
        })
      );
  }

  //token
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  deleteToken() {
    localStorage.removeItem('token');
  }
  isLoggedIn() {
    const usertoken = this.getToken();
    if (usertoken != null) {
      return true;
    }
    return false;
  }
}
