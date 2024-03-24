import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { AlertComponent } from './core/components/alert/alert.component';
import { PokemonApiService } from './services/pokemon-api.service';
import { PokemonService } from './services/pokemon.service';

@NgModule({
  declarations: [AppComponent, PokedexComponent, PokemonDetailsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    AlertComponent,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [provideAnimationsAsync(), PokemonApiService, PokemonService],
  bootstrap: [AppComponent],
})
export class AppModule {}
