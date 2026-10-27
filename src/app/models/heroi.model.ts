// src/app/models.ts

export interface ApiResponse<T> {
  isSuccess: boolean;
  isFailure: boolean;
  error: string;
  response: T;
}

export interface PagedResult<T> {
  items: T[];
  pagina: number;
  tamanho: number;
  total: number;
}

export interface HeroiListItem {
  id: string;
  nomeHeroi: string;
  ativo: boolean;
  superpoderes: string[];
}

export interface HeroiDetalhes {
  id: string; 
  nome: string;
  nomeHeroi: string;
  dataNascimento: string;
  altura: number;
  peso: number;
  superpoderes: string[];
}

export interface HeroiIn {
  nome: string;
  nomeHeroi: string;
  dataNascimento: string;
  altura: number;
  peso: number;
  superpoderes: string[];
}