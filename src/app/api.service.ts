import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

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
        map((Users) => {
          this.setToken(Users[0].name);
          this.getLoggedInName.emit(true);
          return Users;
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

  public userregistration(name: any, email: any, pwd: any) {
    return this.httpClient
      .post<any>(this.baseUrl + '/register.php', { name, email, pwd })
      .pipe(
        map((Users) => {
          return Users;
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
