import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '.././app.service';
import { UserTransactionDetails } from './../interfaces/userTransactionDetails.interface';
import { CustomerDetails } from './../interfaces/customerDetails.interface';
import { CustomerTransactionDetails } from './../interfaces/customerTransactionDetails.interface';
import { DeviceDetectorService } from 'ngx-device-detector';
import { HttpClient } from '@angular/common/http';
declare var $: any;
@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {
  public loans: any = []
  public instalments: any = [];
  public customers: any = [];
  user_name = localStorage.getItem('user_name');
  tday = new Date();
  customerDetails = new CustomerDetails();
  customerTransactionDetails = new CustomerTransactionDetails();
  userTransactionDetails = new UserTransactionDetails()
  MAIN_ACCOUNT_BALANCE = 0
  selected_cust_id: any;

  private query = "";
  search_query = ""
  private searchRes: CustomerDetails[] = [];
  ipAddress: any;
  device_details: any
  constructor(private appService: AppService, private router: Router, private http: HttpClient, private deviceService: DeviceDetectorService) {


    this.http.get<{ ip: string }>('https://api.ipify.org?format=json')
      .subscribe(data => {
        console.log('th data', data);
        this.ipAddress = data.ip
      })
    var deviceInfo = this.deviceService.getDeviceInfo();
    console.log(deviceInfo);
    this.device_details = deviceInfo


  }

  ngOnInit() {
    // to fetch all the cust transction details of a
    this.fetchLoans();
    this.fetchUserTransactionDetails();

  }
  bal_error = ""
  addeLoan() {
    console.log("addeLoan()", this.userTransactionDetails.user_in_hand_cash, ">", (this.customerTransactionDetails.cust_tran_amount - ((this.customerTransactionDetails.cust_tran_interest * this.customerTransactionDetails.cust_tran_amount) / 100)))


    if (this.userTransactionDetails.user_in_hand_cash > (this.customerTransactionDetails.cust_tran_amount - ((this.customerTransactionDetails.cust_tran_interest * this.customerTransactionDetails.cust_tran_amount) / 100))) {
      console.log("done")

      if (this.customerTransactionDetails.cust_tran_date == undefined) {
        this.customerTransactionDetails.cust_tran_date = new Date();
      }
      var start_date = new Date()
      start_date.setMonth(new Date(this.customerTransactionDetails.cust_tran_date).getMonth())
      start_date.setFullYear(new Date(this.customerTransactionDetails.cust_tran_date).getFullYear())
      start_date.setDate(new Date(this.customerTransactionDetails.cust_tran_date).getDate() + 1)

      this.customerTransactionDetails.cust_tran_start_date = start_date

      this.customerTransactionDetails.cust_tran_balance = Number(this.customerTransactionDetails.cust_tran_amount);

      var end_date = new Date();
      end_date.setDate(new Date(this.customerTransactionDetails.cust_tran_date).getDate() + this.customerTransactionDetails.cust_tran_total_instalments);
      this.customerTransactionDetails.cust_tran_end_date = end_date
      this.customerTransactionDetails.cust_tran_monthly_amount = this.customerTransactionDetails.cust_tran_amount / this.customerTransactionDetails.cust_tran_total_instalments;
      this.customerTransactionDetails.cust_name = this.query
      this.customerTransactionDetails.cust_id = this.selected_cust_id;
      this.customerTransactionDetails.cust_tran_interest = (this.customerTransactionDetails.cust_tran_interest * this.customerTransactionDetails.cust_tran_amount) / 100;
      var full_paid_flags = []
      for (let i = 1; i <= this.customerTransactionDetails.cust_tran_total_instalments; i++) {
        full_paid_flags.push('Pay')
      }
      this.customerTransactionDetails.cust_tran_instalment_dates = new Array(this.customerTransactionDetails.cust_tran_total_instalments);
      this.customerTransactionDetails.cust_tran_paid_flags = full_paid_flags;
      this.customerTransactionDetails.cust_tran_ip_address = new Array(this.customerTransactionDetails.cust_tran_total_instalments)
      this.appService.addeLoan(this.customerTransactionDetails).subscribe((response) => {
        this.loans.push(this.customerTransactionDetails)
        // console.log("addeLoan=>response==adedd", response)
        this.loans.sort(function (a, b) {
          a = new Date(a.cust_tran_date);
          b = new Date(b.cust_tran_date);
          return a > b ? -1 : a < b ? 1 : 0;
        });

        this.userTransactionDetails.user_capital_amount_profit = this.userTransactionDetails.user_capital_amount_profit + this.customerTransactionDetails.cust_tran_interest;
        this.userTransactionDetails.user_in_hand_cash = Number(this.userTransactionDetails.user_in_hand_cash) - (Number(this.customerTransactionDetails.cust_tran_amount) - Number(this.customerTransactionDetails.cust_tran_interest))
        this.userTransactionDetails.user_get_owes_amount = Number(this.userTransactionDetails.user_get_owes_amount) + Number(this.customerTransactionDetails.cust_tran_amount);

        this.updateUserTransactionDetails();


        $("#testmodal").modal('hide');


      })

    } else {
      console.log("Low Balance")
      this.bal_error = "Low Balance"
    }
  }


  selectedCustId(id, name) {
    this.selected_cust_id = id
    this.query = name;
    console.log(" this.selected_cust_id", this.selected_cust_id, name)
  }


  deleteLoan(i, _cust_tran_id) {
    if (window.confirm('Are you sure you want to delete this Item ?')) {
      //put your delete method logic here

      // console.log("deleteCustomer", i, _cust_tran_id)
      var cust_tran_id = { "cust_tran_id": _cust_tran_id }

      this.customerTransactionDetails=this.loans[i]

      this.userTransactionDetails.user_capital_amount_profit = this.userTransactionDetails.user_capital_amount_profit - this.customerTransactionDetails.cust_tran_interest;
      this.userTransactionDetails.user_in_hand_cash = Number(this.userTransactionDetails.user_in_hand_cash) + (Number(this.customerTransactionDetails.cust_tran_amount) - Number(this.customerTransactionDetails.cust_tran_interest))
      this.userTransactionDetails.user_get_owes_amount = Number(this.userTransactionDetails.user_get_owes_amount) - Number(this.customerTransactionDetails.cust_tran_amount);


      this.appService.deleteLoan(cust_tran_id).subscribe((response) => {
        if (response != null) {
          // console.log(this.loans)
          // console.log(this.loans[i])
          // this.customers.pop(i)
          this.loans.splice(i, 1);
          this.updateUserTransactionDetails();
        }

      })
    }
  }


  fetchLoans() {
    let user_id = { user_id: localStorage.getItem('user_id') };
    this.appService.fetchLoans(user_id).subscribe((response: any) => {
      // console.log("Result", response);
      if (response.length > 0) {
        this.loans = response
        this.loans.sort(function (a, b) {
          a = new Date(a.cust_tran_date);
          b = new Date(b.cust_tran_date);
          return a > b ? -1 : a < b ? 1 : 0;
        });
      }
    })
  }

  showAddLoan() {
    console.log("showAddLoan()")

    this.query = ""
    this.customerTransactionDetails = new CustomerTransactionDetails();

    this.customerTransactionDetails.user_id = localStorage.getItem('user_id');
    var today = Number(new Date())
    this.customerTransactionDetails.cust_tran_id = today.toString();
    this.customerTransactionDetails.cust_tran_total_instalments = 100;
    this.customerTransactionDetails.cust_tran_interest = 15;

    this.fetchCustomers();
    $("#testmodal").modal('show');
  }



  fetchCustomers() {
    let user_id = { user_id: localStorage.getItem('user_id') };
    this.appService.fetchCustomers(user_id).subscribe((response: any) => {
      // console.log("Result", response);
      if (response.length > 0) {
        this.customers = response
        this.customers.sort(function (a, b) {
          a = new Date(a.date);
          b = new Date(b.date);
          return a > b ? -1 : a < b ? 1 : 0;
        });

        this.searchRes = this.customers
      }

    })
  }

  fetchUserTransactionDetails() {
    console.log("fetchUserTransactionDetails")
    this.appService.fetchUserTransactionDetails(localStorage.getItem('user_id')).subscribe((response: any) => {
      console.log("Response", response)
      if (response.length > 0) {
        console.log("Response if ")
        this.userTransactionDetails = response[0];
        // this=MAIN_ACCOUNT_BALANCE
      } else {
        console.log("Response else")
      }

    })
  }

  payOrPaid(i, i2, _old_date, cust_tran_id, amount, flag) {
    console.log("payOrPaid()")
    console.log(this.userTransactionDetails)
    if (flag == 'Pay') {
      if (window.confirm('Are you sure you want to Pay this instalment?')) {
        this.loans[i].cust_tran_paid_instalments = Number(this.loans[i].cust_tran_paid_instalments) + 1;
        this.loans[i].cust_tran_balance = Number(this.loans[i].cust_tran_balance) - Number(amount);

        this.loans[i].cust_tran_paid_flags[i2] = 'Paid';
        this.loans[i].cust_tran_instalment_dates[i2] = new Date;

        if (this.device_details.os != 'iOS' && this.device_details.os == 'android') {
          this.loans[i].cust_tran_ip_address[i2] = 'A'
        } else if (this.device_details.os == 'iOS' && this.device_details.browser == 'Chrome') {
          this.loans[i].cust_tran_ip_address[i2] = 'C'
        }
        else {
          this.loans[i].cust_tran_ip_address[i2] = 'A'
        }
        console.log("inside pay=>", this.loans[i].cust_tran_paid_flags[i2])
        this.customerTransactionDetails = this.loans[i];

        this.userTransactionDetails.user_get_owes_amount = Number(this.userTransactionDetails.user_get_owes_amount) - Number(this.customerTransactionDetails.cust_tran_monthly_amount)
        this.userTransactionDetails.user_in_hand_cash = Number(this.userTransactionDetails.user_in_hand_cash) + Number(this.customerTransactionDetails.cust_tran_monthly_amount)

        this.updateLoan()

      }
    } else {
      if (window.confirm('Are you sure you want to Unpay this instalment?')) {
        this.loans[i].cust_tran_paid_instalments = Number(this.loans[i].cust_tran_paid_instalments) - 1;
        this.loans[i].cust_tran_balance = Number(this.loans[i].cust_tran_balance) + Number(amount);

        this.loans[i].cust_tran_paid_flags[i2] = 'Pay';
        this.loans[i].cust_tran_instalment_dates[i2] = null;
        this.loans[i].cust_tran_ip_address[i2] = null

        // console.log("inside paid=>", this.loans[i].cust_tran_paid_flags[i2])

        this.customerTransactionDetails = this.loans[i];



        this.userTransactionDetails.user_get_owes_amount = Number(this.userTransactionDetails.user_get_owes_amount) + Number(this.customerTransactionDetails.cust_tran_monthly_amount)
        this.userTransactionDetails.user_in_hand_cash = Number(this.userTransactionDetails.user_in_hand_cash) - Number(this.customerTransactionDetails.cust_tran_monthly_amount)

        this.updateLoan()
      }
    }
    console.log("flag=>", flag)


  }

  updateLoan() {
    console.log("Update")
    this.appService.updateLoan(this.customerTransactionDetails).subscribe((response: any) => {
      console.log("cust tran done now updating user tran", response)
      this.updateUserTransactionDetails();
    })
  }

  //once loan added to update balance into user account
  updateUserTransactionDetails() {
    console.log("updateUserTransactionDetails()")
    this.appService.addOrUpdateUserTransactionDetails(this.userTransactionDetails).subscribe((response: any) => {
      console.log("Response", response)
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
