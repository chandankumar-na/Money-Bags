import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { UserDetails } from "./../interfaces/userDetails.interface";
import { AppService } from './../app.service';
declare var jQuery: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model = new UserDetails();
  error_message:any;
  login_register_flag: boolean;
  register_show_flag: boolean ;
  name_or_user_name="User Name"
  name_or_user_name_paceholder="Email or Mobile"
  constructor(private appService: AppService, private router: Router) {
    console.log("LoginComponent constructor()")
  }

  //onsubmit Login
  onSubmit() {
    console.log("onSubmit")
    this.model.user_email=this.model.user_name
    this.model.user_phone=this.model.user_name
    this.appService.login(this.model).subscribe(
      (data:any) => {
        console.log("data:", data)
        if (data == null) {
          console.log("Login Failed");
          jQuery("#err_succ").css("color", "red");
          this.error_message = "Invalid user name or password"

          jQuery('#user_name,#user_password').css('border-color', 'red');
          jQuery('#loginSubmit').prop('disabled', true);
        }else {
          console.log("Login Success")
          localStorage.setItem('user_id', data.user_id);
          localStorage.setItem('user_name', data.user_name);
          this.router.navigate(['/home']);
        }
      },
      error => console.log("ERROR:" + error),
      () => console.log());
  }

  //To register
  register() {
    console.log("register")

    this.appService.register(this.model).subscribe(
      data => {
        console.log("data:", data)
        if (data != null) {
          this.error_message = "Registration Successful !"
          jQuery("#err_succ").css("color", "green");
          jQuery('#login').css('height', '390px');
          this.login_register_flag = false

        } else {
          jQuery("#err_succ").css("color", "red");
          this.error_message = "Registration Unsuccessful !"
        }

      })
  }

  //to show register form
  register_show(flag) {
    this.error_message = ""
    this.login_register_flag = flag
    if (flag) {
      this.name_or_user_name="Full Name";
      this.name_or_user_name_paceholder="Full name"
      jQuery('#login').css('height', '557px');
      this.register_show_flag = false

    } else {
      this.name_or_user_name="User Name";
      this.name_or_user_name_paceholder="Email or Mobile"
      jQuery('#login').css('height', '390px');
      this.register_show_flag = true
    }
  }
  ngOnInit() {
    // this.onkeyUp();
  }

  onkeyUp() {
    if (this.model.user_name == null || this.model.user_name == "" || this.model.user_password == null || this.model.user_password == "") {
      jQuery('#loginSubmit').prop('disabled', true);
    }
    else {
      jQuery('#loginSubmit').prop('disabled', false);
    }
  }

}
