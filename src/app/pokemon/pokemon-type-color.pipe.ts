import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'pokemonTypeColor',
    standalone: true
})
export class PokemonTypeColorPipe implements PipeTransform {

  transform(type:string): string {
    let color: string;
    switch (type) {
      case 'Feu':
        color = 'bg-red-500';
        break;
      case 'Eau':
        color = 'bg-blue-500';
        break;
      case 'Plante':
        color = 'bg-green-500';
        break;
      case 'Insecte':
        color = 'bg-green-600';
        break;
      case 'Normal':
        color = 'bg-gray-400';
        break;
      case 'Vol':
        color = 'bg-gray-400';
        break;
      case 'Poison':
        color = 'bg-purple-700';
        break;
      case 'Fée':
        color = 'bg-pink-400';
        break;
      case 'Psy':
        color = 'bg-purple-700';
        break;
      case 'Electrik':
        color = 'bg-yellow-300';
        break;
      case 'Combat':
        color = 'bg-yellow-800';
        break;
      default:
        color = 'bg-grey-500';
        break;
    }
  
    return color;
  
  }
}
