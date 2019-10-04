import { Pipe, PipeTransform } from '@angular/core';
import { CustomerDetails } from './interfaces/customerDetails.interface'
@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {


  transform(users: CustomerDetails[], nameSearch?: string, ): CustomerDetails[] {
    if (!users) return [];
    if (!nameSearch) return users;
    nameSearch = nameSearch.toLocaleLowerCase();
    users=users.filter((user) => user.cust_name.toLowerCase().includes(nameSearch.toLowerCase())) 
    return users;
  }

}
