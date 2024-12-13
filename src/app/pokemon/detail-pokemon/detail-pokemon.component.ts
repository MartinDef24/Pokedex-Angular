import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../Pokemon';
import { PokemonService } from '../pokemon.service';
import { PokemonTypeColorPipe } from '../pokemon-type-color.pipe';
import { LoaderComponent } from '../loader/loader.component';
import {DatePipe, NgIf} from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-detail-pokemon',
    templateUrl: './detail-pokemon.component.html',
    styles: ``,
    standalone: true,
    imports: [LoaderComponent, PokemonTypeColorPipe, DatePipe, NgIf]
})

export class DetailPokemonComponent implements OnInit {

  pokemonList: Pokemon[];
  pokemon: Pokemon | undefined;
  
  constructor(private route:ActivatedRoute, private router: Router, private pokemonService:PokemonService, private title: Title) {

  }

  ngOnInit() {
    const pokemonId: string|null = this.route.snapshot.paramMap.get('id');
    if(pokemonId) {
      this.pokemonService.getPokemonById(+pokemonId).subscribe((pokemon) =>  {
        this.pokemon = pokemon
        this.InitTitle(pokemon)
      });
    }
    
  }

  InitTitle(pokemon: Pokemon|undefined) {
    if(!pokemon) {
      this.title.setTitle('Pokemon not found');
      return;
    }

    this.title.setTitle(pokemon.name);
  }

  deletePokemon(pokemon: Pokemon) {
    this.pokemonService.deletePokemonById(pokemon.id)
    .subscribe(() => {
      this.goToPokedex()
    })
  }

  goToEditPokemon(pokemon: Pokemon) {
    this.router.navigate(['/pokemon/edit',pokemon.id]);
  }

  goToPokedex() {
    this.router.navigate(['/pokemons']);
  }

}
