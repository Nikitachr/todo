import { animate, style, transition, trigger } from '@angular/animations';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MustMatch, patternValidator } from '../custom-validators';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  animations: [
    trigger(
      'appear', 
      [
        transition(
          ':enter', 
          [
            style({ marginTop: '-22px', opacity: 0 }),
            animate('0.3s ease', 
                    style({marginTop: '0', opacity: 1 }))
          ], 
        ),
        transition(
          ':leave', 
          [
            style({ marginTop: '0', opacity: 1 }),
            animate('0.3s ease', 
                    style({marginTop: '-22px', opacity: 0 }))
          ], 
        )
      ]
    )
  ]
})
export class RegistrationComponent implements OnInit {
  isError: boolean = false; 

  constructor(private fb: FormBuilder, private authService: AuthService) {
    
  }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators] ],
    password: ['', [
      Validators.required,
      patternValidator(/\d/, { hasNumber: true }),
      patternValidator(/[A-Z]/, { hasCapitalCase: true }),
      patternValidator(/[a-z]/, { hasSmallCase: true }),
      Validators.minLength(8)]
    ],
    repeatPassword: ['', Validators.required]
  }, {
    validator: MustMatch('password', 'repeatPassword')
  });
  
  ngOnInit() {
    
  }

  submit(){
    this.authService.signup(this.loginForm.get('email').value, this.loginForm.get('password').value).subscribe((res: HttpResponse<any>) => {
    }, (err: any) => {this.isError = true;});
    
  }

}
