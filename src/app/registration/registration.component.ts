import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
export class RegistrationComponent implements OnInit {

  loginForm: FormGroup;
  constructor() {
    this.loginForm = new FormGroup({
      "email": new FormControl("", [
                          Validators.required, 
                          Validators.email
                      ]),
      "password": new FormControl('', [Validators.required]),
      "repeatPassword": new FormControl('', [Validators.required])
  });
  }
  ngOnInit() {
  }

}
