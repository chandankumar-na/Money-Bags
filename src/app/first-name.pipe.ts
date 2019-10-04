import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstName'
})
export class FirstNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    
    var name= value.split(' ')[0]
    
    return name;
  }

}
