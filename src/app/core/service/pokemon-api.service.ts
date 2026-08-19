import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class PokemonApiService {
  private baseUrl = environment.apiPokemon.uri;


  private readonly http = inject(HttpClient);

  getPokemonList(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/v2/pokemon?limit=20');
  }

  getPokemonDetail(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/v2/pokemon/{id}');
  }
}
