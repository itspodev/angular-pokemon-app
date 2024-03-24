import { Component, HostBinding, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon, Pokemons } from '../../entities/pokemonFr';
import { PokemonService } from '../../services/pokemon.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.scss',
})
export class PokedexComponent {
  @HostBinding('class')
  public class: string = 'container mx-auto';

  public pokemons$!: Observable<Pokemons>;

  @Input()
  public search?: string;

  constructor(
    private _pokemonService: PokemonService,
    private _ngbModal: NgbModal
  ) {
    this.refreshPokemons();
  }

  public refreshPokemons(): void {
    this.pokemons$ = this._pokemonService.getAllPokemons(this.search);
  }

  public showPokemon(pokemon: Pokemon): void {
    this._pokemonService.currentPokemon = pokemon;
    this._ngbModal.open(PokemonDetailsComponent, {
      centered: true,
      scrollable: true,
      animation: true,
    });
  }
}
