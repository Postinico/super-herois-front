import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";
import { ObterSuperpoderOut, PostSuperpoderIn, PostSuperpoderOut } from "../models/superpoder.model";
import { Observable } from "rxjs";
import { PostHeroiOut } from "../models/heroi.model";

@Injectable({
    providedIn: 'root'
  })
export class SuperpoderService {

    protected urlApi: string = environment.urlApi;

    constructor(private http: HttpClient) { }

    get(): Observable<ObterSuperpoderOut> {
        let url = `${this.urlApi}superpoder`;
        return this.http.get<ObterSuperpoderOut>(url);
    }

    // getId(id: number): Observable<ObterIdHeroiOut> {
    //     let url = `${this.urlApi}/superpoder/${id}`
    //     return this.http.get<ObterIdHeroiOut>(url);
    // }

    post(superpoder: PostSuperpoderIn): Observable<PostSuperpoderOut> {
        let url = `${this.urlApi}superpoder`
        return this.http.post<PostSuperpoderOut>(url, superpoder)
    }

    // put(id: number, heroi: PutHeroiIn): Observable<PutHeroiOut> {
    //     let url = `${this.urlApi}/superpoder/${id}`
    //     return this.http.post<PutHeroiOut>(url, heroi)
    // }

    // delete(id: number): Observable<DeleteHeroiOut> {
    //     let url = `${this.urlApi}/superpoder/${id}`
    //     return this.http.delete<DeleteHeroiOut>(url)
    // }
}