import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ageCal'
})
export class DatePipePipe implements PipeTransform {

  transform(age: any): any {
    let dob = new Date(age);
    let month_diff = Date.now() - dob.getTime();
    let age_dt = new Date(month_diff); 
    let year = age_dt.getFullYear();
    let ageval = Math.abs(year - 1970);
    return ageval
  }

}
