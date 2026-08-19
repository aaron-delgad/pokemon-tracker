import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar,
  IonContent,
  IonHeader, IonIcon,
  IonItem, IonLabel,
  IonList,
  IonSpinner, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {PokemonStore} from "../../core/state/pokemon.store";
import {addIcons} from "ionicons";
import {radioButtonOffOutline, radioButtonOnOutline} from "ionicons/icons";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.page.html',
  styleUrls: ['./pokemon-list.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonSpinner, IonList, IonItem, IonAvatar, IonLabel, IonText, IonIcon]
})
export class PokemonListPage {

  readonly storage = inject(PokemonStore);
  readonly router = inject(Router);
  constructor() {
    addIcons({ radioButtonOffOutline, radioButtonOnOutline });
  }

  async ionViewWillEnter() {
    await this.storage.loadInitialData();
  }

  goPokemonDetail(id: number) {
    this.router.navigate(['/pokemon-detail', id]);
  }

}
