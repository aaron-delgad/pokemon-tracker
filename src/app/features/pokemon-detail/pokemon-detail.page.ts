import {Component, computed, inject, input, numberAttribute, OnInit, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonBackButton, IonButton,
  IonButtons,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonContent, IonFooter,
  IonHeader, IonIcon, IonSpinner,
  IonTitle,
  IonToolbar, NavController
} from '@ionic/angular/standalone';
import {toObservable, toSignal} from "@angular/core/rxjs-interop";
import {catchError, switchMap} from "rxjs/operators";
import {PokemonApiService} from "../../core/service/pokemon-api.service";
import {of} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {PokemonStore} from "../../core/state/pokemon.store";
import {addIcons} from "ionicons";
import {apertureOutline, trashOutline} from "ionicons/icons";

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.page.html',
  styleUrls: ['./pokemon-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSpinner, IonFooter, IonButton, IonIcon]
})
export class PokemonDetailPage {

  private readonly pokemonApiService = inject(PokemonApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(PokemonStore);
  private readonly navCtrl = inject(NavController);
  constructor() {
    addIcons({ trashOutline, apertureOutline });
  }

  pokemonId = computed(() => this.route.snapshot.paramMap.get('id'));
  pokemonDetail = signal<any>({})

  isCapture = computed(() => {
    const id = Number(this.pokemonId());
    const pokemon = this.store.pokemons().find(pokemon => pokemon.id === id);
    return !!pokemon?.localData?.isCaptured;
  })

  ionViewWillEnter(): void {
      this.pokemonApiService.getPokemonDetail(this.pokemonId()).subscribe({
        next: poke => {
          this.pokemonDetail.set(poke);
        },
        error: () => {
          console.error('Pokemon detail could not be found');
        }
      });
  }

  async capture() {
      await this.store.capture(Number(this.pokemonId()));
  }

  async remove() {
      await this.store.remover(Number(this.pokemonId()));
      this.navCtrl.back();
  }
}
