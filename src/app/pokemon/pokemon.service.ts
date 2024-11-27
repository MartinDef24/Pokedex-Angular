import { Injectable } from '@angular/core';
import { Pokemon } from './Pokemon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable()

export class PokemonService {

  constructor(private httpclient: HttpClient) {}

  private log(response: any) {
    console.log(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.log(error);
    return of(errorValue);
  }

  createPokemon(pokemon:Pokemon):Observable<Pokemon> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type':  'application/json'})
    };

    return this.httpclient.post<Pokemon>('api/pokemons', pokemon, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error,undefined))
    )

  }

  updatePokemon(pokemon: Pokemon):Observable<null> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type':  'application/json'})
    };

    return this.httpclient.put('api/pokemons', pokemon, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error,undefined))
    );

  }

  deletePokemonById(pokemonId: number):Observable<null> {
    return this.httpclient.delete(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error,undefined))
    )
  }

  getPokemonList() : any {
    return this.httpclient.get<Pokemon[]>('api/pokemons').pipe(
      tap((pokemonList) => this.log(pokemonList)),
      catchError((error) => this.handleError(error, []))
    );
  }

  getPokemonById(id:number): Observable<Pokemon|undefined> {
    return this.httpclient.get<Pokemon>(`api/pokemons/${id}`).pipe(
      tap((pokemon) => this.log(pokemon)),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  getPokemonTypeList(): string[] {
    return ['Plante','Feu','Eau','Insecte','Normal','Electrik','Poison','Fée','Vol','Combat','Psy'];
  }

  searchPokemonList(term:string): Observable<Pokemon[]> {
    if(term.length <= 1) {
      //of return flux
      return of([]);
    }
    return this.httpclient.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
      tap((pokemon) => this.log(pokemon)),
      catchError((error) => this.handleError(error, []))
    )
  }
}
