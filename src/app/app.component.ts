import { Component } from '@angular/core';
import { HeroiService } from './services/heroi.service';
import { DataDeleteHeroiOut, DataObterHeroiOut, DataObterIdHeroiOut, DataPostHeroiOut, DataPutHeroiOut, DeleteHeroiOut, HeroiObterIdHeroiOut, ObterHeroiOut, ObterIdHeroiOut, PostHeroiIn, PostHeroiOut, PutHeroiIn, PutHeroiOut, SuperpodereObterIdHeroiOut } from './models/heroi.model';
import { ToastrService } from 'ngx-toastr';
import { SuperpoderService } from './services/superpoder.service';
import { DataObterSuperpoderOut, DataPostSuperpoderOut, ObterSuperpoderOut, PostSuperpoderIn, PostSuperpoderOut } from './models/superpoder.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Super-heróis';

  superpoderNome: string = '';
  superpoderDescricao: string = '';
  id: number = 0;
  postHeroiIn: PostHeroiIn = { nome: '', nomeHeroi: '', dataNascimento: '', altura: 0, peso: 0, superpoderes: [] };
  dataNascimento: string = new Date().toLocaleDateString('en-ZA');
  postHeroiOut: PostHeroiOut;
  dataPostHeroiOut: DataPostHeroiOut;

  putHeroiIn: PutHeroiIn = { nome: '', nomeHeroi: '', dataNascimento: '', altura: 0, peso: 0, superpoderes: [] };;
  obterHeroiOut!: ObterHeroiOut;
  dataObterHeroiOut: DataObterHeroiOut[] = [];

  obterIdHeroiOut: ObterIdHeroiOut;
  dataObterIdHeroiOut: DataObterIdHeroiOut;
  heroiObterIdHeroiOut: HeroiObterIdHeroiOut = { id: 0, nome: '', nomeHeroi: '', dataNascimento: '', altura: 0, peso: 0 };
  superpodereObterIdHeroiOut: SuperpodereObterIdHeroiOut[] = [];
  deleteHeroiOut: DeleteHeroiOut;
  dataDeleteHeroiOut: DataDeleteHeroiOut;

  obterSuperpoderOut: ObterSuperpoderOut;
  dataObterSuperpoderOut: DataObterSuperpoderOut[];

  postSuperpoderOut: PostSuperpoderOut;
  dataPostSuperpoderOut: DataPostSuperpoderOut;

  putHeroiOut: PutHeroiOut;
  dataPutHeroiOut:DataPutHeroiOut;
  superpoderesNovos: number[] = [];
  constructor(
    private superpoderService: SuperpoderService,
    private heroiService: HeroiService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {

    console.log('1');
    this.obterHeroiAsync();

  }

  async obterHeroiIdAsync(id: number) {

    this.heroiService.getId(id).subscribe(dados => {

      this.obterIdHeroiOut = dados as ObterIdHeroiOut;
      this.dataObterIdHeroiOut = this.obterIdHeroiOut.data;
      this.heroiObterIdHeroiOut = this.dataObterIdHeroiOut?.heroi;
      this.superpodereObterIdHeroiOut = this.dataObterIdHeroiOut?.superpoderes;
      this.toastrService.success(this.obterIdHeroiOut.menssagem);

    }, error => {
      console.log(error);
      this.obterIdHeroiOut = error.error as ObterIdHeroiOut;

      this.toastrService.error(this.obterIdHeroiOut.menssagem);

    });


  }
  async ObterHeroiIdEditarAsync(id: number) {
    this.id = id;

    this.heroiService.getId(id).subscribe(dados => {

      this.obterIdHeroiOut = dados as ObterIdHeroiOut;
      this.dataObterIdHeroiOut = this.obterIdHeroiOut.data;
      this.heroiObterIdHeroiOut = this.dataObterIdHeroiOut?.heroi;
      this.superpodereObterIdHeroiOut = this.dataObterIdHeroiOut?.superpoderes;

      this.putHeroiIn.nome = this.heroiObterIdHeroiOut.nome;
      this.putHeroiIn.nomeHeroi = this.heroiObterIdHeroiOut.nomeHeroi;
      this.putHeroiIn.dataNascimento = this.heroiObterIdHeroiOut.dataNascimento;
      this.putHeroiIn.altura = this.heroiObterIdHeroiOut.altura;
      this.putHeroiIn.peso = this.heroiObterIdHeroiOut.peso;
      for (let i = 0; i < this.superpodereObterIdHeroiOut.length; i++) {
        this.putHeroiIn.superpoderes.push(this.superpodereObterIdHeroiOut[i].id)
      }
      console.log(this.putHeroiIn);


    }, error => {
      console.log(error);
      this.obterIdHeroiOut = error.error as ObterIdHeroiOut;

      this.toastrService.error(this.obterIdHeroiOut.menssagem);

    });


  }
  async obterHeroiAsync() {

    this.heroiService.get().subscribe(dados => {

      this.obterHeroiOut = dados as ObterHeroiOut;
      this.dataObterHeroiOut = this.obterHeroiOut.data;
      this.toastrService.success(this.obterHeroiOut.menssagem);

    }, error => {
      console.log(error);
      this.obterHeroiOut = error.error as ObterHeroiOut;

      this.toastrService.error(this.obterHeroiOut.menssagem);

    });


  }
  async AdicionarHeroiAsync() {
    console.log('adicionar herói');
    console.log(this.superpoderesNovos);
    console.log(this.postHeroiIn);

    this.postHeroiIn.superpoderes = this.superpoderesNovos;

    this.postHeroiIn.dataNascimento = new Date(this.dataNascimento).toISOString();
    this.heroiService.post(this.postHeroiIn).subscribe(dados => {

      this.postHeroiOut = dados as PostHeroiOut;
      this.dataPostHeroiOut = this.postHeroiOut.data;
      this.toastrService.success(this.postHeroiOut.menssagem);
      setTimeout(location.reload.bind(location), 3000);

    }, error => {
      console.log(error);
      this.postHeroiOut = error.error as PostHeroiOut;

      this.toastrService.error(this.postHeroiOut.menssagem);

    });


  }
  async AlterarHeroiAsync() {
    console.log('Alterar herói');
    console.log(this.superpoderesNovos);
    console.log(this.putHeroiIn);

    this.postHeroiIn.superpoderes = this.superpoderesNovos;

    this.postHeroiIn.dataNascimento = new Date(this.dataNascimento).toISOString();
    this.heroiService.put(this.id, this.putHeroiIn).subscribe(dados => {

      this.putHeroiOut = dados as PutHeroiOut;
      this.dataPutHeroiOut = this.putHeroiOut.data;
      this.toastrService.success(this.putHeroiOut.menssagem);
      setTimeout(location.reload.bind(location), 3000);

    }, error => {
      console.log(error);
      this.putHeroiOut = error.error as PutHeroiOut;

      this.toastrService.error(this.postHeroiOut.menssagem);

    });


  }
  async DeletarHeroiAsync(id: number) {
    this.heroiService.delete(id).subscribe(dados => {

      this.deleteHeroiOut = dados as DeleteHeroiOut;
      this.dataDeleteHeroiOut = this.deleteHeroiOut.data;
      this.toastrService.success(this.deleteHeroiOut.menssagem);
      setTimeout(location.reload.bind(location), 3000);

    }, error => {
      console.log(error);
      this.deleteHeroiOut = error.error as DeleteHeroiOut;

      this.toastrService.error(this.postHeroiOut.menssagem);

    });


  }


  async obterSuperpoderAsync() {

    this.superpoderService.get().subscribe(dados => {

      this.obterSuperpoderOut = dados as ObterSuperpoderOut;
      this.dataObterSuperpoderOut = this.obterSuperpoderOut.data;
      this.toastrService.success(this.obterSuperpoderOut.menssagem);

    }, error => {
      console.log(error);
      this.obterSuperpoderOut = error.error as ObterSuperpoderOut;

      this.toastrService.error(this.obterSuperpoderOut.menssagem);

    });


  }
  async AdicionarSuperpoderAsync() {
    console.log('adicionar poder');

    let superpoderNovo: PostSuperpoderIn = { nome: '', Descricao: '' };
    superpoderNovo.nome = this.superpoderNome;
    superpoderNovo.Descricao = this.superpoderDescricao;
    console.log(superpoderNovo);
    this.superpoderService.post(superpoderNovo).subscribe(dados => {

      this.postSuperpoderOut = dados as PostSuperpoderOut;
      this.dataPostSuperpoderOut = this.postSuperpoderOut.data;
      this.toastrService.success(this.postSuperpoderOut.menssagem);
      setTimeout(location.reload.bind(location), 3000);

    }, error => {
      console.log(error);
      this.postSuperpoderOut = error.error as PostSuperpoderOut;

      this.toastrService.error(this.postSuperpoderOut.menssagem);

    });


  }

  cadastrarHeroi() {
    this.obterSuperpoderAsync();
  }
  heroiSelecionado(id: number) {
    console.log(id);
  }

  poderSelecionado(id: number) {
    this.superpoderesNovos.push(id);

    console.log('passei push');
  }

}
