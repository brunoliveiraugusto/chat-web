import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'messageDate'
})
export class MessageDatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const hours = Math.floor(value/60);
    const minutesLeft = value % 60;
    return `${hours < 10 ? '0' : ''}${hours}:${minutesLeft < 10 ? '0': ''}${minutesLeft}:00`
  }

}
