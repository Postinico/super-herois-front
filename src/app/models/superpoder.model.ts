export interface ObterSuperpoderOut {
    resultado: boolean
    menssagem: string
    data: DataObterSuperpoderOut[]
  }
  
  export interface DataObterSuperpoderOut {
    id: number
    superPoder: string
  }
  


  export interface PostSuperpoderIn {
    nome: string
    Descricao: string
  }
  export interface PostSuperpoderOut {
    resultado: boolean
    menssagem: string
    data: DataPostSuperpoderOut
  }

  export interface DataPostSuperpoderOut {
    nome: string
    Descricao: string
  }