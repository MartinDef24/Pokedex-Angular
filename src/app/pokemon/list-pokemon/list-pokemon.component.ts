import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../Pokemon';
import { Router } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { PokemonTypeColorPipe } from '../pokemon-type-color.pipe';
import { LoaderComponent } from '../loader/loader.component';
import { BorderCardDirective } from '../border-card.directive';
import { SearchPokemonComponent } from '../search-pokemon/search-pokemon.component';
import {DatePipe, NgForOf} from '@angular/common';
import {CardColorPipe} from "../../card-color.pipe";

@Component({
    selector: 'app-list-pokemon',
    templateUrl: './list-pokemon.component.html',
    standalone: true,
    imports: [
        SearchPokemonComponent,
        BorderCardDirective,
        LoaderComponent,
        PokemonTypeColorPipe,
        DatePipe,
        NgForOf,
        CardColorPipe,
    ],
})
export class ListPokemonComponent implements OnInit {
  pokemonList: Pokemon[];

  constructor(private router: Router, private pokemonService: PokemonService) {}

  gotoPokemon(pokemon: Pokemon) {
    this.router.navigate(['/pokemon',pokemon.id]);
  }

  gotoCreatePokemon() {
    this.router.navigate(['/pokemon/create']);
    
  }

  ngOnInit() {
    this.pokemonService.getPokemonList()
    .subscribe(pokemons => this.pokemonList = pokemons)
  }


}
