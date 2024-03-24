import { Injectable } from '@angular/core';
import { Pokemons } from '../entities/pokemonFr';
import { Observable, catchError, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PokemonApiService {
  private _pokemonFrUrl: string = 'https://pokebuildapi.fr/api/v1/pokemon';

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
      catchError((e) => {
        console.error(e);
        return of([]);
      })
    );
  }
}
