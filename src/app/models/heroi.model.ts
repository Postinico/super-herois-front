export interface ObterHeroiOut {
    resultado: boolean
    menssagem: string
    data: DataObterHeroiOut[]
  }
  export interface DataObterHeroiOut {
    id: number
    nomeHeroi: string
  }



  export interface ObterIdHeroiOut {
    resultado: boolean
    menssagem: string
    data: DataObterIdHeroiOut
  }
  export interface DataObterIdHeroiOut {
    heroi: HeroiObterIdHeroiOut
    superpoderes: SuperpodereObterIdHeroiOut[]
  }
  export interface HeroiObterIdHeroiOut {
    id: number
    nome: string
    nomeHeroi: string
    dataNascimento: string
    altura: number
    peso: number
  }
  export interface SuperpodereObterIdHeroiOut {
    id: number
    superPoder: string
  }



  export interface PostHeroiIn {
    nome: string
    nomeHeroi: string
    dataNascimento: string
    altura: number
    peso: number
    superpoderes: number[]
  }


  export interface PostHeroiOut {
    resultado: boolean
    menssagem: string
    data: DataPostHeroiOut
  }
  export interface DataPostHeroiOut {
    nome: string
    nomeHeroi: string
    dataNascimento: string
    altura: number
    peso: number
    superpoderes: number[]
  }


  export interface PutHeroiIn {
    nome: string
    nomeHeroi: string
    dataNascimento: string
    altura: number
    peso: number
    superpoderes: number[]
  }


  export interface PutHeroiOut {
    resultado: boolean
    menssagem: string
    data: DataPutHeroiOut
  }
  export interface DataPutHeroiOut {
    id: number
    nome: string
    nomeHeroi: string
    dataNascimento: string
    altura: number
    peso: number
  }


  export interface DeleteHeroiOut {
    resultado: boolean
    menssagem: string
    data: DataDeleteHeroiOut
  }
  export interface DataDeleteHeroiOut {
    id: number
    superPoder: string
    descricao: string
  }