import {computed, inject, Injectable, signal} from '@angular/core';
import {PokemonApiService} from "../service/pokemon-api.service";
import {LocalStorageService} from "../service/local-storage.service";
import {PokemonLocalState} from "../models/pokemon-local-state";
import {PokemonList} from "../models/pokemon-list.response";
import {ApiListState} from "../models/api-list-state";

@Injectable({
  providedIn: 'root',
})
export class PokemonStore {

  private readonly pokeapi = inject(PokemonApiService);
  private readonly storage = inject(LocalStorageService);

  private apiListState = signal<ApiListState[]>([]);
  private localDataState = signal<Record<number, PokemonLocalState>>({});

  isLoading = signal<boolean>(false);

  pokemons = computed(() => {
    const localCaptures = this.localDataState();
    console.log(this.apiListState().map(poke => ({
      ...poke,
      localData: localCaptures[poke.id] || null

    })));
    return this.apiListState().map(poke => ({
      ...poke,
      localData: localCaptures[poke.id] || null

    }));
  });

  async loadInitialData() {
    this.isLoading.set(true);
    const localData = await this.storage.getAllCaptures();
    this.pokeapi.getPokemonList().subscribe({
      next: data => {
        const mappedList: ApiListState[] = data.results.map((capt: PokemonList) => ({
          ...capt,
          id: this.extractIdFromUrl(capt.url),
        }));
        console.log(mappedList);
        this.apiListState.set(mappedList);
        this.localDataState.set(localData);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }

  async capture(id: number) {
      this.localDataState.update(state => ({
        ...state,
        [id]: { id, isCaptured: true, captureDate: new Date().toISOString(),}
      }));

      await this.storage.capturePokemon(id);
  }

  async remover(id: number) {
    this.localDataState.update(state => {
      const newState = { ...state };
      delete newState[id];
      return newState;
    });

    await this.storage.removerCapture(id);
  }

  private extractIdFromUrl(url: string): number {
    const parts = url.split('/').filter(Boolean);
    return parseInt(parts[parts.length - 1], 10);
  }
}
