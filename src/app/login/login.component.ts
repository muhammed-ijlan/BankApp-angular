import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  //database
  database: any = {
    1000: { acno: 1000, uname: 'Leo', password: 1000, balance: 5000 },
    1001: { acno: 1001, uname: 'Ram', password: 1001, balance: 8000 },
    1002: { acno: 1002, uname: 'Neer', password: 1002, balance: 6000 },
  };

  acno = '';
  pswd = '';

  loginForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
  });

  constructor(
    private router: Router,
    private ds: DataService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  accnoChange(event: any) {
    this.acno = event.target.value;
  }
  pswdChange(event: any) {
    this.pswd = event.target.value;
  }

  login() {
    var acno = this.loginForm.value.acno;
    var pswd = this.loginForm.value.pswd;

    if (this.loginForm.valid) {
      this.ds.login(acno, pswd).subscribe(
        (result: any) => {
          if (result) {
            localStorage.setItem(
              'currentAcno',
              JSON.stringify(result.currentAcno)
            );
            localStorage.setItem(
              'currentUser',
              JSON.stringify(result.currentUser)
            );
            localStorage.setItem('token', JSON.stringify(result.token));
            alert('login successfull');
            this.router.navigateByUrl('dashboard');
          }
        },
        (result) => {
          alert(result.error.message);
        }
      );
    } else {
      alert('Invalid form');
    }
  }
}

// two way binding

// template referencing variable

// login(a: any, p: any) {
//   let acno = a.value;
//   let pswd = p.value;

//   if (acno in this.database) {
//     if (pswd == this.database[acno].password) {
//       alert('Login successfull');
//     } else {
//       alert('incorrect password');
//     }
//   } else {
//     alert('User not found');
//   }
// }
