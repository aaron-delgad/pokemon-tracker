import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {PokemonListResponse} from "../models/pokemon-list.response";

@Injectable({
  providedIn: 'root',
})
export class PokemonApiService {
  private baseUrl = environment.apiPokemon.uri;


  private readonly http = inject(HttpClient);

  getPokemonList(): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(this.baseUrl + '/v2/pokemon?limit=20');
  }

  getPokemonDetail(id: string | null): Observable<any> {
    const url = '/v2/pokemon/{id}'.replace('{id}', String(id));
    return this.http.get<any>(this.baseUrl + url);
  }
}
