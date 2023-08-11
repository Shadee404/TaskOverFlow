import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../service/customer.service";
import {FormControl, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);
  matcher = new ErrorStateMatcher();

  constructor(private customerService: CustomerService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.customerService.getCurrentCustomer().subscribe(customer => {
      this.emailFormControl.setValue((customer.body as any).email);
    });
  }

  updateEmail() {
    if (this.emailFormControl.invalid || this.passwordFormControl.invalid) {
      return;
    }

    this.customerService.updateEmail({
      email: this.emailFormControl.getRawValue(),
      password: this.passwordFormControl.getRawValue()
    }).subscribe((message) => {
      console.log(message);
      this.authService.storeToken(message.body);
    });
    //TODO: show success message
  }
}
