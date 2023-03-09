# Sistema de transporte
<img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fgetdrawings.com%2Ffree-icon%2Fpublic-transport-icon-70.png&f=1&nofb=1&ipt=89cc2ec28a6046821c1f33dec749917956060bec6dde74d617a2572931f2f4ad&ipo=images" width="100" height="100" color="#fff">
</h1>
</div>


## Tabela de conteúdos
* [Versões](#versões)
* [Iniciando o projeto](#iniciando-o-projeto)
* [Configuração do ambiente](#configurando-ambiente)
* [Banco de dados](#banco-de-dados)
* [Deploy](#deploy)
* [Documentação](#documentacao)
* [Backend](#back-end)
* [Frontend](#frontend)


## Versões
  * ### 1.0.0
      * Solicitação
        * Registrar 
        * Editar
        * Excluir
        * Visualizar solicitações em espera
      * Movimentação
        * Registrar saída a partir de uma solicitação aprovada
        * Registrar retorno
      * Gerência
         * Motoristas
           * Cadastro 
           * Edição 
           * Exclusão 
           * Visualização paginada
         * Setores
           * Cadastro
           * Edição
           * Exclusão
           * Visualização paginada
         * Locadoras
           * Cadastro
           * Edição
           * Exclusão
           * Visualização paginada
         * Veículos
           * Cadastro
           * Edição
           * Exclusão
           * Visualização paginada
     
      * Relatórios
        * Viagens por motorista
        * Viagens por setor
      * Usuários
        * Tipos de usuário definem operações do sistema
           
           Administrador | Todas as ações do sistema
          ----------------| -------------------------
           Gerência      | Todas as ações do sistema
           Colaborador   | Cadastro de solicitação



## Iniciando o projeto

Clone o repositório através do comando 
```console
git clone https://github.com/sedurbs-se/sistema_de_transporte.git
```

Após isso, entre dentro da pasta do projeto através do comando:
```console
cd sistema_de_transporte
```

Instale as dependências
```console
   npm install
```



## Configurando ambiente

Crie um arquivo `.env` na pasta raiz do projeto e preencha de acordo com a tabela abaixo



Seu Ambiente        | DATABASE_URL                                              | NEXT_PUBLIC_BASE_URL_DEV     | NEXT_PUBLIC_NODE_ENV | NEXT_PUBLIC_BASE_URL_PROD
--------------- | -------------------------------------------------------   | ---------------------------- | ---                  | ------------------------
Desenvolvimento | mysql://usuario:senha@localhost:3306/sistema_transporte   | http://localhost:3000/api/   | dev                  | -
Produção        | mysql://usuario:senha@172.24.11.9:3306/sistema_transporte | -                           | production           | htp://172.24.11.9/api/               





## Banco de dados

Com as variavéis de ambiente configuradas, rode os seguintes comandos

```console
npx prisma db push
```

```console
npx prisma db seed
```
```console
npx prisma generate
```

Após rodar os comandos, se o Visual Studio Code acusar algum erro de tipo nas classes definidas no Schema do prisma, basta seguir os seguintes passos:

* `CTRL + SHIFT + P`

![image](https://user-images.githubusercontent.com/78393422/216201655-7ae6e938-de4f-420c-a7c5-f4e84b2b6476.png)

Se a opção de Reload Window não aparecer, basta pesquisar na barra de pesquisa.

Após isso, o banco de dados já está configurado.


## Deploy

Passos para o deploy da aplicação:
* Primeiramente, deve-se fazer um push com as atualizacoes desejadas na branch develop
* Abrir Pull Request 
* Esperar os responsaveis efetuarem o merge da branch de atualização com a branch principal
* Deve-se conectar com acesso remoto à maquina de produção 
## IP do servidor: 172.24.11.9
* Após isso, basta rodar os seguintes comandos:
```console
cd ..
cd var\www\html\sistema_de_transporte
sh deploy.sh
```




## Exemplos
```🤖 Sem exemplos no momento```

## Documentacao

* ### Back-end
    * ## Rotas
      # GET /solicitacao


NELSON

## TODO

Usuario só pode editar sua conta

Deve ser possível aumentar o cargo de um usuário pelo sistema

Todas as rotas devem ser error free