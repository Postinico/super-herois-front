import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, PagedResult, HeroiListItem, HeroiDetalhes, HeroiIn } from 'src/app/models/heroi.model';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://localhost:7177/api/v1';

  constructor(private http: HttpClient) {}

  obterHerois(pagina: number = 1, tamanho: number = 20): Observable<ApiResponse<PagedResult<HeroiListItem>>> {
    return this.http.get<ApiResponse<PagedResult<HeroiListItem>>>(`${this.apiUrl}/herois?Pagina=${pagina}&Tamanho=${tamanho}`);
  }

  obterHeroiPorId(id: string): Observable<ApiResponse<HeroiDetalhes>> {
    return this.http.get<ApiResponse<HeroiDetalhes>>(`${this.apiUrl}/herois/${id}`);
  }

  cadastrarHeroi(hero: HeroiIn): Observable<ApiResponse<HeroiDetalhes>> {
    return this.http.post<ApiResponse<HeroiDetalhes>>(`${this.apiUrl}/herois`, hero);
  }

  atualizarHeroi(id: string, hero: HeroiIn): Observable<ApiResponse<HeroiDetalhes>> {
    return this.http.put<ApiResponse<HeroiDetalhes>>(`${this.apiUrl}/herois/${id}`, hero);
  }

  deletarHeroi(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/herois/${id}`, { responseType: 'text' });
  }

  ativarHeroi(id: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/herois/ativar/${id}`, {}, { responseType: 'text' });
  }
}