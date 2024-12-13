import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule} from '@angular/forms';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../Pokemon';
import { Router } from '@angular/router';
import { PokemonTypeColorPipe } from '../pokemon-type-color.pipe';
import { LoaderComponent } from '../loader/loader.component';
import { NgForOf, NgIf } from "@angular/common";

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.css'],
  standalone: true,
  imports: [LoaderComponent, PokemonTypeColorPipe, NgIf, NgForOf, ReactiveFormsModule]
})
export class PokemonFormComponent implements OnInit {
  @Input() pokemon!: Pokemon;
  pokemonForm!: FormGroup;
  pokemonTypes: string[];
  isAddForm: boolean;

  constructor(
      private fb: FormBuilder,
      private pokemonService: PokemonService,
      private router: Router
  ) {}

  ngOnInit(): void {
    this.pokemonTypes = this.pokemonService.getPokemonTypeList();
    this.isAddForm = this.router.url.includes('create');

    this.pokemonForm = this.fb.group({
      name: ['',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9àéèç]{1,25}$')]
      ],
      picture: ['',
        this.isAddForm ? Validators.required : null
      ],
      hp: ['',
        [Validators.required, Validators.min(0), Validators.max(999)]
      ],
      cp: ['',
        [Validators.required, Validators.min(0), Validators.max(99)]
      ],
      types: this.fb.array(
          this.pokemon?.types || [],
          [Validators.required, Validators.minLength(1), Validators.maxLength(3)]
      )
    });
  }

  // Getter pour l'accès facile aux types
  get types(): FormArray {
    return this.pokemonForm.get('types') as FormArray;
  }

  hasType(type: string): boolean {
    return this.types.value.includes(type);
  }

  selectType(event: Event, type: string): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.types.push(this.fb.control(type));
    } else {
      const index = this.types.value.indexOf(type);
      if (index >= 0) {
        this.types.removeAt(index);
      }
    }
  }

  isTypesValid(type: string): boolean {
    const types = this.types.value;
    if (types.length === 1 && this.hasType(type)) {
      return false;
    }
    if (types.length >= 3 && !this.hasType(type)) {
      return false;
    }
    return true;
  }

  onSubmit(): void {
    if (this.pokemonForm.invalid) {
      console.log('Formulaire invalide !');
      return;
    }

    const formValues = this.pokemonForm.value;
    const updatedPokemon = { ...this.pokemon, ...formValues };

    if (this.isAddForm) {
      this.pokemonService.createPokemon(updatedPokemon).subscribe((pokemon) => {
        this.router.navigate(['/pokemon', pokemon.id]);
      });
    } else {
      this.pokemonService.updatePokemon(updatedPokemon).subscribe(() => {
        this.router.navigate(['/pokemon', this.pokemon.id]);
      });
    }
  }
}