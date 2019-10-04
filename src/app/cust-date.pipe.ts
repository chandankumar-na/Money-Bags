import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
@Pipe({
  name: 'custDate'
})
export class CustDatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let tomorrow = new Date(value);
    tomorrow.setDate(tomorrow.getDate() + args);
    return tomorrow;
  }



}
