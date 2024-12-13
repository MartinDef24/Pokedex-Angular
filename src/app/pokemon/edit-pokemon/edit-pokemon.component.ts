import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../Pokemon';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { PokemonFormComponent } from '../pokemon-form/pokemon-form.component';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-edit-pokemon',
    template: `
        <div class="m-auto border-2 w-3/4 my-5 rounded-2xl">
            <h2 class="text-center my-3 text-3xl">Editer {{ pokemon?.name }}</h2>
            @if(pokemon) {
                <img class="m-auto" [src]="pokemon.picture">
                <app-pokemon-form [pokemon]="pokemon"></app-pokemon-form>
            }
        </div>
        
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