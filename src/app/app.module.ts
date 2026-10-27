import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeroiListaComponent } from './paginas/heroi-lista/heroi-lista.component';
import { HeroiDetalhesComponent } from './paginas/heroi-detalhes/heroi-detalhes.component';
import { HeroiFormComponent } from './paginas/heroi-form/heroi-form.component';
import { HomeComponent } from './paginas/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroiListaComponent,
    HeroiDetalhesComponent,
    HeroiFormComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'increasing',
      closeButton: true,
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
