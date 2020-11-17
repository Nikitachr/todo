import { animate, transition, state, trigger, style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';


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
  constructor(private fb: FormBuilder) {
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

}