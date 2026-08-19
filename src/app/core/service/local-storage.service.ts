import { Injectable } from '@angular/core';
import {PokemonLocalState} from "../models/pokemon-local-state";
import {Preferences} from "@capacitor/preferences";

const STORAGE_KEY = 'pokemon-capture-db';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  async getAllCaptures(): Promise<Record<number, PokemonLocalState>> {
    const { value } = await Preferences.get({key: STORAGE_KEY});
    return value ? JSON.parse(value) : {};
  }

  async capturePokemon(id: number): Promise<void> {
    const captures = await this.getAllCaptures();
    captures[id] = {
      id,
      isCaptured: true,
      captureDate: new Date().toISOString(),
    }

    await Preferences.set({key: STORAGE_KEY, value: JSON.stringify(captures)});
  }

  async removerCapture(id: number): Promise<void> {
    const captures = await this.getAllCaptures();

    if (captures[id]) {
      delete captures[id];
      await Preferences.set({key: STORAGE_KEY, value: JSON.stringify(captures)});
    }
  }

}
