import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserAuthentication } from './../../../interfaces/user-authentication';
import { AuthService } from '../../core/services/auth.service';

@Component({
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.signinForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  authenticate() {
    if(!this.signinForm.valid && this.signinForm.pending) {
      return alert('Preencha o usuário e senha.');

    }

    const userAuthentication = this.signinForm.getRawValue() as UserAuthentication;
    this.authService.post('authenticate', userAuthentication).subscribe(res => this.router.navigate(['messages']), err => alert('Usuário ou senha incorreto.'));
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
