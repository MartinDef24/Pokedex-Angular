import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardColor',
  standalone: true
})

export class CardColorPipe implements PipeTransform {

  transform(type:string): unknown {
    let color: string;
    switch (type) {
      case 'Feu':
        color = 'red';
        break;
      case 'Eau':
        color = 'blue';
        break;
      case 'Plante':
        color = 'green';
        break;
      case 'Insecte':
        color = 'brown';
        break;
      case 'Normal':
        color = 'grey';
        break;
      case 'Vol':
        color = 'blue';
        break;
      case 'Poison':
        color = 'purple';
        break;
      case 'Fée':
        color = 'pink';
        break;
      case 'Psy':
        color = 'deep-purple';
        break;
      case 'Electrik':
        color = 'yellow';
        break;
      case 'Combat':
        color = 'deep-orange';
        break;
      default:
        color = 'grey';
        break;
    }

    return color;
  }

}
