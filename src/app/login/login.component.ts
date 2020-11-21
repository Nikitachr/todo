import { animate, transition, state, trigger, style } from '@angular/animations';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger(
      'appear', 
      [
        transition(
          ':enter', 
          [
            style({ marginTop: '-28px', opacity: 0 }),
            animate('0.3s ease', 
                    style({marginTop: '0', opacity: 1 }))
          ], 
        ),
        transition(
          ':leave', 
          [
            style({ marginTop: '0', opacity: 1 }),
            animate('0.3s ease', 
                    style({marginTop: '-28px', opacity: 0 }))
          ], 
        )
      ]
    )
  ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isError: boolean;

  constructor(private authService: AuthService) {
    this.loginForm = new FormGroup({
      "email": new FormControl("", [
                          Validators.required, 
                          Validators.email
                      ]),
      "password": new FormControl('', [Validators.required])
  });
  }

  ngOnInit() {
  }

  submit(){
    this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value).subscribe((res: HttpResponse<any>) => {
    }, (err: any) => {this.isError = true;});
  }

}