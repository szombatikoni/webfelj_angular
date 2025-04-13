import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'ftkg',
  standalone: true
})
export class FtKgPipe implements PipeTransform {
  transform(value: number): string {
    return value+' Ft/Kg';
  }
}
