import { Routes } from "@angular/router";
import { PokemonService } from "./pokemon.service";

export default [{
    path:'',        
    providers: [PokemonService],
    children: [
        { 
            path: 'pokemon/edit/:id', 
            loadComponent: () => import('./edit-pokemon/edit-pokemon.component').then(module => module.EditPokemonComponent), 
        },
        { 
            path: 'pokemon/create',
            title: 'Création de Pokemon', 
            loadComponent: () => import('./add-pokemon/add-pokemon.component').then(module => module.AddPokemonComponent), 
        },
        { 
            path: 'pokemon/:id', 
            loadComponent: () => import('./detail-pokemon/detail-pokemon.component').then(module => module.DetailPokemonComponent), 
        },
        { 
            path: 'pokemons', 
            title: 'Pokedex',
            loadComponent: () => import('./list-pokemon/list-pokemon.component').then(module => module.ListPokemonComponent), 
        },
    ]
}] as Routes;