import { Injectable } from '@angular/core';
import { Pokemon, Pokemons } from '../entities/pokemonFr';
import { PokemonApiService } from './pokemon-api.service';
import { Observable, map } from 'rxjs';

@Injectable()
export class PokemonService {
  private _currentPokemon?: Pokemon;
  public allPokemons?: Pokemons;
  public allFilteredPokemons?: Pokemons;

  constructor(private _pokemonAPIService: PokemonApiService) {}

  public set currentPokemon(value: Pokemon) {
    this._currentPokemon = value;

    if (this.allPokemons) {
      this.allPokemons.forEach((p) => (p.selected = false));
    }

    if (this._currentPokemon != undefined) {
      this._currentPokemon.selected = true;
    }
  }

  public get currentPokemon(): Pokemon | undefined {
    return this._currentPokemon;
  }

  public get displayedPokemons(): Pokemons {
    return this.allFilteredPokemons || this.allPokemons || [];
  }

  public setNextPokemon(): void {
    const pokemons: Pokemons = this.displayedPokemons;
    let index: number = pokemons.findIndex((p) => p == this.currentPokemon);
    if (index < 0) {
      throw 'Pokemon index not found';
    }

    if (index + 1 == pokemons.length) {
      index = 0;
    } else {
      index++;
    }

    this.currentPokemon = pokemons[index];
  }

  public setPreviousPokemon(): void {
    const pokemons: Pokemons = this.displayedPokemons;
    let index: number = pokemons.findIndex((p) => p == this.currentPokemon);
    if (index < 0) {
      throw 'Pokemon index not found';
    }

    if (index == 0) {
      index = pokemons.length - 1;
    } else {
      index--;
    }

    this.currentPokemon = pokemons[index];
  }

  public getAllPokemons(search?: string): Observable<Pokemons> {
    return this._pokemonAPIService.getAllPokemons(search).pipe(
      map((pokemons: Pokemons) => {
        if (search == null) {
          this.allPokemons = pokemons;
          this.allFilteredPokemons = undefined;
        } else {
          this.allFilteredPokemons = pokemons;
        }
        return pokemons;
      })
    );
  }
}
