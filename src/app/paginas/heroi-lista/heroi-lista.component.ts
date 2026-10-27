import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/heroi.service';
import { HeroiListItem } from 'src/app/models/heroi.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-heroi-lista',
  templateUrl: './heroi-lista.component.html',
  styleUrls: ['./heroi-lista.component.css']
})
export class HeroiListaComponent implements OnInit {
  listaHerois: any[] = []; // Usamos any ou estendemos a interface para aceitar 'isFlipped'
  carregandoNome: { [key: string]: boolean } = {}; // Controle de carregamento do nome no verso

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.carregarHerois();
  }

  carregarHerois(): void {
    this.apiService.obterHerois().subscribe({
      next: (resposta: any) => {
        const itens = resposta.response?.items || resposta.response || [];
        // Mapeia adicionando a propriedade de controle do giro (isFlipped)
        this.listaHerois = itens.map((h: any) => ({
          ...h,
          isFlipped: false
        }));
      },
      error: (erro) => {
        console.error('Erro ao carregar lista de heróis', erro);
        this.toastr.error('Erro ao carregar a lista de heróis.');
      }
    });
  }

  // Função para alternar o estado de rotação do card e carregar os detalhes (nome) se necessário
  toggleFlip(heroi: any): void {
    heroi.isFlipped = !heroi.isFlipped;

    // Se virou para o verso e ainda não tem o nome civil carregado, busca os detalhes na API
    if (heroi.isFlipped && !heroi.nome) {
      this.carregandoNome[heroi.id] = true;

      this.apiService.obterHeroiPorId(heroi.id).subscribe({
        next: (resposta: any) => {
          const dados = resposta.response || resposta;
          heroi.nome = dados.nome; // Atribui o nome civil retornado da API
          this.carregandoNome[heroi.id] = false;
        },
        error: (erro) => {
          console.error(`Erro ao buscar detalhes do herói ID ${heroi.id}`, erro);
          this.carregandoNome[heroi.id] = false;
        }
      });
    }
  }

  AtivarHeroiAsync(id: string): void {
    this.apiService.ativarHeroi(id).subscribe({
      next: () => {
        this.toastr.success('Status do herói alterado com sucesso!');
        this.carregarHerois();
      },
      error: (erro) => {
        console.error('Erro ao alterar status', erro);
        this.toastr.error('Não foi possível alterar o status.');
      }
    });
  }

  DeletarHeroiAsync(id: string): void {
    if (confirm('Tem certeza que deseja deletar este herói?')) {
      this.apiService.deletarHeroi(id).subscribe({
        next: () => {
          this.toastr.success('Herói removido com sucesso!');
          this.carregarHerois();
        },
        error: (erro) => {
          console.error('Erro ao deletar herói', erro);
          this.toastr.error('Não foi possível deletar o herói.');
        }
      });
    }
  }
}