import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { debounceTime } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';
import { ResponseBase } from 'src/app/shared/models/response-base';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  signupForm: FormGroup;
  userExists$: Observable<ResponseBase<any>>;
  debounce: Subject<string> = new Subject<string>();

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      dateBirth: ['', Validators.required]
    });

    this.checkExistingUser();
  }

  ngOnDestroy() {
    this.debounce.unsubscribe();
  }

  signup() {
    if(this.signupForm.valid && !this.signupForm.pending) {
      const user = this.signupForm.getRawValue() as User;
      this.userService.post('create', user)
      .subscribe((_) => {
        this.router.navigate(['']);
      }, (err) => {
        alert('Não foi possível cadastrar o usuário, tente novamente.');
      });
    }
    else {
      alert("Verifique o preenchimento dos campos obrigatórios.");
    }
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  checkExistingUser() {
    this.debounce
      .pipe(debounceTime(200))
      .subscribe((value) => {
        const param = '?username='.concat(value);
        this.userExists$ = this.userService.get(`check-existing-user${param}`);
      });
  }


}
