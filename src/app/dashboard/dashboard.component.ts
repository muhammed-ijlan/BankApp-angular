import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  acno = '';
  pswd = '';
  amount = '';

  acno1 = '';
  pswd1 = '';
  amount1 = '';
  constructor(private ds: DataService) {}

  ngOnInit(): void {}

  deposit() {
    var acno = this.acno;
    var amount = this.amount;
    var pswd = this.pswd;

    var result = this.ds.deposit(acno, pswd, amount);
    if (result) {
      alert(`${amount} added successfully ... New balance is ${result};`);
    }
  }

  withdraw() {
    var acno = this.acno1;
    var pswd = this.pswd1;
    var amount = this.amount1;

    var result = this.ds.withdraw(acno, pswd, amount);
    if (result) {
      alert(`${amount} is debited.. balance is ${result}`);
    }
  }
}
