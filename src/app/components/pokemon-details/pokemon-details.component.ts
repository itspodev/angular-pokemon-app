import { Component, HostBinding } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../entities/pokemonFr';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss',
})
export class PokemonDetailsComponent {
  faArrowRight = faArrowRight;
  faArrowLeft = faArrowLeft;

  public pokemon?: Pokemon;

  @HostBinding('class')
  public hostClass = 'p-3 bg-dark text-light';

  constructor(
    private _activeModal: NgbActiveModal,
    private _pokemonService: PokemonService
  ) {
    this.pokemon = _pokemonService.currentPokemon;
  }

  public closeModal(): void {
    this._activeModal.close();
  }

  public next(): void {
    this._pokemonService.setNextPokemon();
    this.pokemon = this._pokemonService.currentPokemon;
  }

  public previous(): void {
    this._pokemonService.setPreviousPokemon();
    this.pokemon = this._pokemonService.currentPokemon;
  }
}
