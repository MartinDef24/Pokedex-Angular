import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../Pokemon';
import { PokemonFormComponent } from '../pokemon-form/pokemon-form.component';

@Component({
    selector: 'app-add-pokemon',
    template: `
    <div class="m-auto w-2/4 mb-5 mt-10 border-2 rounded-2xl">
        <h1 class=" text-center text-3xl mb-3 mt-5">Ajouter un pokémon</h1>
        <app-pokemon-form [pokemon]="pokemon"></app-pokemon-form>
    </div>
  `,
    standalone: true,
    imports: [PokemonFormComponent],
})
export class AddPokemonComponent implements OnInit {
  pokemon: Pokemon;

  ngOnInit() {
    this.pokemon = new Pokemon();
  }
}
