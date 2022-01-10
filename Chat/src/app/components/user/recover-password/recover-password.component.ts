import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { ResponseBase } from 'src/app/shared/models/response-base';
import { ActivateUser } from './../../../interfaces/activate-user';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  activateUser: ActivateUser = { username: '', password: '', passwordConfirmation: '', token: '' };
  recoverPasswordFormGroup: FormGroup;
  debounce: Subject<string> = new Subject<string>();
  userExists$: Observable<ResponseBase<any>>;

  constructor(activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, private userService: UserService) {
    this.activateUser.token = activatedRoute.snapshot.paramMap.get('token');
  }

  ngOnInit() {
    this.recoverPasswordFormGroup = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwordConfirmation: ['', [Validators.required]]
    });

    this.checkExistingUser();
  }

  register(): void {
    if(!this.recoverPasswordFormGroup.valid && this.recoverPasswordFormGroup.pending) {
      return alert("Preencha todos os campos antes de prosseguir.");
    }

    const user = this.recoverPasswordFormGroup.getRawValue();
    this.activateUser.username = user.username;
    this.activateUser.password = user.password;
    this.activateUser.passwordConfirmation = user.passwordConfirmation;
  }

  navigateTo(route: string) {
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
