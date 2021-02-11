# API's Microserviço

Este projeto foi desenvolvido com a finalidade de tornar ele escalável a nível de microserviços. Inicialmente o projeto contém apenas 1 API, mas como já está implementado um Gateway para distribuir as requisições, acoplar ou desacoplar a API existente em outras não será problema.

# Como funciona o fluxo?

Supondo que uma rota da API seja protegedia, o fluxo funcionará conforme a imagem abaixo:

![alt text](https://drive.google.com/uc?export=view&id=1ogLoBFy6F-Jf-IQbIkgtQG--ost0MzJ9)

O usuário terá um JWT e quando acessar o Gateway, o Gateway irá criar outro JWT com duração de 1 minuto para enviar ao microserviço. O microserviço somente aceitará tokens vinda do Gateway.
Caso a rota não tinha proteção (omo por ex login/criar usuário), as rotas ficariam livres.

# Iniciando os projetos

Para iniciar os projetos, faça o clone e instale as dependências:

- do projeto;
- do gateway;
- do coreAPI.

(Use ```npm install``` para isso)

Instale o NODEMON caso não o tenha: ```npm install nodemon -g```

Configure o **.env.local** de todos os projetos (utilize o .env.local para saber quais parâmetros preencher);

Feito isso, abra o termino na pasta principal do projeto e rode o comando:

```npm run dev``` - Ele irá iniciar tanto o gateway quanto a coreAPI.

Você também pode iniciar cada um deles separadamente, basta entrar em seus respectivos diretórios e rodar o comando: ```node_env=local nodemon```

