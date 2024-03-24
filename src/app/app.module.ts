import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from './core/components/alert/alert.component';
import { PokemonApiService } from './services/pokemon-api.service';
import { PokemonService } from './services/pokemon.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, PokedexComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    AlertComponent,
    HttpClientModule,
  ],
  providers: [provideAnimationsAsync(), PokemonApiService, PokemonService],
  bootstrap: [AppComponent],
})
export class AppModule {}
