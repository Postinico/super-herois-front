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
  dataNascimentoInput: string = '';

  // Controle de quadros e limites
  quadroSelecionado: 'aura' | 'procrastinacao' | null = null;
  readonly maxPoderes: number = 3;

  // Listas de Superpoderes
  poderesAura: string[] = [
    'Paz',
    'Amor',
    'Bem',
    'Caridade',
    'Perseverança',
    'Empatia'
  ];

  poderesProcrastinacao: string[] = [
    'Foco Absoluto',
    'Disciplina',
    'Ação Imediata',
    'Constância',
    'Clareza Mental',
    'Determinação'
  ];

  heroiForm: HeroiIn = {
    nome: '',
    nomeHeroi: '',
    dataNascimento: '',
    altura: 0,
    peso: 0,
    superpoderes: []
  };

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

  // Alterna o quadro escolhido e limpa os poderes anteriores
  selecionarQuadro(quadro: 'aura' | 'procrastinacao'): void {
    if (this.quadroSelecionado !== quadro) {
      this.quadroSelecionado = quadro;
      this.heroiForm.superpoderes = [];
    }
  }

  // Verifica se o poder está selecionado
  isPoderSelecionado(poder: string): boolean {
    return this.heroiForm.superpoderes.includes(poder);
  }

  // Adiciona ou remove o poder respeitando o limite de 3
  alternarPoder(poder: string): void {
    const index = this.heroiForm.superpoderes.indexOf(poder);

    if (index > -1) {
      this.heroiForm.superpoderes.splice(index, 1);
    } else {
      if (this.heroiForm.superpoderes.length < this.maxPoderes) {
        this.heroiForm.superpoderes.push(poder);
      } else {
        this.toastr.warning(`Você só pode escolher no máximo ${this.maxPoderes} superpoderes deste quadro!`);
      }
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

        // Formata a data para YYYY-MM-DD
        if (dados.dataNascimento) {
          this.dataNascimentoInput = new Date(dados.dataNascimento).toISOString().split('T')[0];
        }

        // Descobre automaticamente qual era o quadro com base nos poderes salvos
        if (this.heroiForm.superpoderes.length > 0) {
          const primeiroPoder = this.heroiForm.superpoderes[0];
          if (this.poderesAura.includes(primeiroPoder)) {
            this.quadroSelecionado = 'aura';
          } else if (this.poderesProcrastinacao.includes(primeiroPoder)) {
            this.quadroSelecionado = 'procrastinacao';
          }
        }
      },
      error: (erro) => {
        console.error('Erro ao carregar dados para edição', erro);
        this.toastr.error('Erro ao carregar os dados do herói.');
      }
    });
  }

  salvarHeroi(): void {
    // Validação de segurança para garantir que um quadro e poderes foram escolhidos
    if (!this.quadroSelecionado) {
      this.toastr.warning('Por favor, escolha um quadro de poderes.');
      return;
    }

    if (this.heroiForm.superpoderes.length === 0) {
      this.toastr.warning('Selecione pelo menos 1 superpoder.');
      return;
    }

    // Evita bug de fuso horário na conversão da data
    if (this.dataNascimentoInput) {
      this.heroiForm.dataNascimento = new Date(`${this.dataNascimentoInput}T12:00:00`).toISOString();
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