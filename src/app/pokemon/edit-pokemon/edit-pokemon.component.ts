import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../Pokemon';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { PokemonFormComponent } from '../pokemon-form/pokemon-form.component';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-edit-pokemon',
    template: `
      <h2 class="center">Editer {{ pokemon?.name }}</h2>
      @if(pokemon) {
          <p class="center">
          <img [src]="pokemon.picture">
        </p>
        <app-pokemon-form [pokemon]="pokemon"></app-pokemon-form>
      }
    `,
    styles: ``,
    standalone: true,
    imports: [PokemonFormComponent]
})
export class EditPokemonComponent implements OnInit {
  pokemon: Pokemon|undefined;

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService, private title: Title) { }

  ngOnInit(): void {
    const pokemonId: string|null = this.route.snapshot.paramMap.get('id');

    if(pokemonId) {
      this.pokemonService.getPokemonById(+pokemonId)
      .subscribe(pokemon => {
        this.pokemon = pokemon;
        this.InitTitle(pokemon);
      });
    } else {
      this.pokemon = undefined;
    }

  }

  InitTitle(pokemon: Pokemon|undefined) {
    if(!pokemon) {
      this.title.setTitle('Pokemon not found');
      return;
    }

    this.title.setTitle(pokemon.name);
  }
}
