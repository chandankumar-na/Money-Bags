import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '.././app.service';
import { UserTransactionDetails } from './../interfaces/userTransactionDetails.interface';
import { UserDetails } from './../interfaces/userDetails.interface';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  userTransactionDetails = new UserTransactionDetails();
  userDetails = new UserDetails();
  capital_details = { added_capital_amount: 0, capital_actual_or_profit: '' }

  constructor(private appService: AppService, private router: Router) {
    console.log("HomeComponent constuctor()")
    if(localStorage.getItem('user_id')==undefined){
      this.router.navigate(['/login'])
    }
  }


  ngOnInit() {
    this.userTransactionDetails.user_id = localStorage.getItem('user_id');
    this.userDetails.user_name = localStorage.getItem('user_name');
    this.fetchUserTransactionDetails()
  }

  fetchUserTransactionDetails() {
    console.log("fetchUserTransactionDetails")
    this.appService.fetchUserTransactionDetails(localStorage.getItem('user_id')).subscribe((response:any) => {
      console.log("Response", response)
      if (response.length>0) {
        console.log("Response if ")
        this.userTransactionDetails = response[0];
      }else{
        console.log("Response else")
      
        this.userTransactionDetails.user_capital_amount_actual = 0;
        this.userTransactionDetails.user_in_hand_cash=0;
        this.userTransactionDetails.user_capital_amount_total = 0;
        this.userTransactionDetails.user_get_owes_amount=0;
        this.userTransactionDetails.user_expenditure_amount=0;
        this.userTransactionDetails.user_capital_amount_profit = 0;
      }

    })
  }

  showCapital() {
    $("#testmodal").modal('show');
  }

  addOrUpdateUserTransactionDetails() {
    console.log("addOrUpdateUserTransactionDetails()")
    this.userTransactionDetails.user_id = localStorage.getItem('user_id');
    this.userTransactionDetails.user_capital_amount_actual = this.userTransactionDetails.user_capital_amount_actual + Number(this.capital_details.added_capital_amount)
    this.userTransactionDetails.user_in_hand_cash = this.userTransactionDetails.user_in_hand_cash + Number(this.capital_details.added_capital_amount)
    this.userTransactionDetails.user_capital_amount_total=this.userTransactionDetails.user_capital_amount_total+Number(this.capital_details.added_capital_amount)
    this.appService.addOrUpdateUserTransactionDetails(this.userTransactionDetails).subscribe((response) => {
      console.log("Response", response)
      this.capital_details.added_capital_amount=0
    })
  }


  logout() {
    console.log("logout")
    if (window.confirm('Are you sure you want to Logout ?')) {
      this.appService.logout().subscribe(
        (data) => {
          this.router.navigate(['/login']);
        })
      localStorage.clear();
    }
  }

}
