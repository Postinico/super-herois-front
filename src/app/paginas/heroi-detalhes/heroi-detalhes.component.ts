import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/heroi.service';
import { HeroiDetalhes } from 'src/app/models/heroi.model';

@Component({
  selector: 'app-heroi-detalhes',
  templateUrl: './heroi-detalhes.component.html',
  styleUrls: ['./heroi-detalhes.component.css']
})
export class HeroiDetalhesComponent implements OnInit {
  heroiDetalhe: HeroiDetalhes = {} as HeroiDetalhes;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carregarDetalhes(id);
    }
  }

  carregarDetalhes(id: string): void {
    this.apiService.obterHeroiPorId(id).subscribe({
      next: (resposta) => {
        this.heroiDetalhe = resposta.response;
      },
      error: (erro) => {
        console.error('Erro ao carregar detalhes do herói', erro);
      }
    });
  }
}