import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse   } from '@angular/common/http';

import { UserDetails } from "././interfaces/userDetails.interface";
import { CustomerDetails } from "././interfaces/customerDetails.interface";
import { UserTransactionDetails } from '././interfaces/userTransactionDetails.interface';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  // baseURL = 'http://localhost:3000';
  baseURL="https://money-bags.herokuapp.com";

  authorized: boolean;

  constructor(private http: HttpClient) { }

  // For login component
  login(user: UserDetails) {
    const body = JSON.stringify(user);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseURL}/api/login`, body, { headers: headers })
  }

  logout() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.baseURL}/api/logout`, { headers: headers })
  }

  register(user: UserDetails) {
    const body = JSON.stringify(user);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseURL}/api/register`, body, { headers: headers })
  }
  // /For login component

 //Get IP Adress using http://freegeoip.net/json/?callback
 getIpAddress() {
  return this.http
        .get('http://freegeoip.net/json/?callback')
        .map(response => response || {})
        .catch(this.handleError);
}  private handleError(error: HttpErrorResponse):
Observable<any> {
  //Log error in the browser console
  console.error('observable error: ', error);
  return Observable.throw(error);
}
  // fetchUserDetails(_user_id:any) {
  //   const body = JSON.stringify({user_id:_user_id});
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.post(`${this.baseURL}/api/fetchUserDetails`, body, { headers: headers })
  // }

  // updateUserDetails(userDetails:UserDetails) {
  //   const body = JSON.stringify(userDetails);
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.post(`${this.baseURL}/api/updateUserDetails`, body, { headers: headers })
  // }



  fetchUserTransactionDetails(_user_id: any) {
    const body = JSON.stringify({ user_id: _user_id });
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseURL}/api/fetchUserTransactionDetails`, body, { headers: headers })
  }


  addOrUpdateUserTransactionDetails(userTransactionDetails: UserTransactionDetails) {
    const body = JSON.stringify(userTransactionDetails);
    console.log("addOrUpdateUserTransactionDetails=>", body)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseURL}/api/addOrUpdateUserTransactionDetails`, body, { headers: headers })
  }

  fetchCustomers(user_id) {
    const body = JSON.stringify(user_id);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseURL}/api/fetchCustomers`, body, { headers: headers })
  }

  addCustomer(customerDetails: CustomerDetails) {
    const body = JSON.stringify(customerDetails);
    // console.log("addToDo()"+body)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseURL}/api/addCustomer`, body, { headers: headers })
  }

  updateCustomer(customerDetails: CustomerDetails) {
    const body = JSON.stringify(customerDetails);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseURL}/api/updateCustomer`, body, { headers: headers })
  }
  deleteCustomer(cust_id:any) {
    const body = JSON.stringify(cust_id);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseURL}/api/deleteCustomer`, body, { headers: headers })
  }

  addeLoan(customerTransactionDetails: any) {
    const body = JSON.stringify(customerTransactionDetails);
    // console.log("addToDo()"+body)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseURL}/api/addeLoan`, body, { headers: headers })
  }
  deleteLoan(cust_tran_id:any) {
    const body = JSON.stringify(cust_tran_id);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseURL}/api/deleteLoan`, body, { headers: headers })
  }


  fetchLoans(user_id) {
    const body = JSON.stringify(user_id);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseURL}/api/fetchLoans`, body, { headers: headers })
  }

  updateLoan(customerTransactionDetails: any) {
    const body = JSON.stringify(customerTransactionDetails);
    console.log("service updateLoan()",customerTransactionDetails)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseURL}/api/updateLoan`, body, { headers: headers })
  }


}
