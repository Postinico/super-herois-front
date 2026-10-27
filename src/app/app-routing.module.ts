import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroiListaComponent } from './paginas/heroi-lista/heroi-lista.component';
import { HeroiDetalhesComponent } from './paginas/heroi-detalhes/heroi-detalhes.component';
import { HeroiFormComponent } from './paginas/heroi-form/heroi-form.component';
import { HomeComponent } from './paginas/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Página inicial
  { path: 'herois', component: HeroiListaComponent },
  { path: 'herois/novo', component: HeroiFormComponent },
  { path: 'herois/editar/:id', component: HeroiFormComponent },
  { path: 'herois/:id', component: HeroiDetalhesComponent },
  { path: '**', redirectTo: '' } // Redireciona rotas inválidas para a home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] // <--- ADICIONE ESTA LINHA SE ELA NÃO ESTIVER AQUI
})
export class AppRoutingModule { }