import { Pipe, PipeTransform } from '@angular/core';
import { CustomerTransactionDetails } from './interfaces/customerTransactionDetails.interface'
@Pipe({
  name: 'loanSearch'
})
export class LoanSearchPipe implements PipeTransform {

  transform(loans: CustomerTransactionDetails[], nameSearch?: string, ): CustomerTransactionDetails[] {
    console.log("LoanSearchPipe")
    if (!loans) return [];
    if (!nameSearch) return loans;
    nameSearch = nameSearch.toLocaleLowerCase();
    loans=loans.filter((user) => user.cust_name.toLowerCase().includes(nameSearch.toLowerCase())) 
    return loans;
  }


}
