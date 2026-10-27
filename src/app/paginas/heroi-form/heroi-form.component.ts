import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/heroi.service';
import { HeroiIn } from 'src/app/models/heroi.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-heroi-form',
  templateUrl: './heroi-form.component.html',
  styleUrls: ['./heroi-form.component.css']
})
export class HeroiFormComponent implements OnInit {
  isModoEdicao: boolean = false;
  heroiId: string | null = null;

  // Variável para controlar o input do tipo date (formato YYYY-MM-DD)
  dataNascimentoInput: string = '';

  heroiForm: HeroiIn = {
    nome: '',
    nomeHeroi: '',
    dataNascimento: '',
    altura: 0,
    peso: 0,
    superpoderes: []
  };

  superpoderesInputTexto: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.heroiId = this.route.snapshot.paramMap.get('id');
    if (this.heroiId) {
      this.isModoEdicao = true;
      this.carregarDadosEdicao(this.heroiId);
    }
  }

  carregarDadosEdicao(id: string): void {
    this.apiService.obterHeroiPorId(id).subscribe({
      next: (resposta: any) => {
        const dados = resposta.response || resposta;
        this.heroiForm = {
          nome: dados.nome,
          nomeHeroi: dados.nomeHeroi,
          dataNascimento: dados.dataNascimento,
          altura: dados.altura,
          peso: dados.peso,
          superpoderes: dados.superpoderes || []
        };

        // Formata a data recebida da API (ISO) para YYYY-MM-DD para exibir no calendário
        if (dados.dataNascimento) {
          this.dataNascimentoInput = new Date(dados.dataNascimento).toISOString().split('T')[0];
        }

        this.superpoderesInputTexto = this.heroiForm.superpoderes.join(', ');
      },
      error: (erro) => {
        console.error('Erro ao carregar dados para edição', erro);
        this.toastr.error('Erro ao carregar os dados do herói.');
      }
    });
  }

  salvarHeroi(): void {
    // 1. Converte a data do calendário (YYYY-MM-DD) para ISO String exigida pela API
    if (this.dataNascimentoInput) {
      this.heroiForm.dataNascimento = new Date(this.dataNascimentoInput).toISOString();
    }

    // 2. Processa os superpoderes
    if (this.superpoderesInputTexto) {
      this.heroiForm.superpoderes = this.superpoderesInputTexto
        .split(',')
        .map(p => p.trim())
        .filter(p => p.length > 0);
    } else {
      this.heroiForm.superpoderes = [];
    }

    if (this.isModoEdicao && this.heroiId) {
      this.apiService.atualizarHeroi(this.heroiId, this.heroiForm).subscribe({
        next: () => {
          this.toastr.success('Herói atualizado com sucesso!');
          this.router.navigate(['/herois']);
        },
        error: (erro) => {
          console.error('Erro ao atualizar herói', erro);
          this.toastr.error('Não foi possível atualizar o herói.');
        }
      });
    } else {
      this.apiService.cadastrarHeroi(this.heroiForm).subscribe({
        next: () => {
          this.toastr.success('Herói cadastrado com sucesso!');
          this.router.navigate(['/herois']);
        },
        error: (erro) => {
          console.error('Erro ao cadastrar herói', erro);
          this.toastr.error('Não foi possível cadastrar o herói.');
        }
      });
    }
  }
}