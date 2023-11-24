import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { DeleteHeroiOut, ObterHeroiOut, ObterIdHeroiOut, PostHeroiIn, PostHeroiOut, PutHeroiIn, PutHeroiOut } from "../models/heroi.model";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class HeroiService {

    protected urlApi: string = environment.urlApi;

    constructor(private http: HttpClient) { }

    get(): Observable<ObterHeroiOut> {
        let url = `${this.urlApi}heroi`;
        return this.http.get<ObterHeroiOut>(url);
    }

    getId(id: number): Observable<ObterIdHeroiOut> {
        let url = `${this.urlApi}heroi/${id}`
        return this.http.get<ObterIdHeroiOut>(url);
    }

    post(heroi: PostHeroiIn): Observable<PostHeroiOut> {
        let url = `${this.urlApi}heroi`
        return this.http.post<PostHeroiOut>(url, heroi)
    }

    put(id: number, heroi: PutHeroiIn): Observable<PutHeroiOut> {
        let url = `${this.urlApi}heroi/alterar/${id}`
        return this.http.put<PutHeroiOut>(url, heroi)
    }

    delete(id: number): Observable<DeleteHeroiOut> {
        let url = `${this.urlApi}heroi/deletar/${id}`
        return this.http.delete<DeleteHeroiOut>(url)
    }

}

