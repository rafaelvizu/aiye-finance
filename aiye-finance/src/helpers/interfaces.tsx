export interface IUser
{
     id: number;
     username: string;
     createdAt: Date;
     updatedAt: Date;
}

export interface IFornecedoresPrestadores
{
     id?: number;
     nome: string;
     email?: string;
     cpf?: string;
     cnpj?: string;
     telefone_1?: string;
     telefone_2?: string;
     endereco?: string;
     numero?: number;
     complemento?: string;
     bairro?: string;
     cidade?: string;
     uf?: string;
     cep?: string;
     observacao?: string;
     tipo?: string;

     createdAt?: Date;
     updatedAt?: Date;
}