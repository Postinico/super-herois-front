import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/heroi.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-heroi-lista',
  templateUrl: './heroi-lista.component.html',
  styleUrls: ['./heroi-lista.component.css']
})
export class HeroiListaComponent implements OnInit {
  listaHerois: any[] = []; 
  carregandoNome: { [key: string]: boolean } = {}; 

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
        
        // Mapeia adicionando o controle de giro, estrelas conquistadas e fixando o total em 33
        this.listaHerois = itens.map((h: any) => {
          const storageKey = `estrelas_heroi_${h.id}`;
          let estrelasAtuais = Number(localStorage.getItem(storageKey) || '6');
          
          if (estrelasAtuais < 33) {
            estrelasAtuais += 3; 
            if (estrelasAtuais > 33) estrelasAtuais = 33;
            localStorage.setItem(storageKey, estrelasAtuais.toString());
          }

          return {
            ...h,
            isFlipped: false,
            totalEstrelas: 33, // Garante 33 estrelas no total
            estrelasConquistadas: h.estrelasConquistadas ?? estrelasAtuais
          };
        });
      },
      error: (erro) => {
        console.error('Erro ao carregar lista de heróis', erro);
        this.toastr.error('Erro ao carregar a lista de heróis.');
      }
    });
  }

  // Método auxiliar para gerar exatamente o array de estrelas baseado no total
  obterArrayEstrelas(total: number): number[] {
    const quantidade = total || 33;
    return Array(quantidade).fill(0).map((_, i) => i + 1);
  }

  // Função para alternar o estado de rotação do card e carregar os detalhes (nome) se necessário
  toggleFlip(heroi: any): void {
    heroi.isFlipped = !heroi.isFlipped;

    if (heroi.isFlipped && !heroi.nome) {
      this.carregandoNome[heroi.id] = true;

      this.apiService.obterHeroiPorId(heroi.id).subscribe({
        next: (resposta: any) => {
          const dados = resposta.response || resposta;
          heroi.nome = dados.nome; 
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