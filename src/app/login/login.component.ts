import { Component, Output, OnInit, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {

  angForm: FormGroup;

  @Input() userLog: any;
  @Output() dataEvent = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder,
    private dataService: ApiService,
    private router: Router
  ) {
    this.angForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.minLength(1), Validators.email],
      ],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}
  postdata(angForm1: any) {
    this.dataService
      .userlogin(angForm1.value.email, angForm1.value.password)
      .pipe(first())
      .subscribe(
        (data) => {
          const redirect = this.dataService.redirectUrl
            ? this.dataService.redirectUrl
            : '/dashboard';
          this.router.navigate([redirect]);
          //Emitir a informação, no caso o email LOGIN
          this.dataEvent.emit(angForm1.value.email);
        },
        (error) => {
          alert('Nome de usuário ou senha está incorreto!');
        }
      );
  }
  get email() {
    return this.angForm.get('email');
  }
  get password() {
    return this.angForm.get('password');
  }
}
