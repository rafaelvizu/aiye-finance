// mascara para cpf
export function formatCPF(cpf: string): string
{
     cpf = cpf.replace(/[^\d]/g, '');
     return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4').slice(0, 14);
}

// mascara para cnpj
export function formatCNPJ(cnpj: string): string
{
     cnpj = cnpj.replace(/[^\d]/g, '');
     return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5').slice(0, 18);
}

// mascara para cep
export function formatCEP(cep: string): string
{
     cep = cep.replace(/[^\d]/g, '');
     return cep.replace(/(\d{5})(\d{3})/, '$1-$2').slice(0, 9);
}

// mascara para telefone
export function formatTelefone(telefone: string): string
{
     telefone = telefone.replace(/[^\d]/g, '');
     return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3').slice(0, 15);
}
// tirar a mascara do cpf
export function unformatCPF(cpf: string): string
{
     return cpf.replace(/[^\d]/g, '');
}

export function formatUF(uf: string): string
{
     // não deixar o usuário digitar numeros e caracteres especiais
     uf = uf.replace(/[^\w]/g, '');
     return uf.replace(/(\w{2})/, '$1').slice(0, 2).toUpperCase();
}

// tirar mascara do cnpj
export function unformatCNPJ(cnpj: string): string
{
     return cnpj.replace(/[^\d]/g, '');
}

// tirar mascara do cep
export function unformatCEP(cep: string): string
{
     return cep.replace(/[^\d]/g, '');
}

// tirar mascara do telefone
export function unformatTelefone(telefone: string): string 
{
     return telefone.replace(/[^\d]/g, '');
}
