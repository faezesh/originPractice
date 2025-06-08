import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'practice1';

  username1: string = ''
  password: string = ''
  rePassword: string = ''
  matchPassword: boolean = false
  logInForm!: FormGroup
  userName: string = ''
  isLoggedIn = false

  constructor(private fb: FormBuilder) {
    this.logInForm = fb.group({
      userName: new FormControl('', [Validators.required]),
      rememberMe: new FormControl(false)
    })
  }

  onUserNameInputChange(e: Event) {

    this.username1 = (<HTMLInputElement>e.target).value

  }


  onPassword(e: Event) {
    this.password = (<HTMLInputElement>e.target).value;
  }

  onRePassword(e: Event) {
    this.rePassword = (<HTMLInputElement>e.target).value

    if (this.password !== this.rePassword) {
      this.matchPassword = false
    } else {
      this.matchPassword = true
    }
    // this.matchPassword = this.password !== this.rePassword;
  }

  onClick(val: string) {
    alert(val)
  }

  loginUser() {
    if (this.logInForm.valid) {

      const {userName, rememberMe} = this.logInForm.value
      this.userName = userName

      if (rememberMe) {
        localStorage.setItem('userName', userName)
      } else {
        sessionStorage.setItem('userName', userName)
      }
      this.isLoggedIn = true

    }

  }

  logoutUser() {
    localStorage.removeItem('userName')
    // localStorage.clear()
    sessionStorage.removeItem('userName')
    // sessionStorage.clear()
    this.isLoggedIn = false
    this.userName= ''
    this.logInForm.reset()
  }

  ngOnInit() {

    const saveUser = localStorage.getItem('userName') || sessionStorage.getItem('userName')
    if(saveUser){
      this.userName= saveUser
      this.isLoggedIn= true
      // console.log(this.userName)

    }

  }

}
