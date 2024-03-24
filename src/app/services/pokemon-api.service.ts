import { Injectable } from '@angular/core';
import { Pokemon, Pokemons } from '../entities/pokemonFr';
import { Observable, catchError, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PokemonApiService {
  private _pokemonFrUrl: string = 'https://pokebuildapi.fr/api/v1/pokemon';

  private _pokemonEnUrl: string = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private _httpClient: HttpClient) {}

  public getAllPokemons(search?: string): Observable<Pokemons> {
    return this._httpClient.get<Pokemons>(this._pokemonFrUrl).pipe(
      map((pokemons: Pokemons | null) => {
        if (pokemons == null) {
          return [];
        }
        return pokemons.filter(
          (p) =>
            search == null ||
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.apiTypes
              .map((t) => t.name.toLocaleLowerCase())
              .includes(search.toLowerCase())
        );
      }),
      map((pokemonsFiltres: Pokemons) => {
        for (let pokemon of pokemonsFiltres) {
          pokemon.cry$ = this.getPokemonCry(pokemon);
        }
        return pokemonsFiltres;
      }),
      catchError((e) => {
        console.error(e);
        return of([]);
      })
    );
  }

  private getPokemonCry(pokemon: Pokemon): Observable<string | null> {
    return this._httpClient.get(`${this._pokemonEnUrl}/${pokemon.id}`).pipe(
      map((p: any) => p.cries.latest),
      catchError((e) => {
        console.error(e);
        return of(null);
      })
    );
  }
}
