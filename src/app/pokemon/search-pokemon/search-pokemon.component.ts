import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../Pokemon';
import { PokemonService } from '../pokemon.service';
import { Router } from '@angular/router';
import { AsyncSubject, Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-search-pokemon',
    templateUrl: './search-pokemon.component.html',
    standalone: true,
    imports:[AsyncPipe],
})
export class SearchPokemonComponent implements OnInit {
  searchTerms = new Subject<string>();
  pokemons$: Observable<Pokemon[]>;

  constructor(private router:Router, private pokemonService: PokemonService) {

  }

  ngOnInit() {
    this.pokemons$ = this.searchTerms.pipe(
      //attendre 300ms avant de faire une recherche (pas de recherche si tape trop vite)
      debounceTime(300),

      //attendre changement termes de recherche (pour faire des recherche differentes)
      distinctUntilChanged(),

      //resultat d'un observable
      switchMap((term) => this.pokemonService.searchPokemonList(term))

    )
  }

  search(term: string) {
    this.searchTerms.next(term)
    
  }

  goToDetailPokemon(pokemon:Pokemon) {
    const link = ['/pokemon', pokemon.id]
    this.router.navigate(link);
  }
}
