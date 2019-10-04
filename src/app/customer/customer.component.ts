import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '.././app.service';
import { CustomerDetails } from './../interfaces/customerDetails.interface';
declare var $: any;
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  user_name = localStorage.getItem('user_name');
  customerDetails = new CustomerDetails();
  public customers: any = [];

  add_update_cust = "Add Customer"
  constructor(private appService: AppService, private router: Router) {
    console.log("CustomerComponent constuctor()")
    if (localStorage.getItem('user_id') == undefined) {
      this.router.navigate(['/login'])
    }
  }

  ngOnInit() {
    this.customerDetails.user_id = localStorage.getItem('user_id');
    this.fetchCustomers();
  }



  fetchCustomers() {
    let user_id = { user_id: this.customerDetails.user_id };
    this.appService.fetchCustomers(user_id).subscribe((response: any) => {
      console.log("Result", response);
      if (response.length > 0) {
        this.customers = response
        this.customers.sort(function (a, b) {
          a = new Date(a.date);
          b = new Date(b.date);
          return a > b ? -1 : a < b ? 1 : 0;
        });
      }

    })
  }
  i_value = 0;

  addCustomer() {
    console.log("addCustomer", this.customerDetails)


    var today = Number(new Date())
    this.customerDetails.cust_id = today.toString();
    this.appService.addCustomer(this.customerDetails).subscribe((response) => {
      this.customers.push(this.customerDetails)
      console.log("response==adedd", response)
      this.customerDetails = new CustomerDetails();
      this.customerDetails.user_id = localStorage.getItem('user_id');
      $("#testmodal").modal('hide');
    })
  }

  updateCustomer() {
    console.log("update==>>", this.customerDetails)
    $("#testmodal").modal('hide');
    this.appService.updateCustomer(this.customerDetails).subscribe((response) => {
      if (response != null) {
        this.customers[this.i_value] = this.customerDetails;

        this.customerDetails = new CustomerDetails();
        this.customerDetails.user_id = localStorage.getItem('user_id');
      }
    })
  }


  addOrUpdateCustomer() {
    if (this.add_update_cust == "Update Customer") {
      this.updateCustomer()
    } else {
      this.addCustomer()
    }
  }

  showAddCustomer() {
    this.add_update_cust = "Add Customer";
    this.customerDetails = new CustomerDetails();
    this.customerDetails.user_id = localStorage.getItem('user_id');
    $("#testmodal").modal('show');
  }




  deleteCustomer(i, _cust_id) {
    if (window.confirm('Are you sure you want to delete this Customer ?')) {
      //put your delete method logic here

      console.log("deleteCustomer", i, _cust_id)
      var cust_id = { cust_id: _cust_id }
      this.appService.deleteCustomer(cust_id).subscribe((response) => {
        if (response != null) {
          console.log(this.customers)
          console.log(this.customers[i])
          // this.customers.pop(i)

          this.customers.splice(i, 1);
        }

      })
    }
  }
  showUpdateCustomer(i, cust_id) {
    this.i_value = i
    this.add_update_cust = "Update Customer";
    this.customerDetails = this.customers[i];
    $("#testmodal").modal('show');
  }

  showCustomer(i, cust_id,cust_name) {
    this.i_value = i
    this.add_update_cust = cust_name;
    this.customerDetails = this.customers[i];
    $("#customer_details_modal").modal('show');
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
