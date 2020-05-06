# Banco de Soluções e Snippetfys

Simples aplicações escrita em NodeJS e Mysql.
Mantenha seus códigos, dicas e soluções organizados por categoria, com pesquisa e fácil visualização.

## Instalação

### Requisitos

- [NodeJS](https://nodejs.org/en/) - Aplicação foi testada na versão v11.10.0
- [Yarn](https://yarnpkg.com/pt-BR/) - Para gerenciar a pacotes foi utilizado a versão 1.13.0

#### V1.0 - Mysql

- [Mysql](https://mariadb.org) - Foi utilizado MariaDB versão 10.3

#### V1.1 - Postgres

- [Postgres](https://data.heroku.com/) - Foi utilizado Postgresql do Heroko.

No local desejado realize o clone do repositório com o comando:

`git clone https://github.com/JacsonRitzmann/nodejs-app-snippetfy.git`

No mysql é necessário criar a base de dados 'snippetfy'

Na raiz do diretório criado 'nodejs-app-snippetfy'.É necessário criar um arquivo chamdo '.env', no qual será armazenado as seguintes variáveis de ambiente:

`NODE_ENV=production`

`PORT=3000`

`DB_HOST=127.0.0.1`

`DB_USER=root`

`DB_PASSWORD=xxxx`

`DB_BASENAME=snippetfy`

`MAIL_HOST=xxxxx`

`MAIL_PORT=2525`

`MAIL_USER=xxx`

`MAIL_PASSWORD=xxx`

Dentro do diretório 'nodejs-app-snippetfy' execute o comando `yarn install`
Após o término á necessário realizar a execução das migrações, para que as tabelas sejam criadas

`node_modules/.bin/sequelize db:migrate`

Caso ocorra algum erro, utilize o arquivo db.sql para criar as tabelas manualmente.

Execute `yarn start` para iniciar o servico

Dica:
Utilize o pm2 para manter a aplicação ativa em seu servidor

![alt text](https://github.com/JacsonRitzmann/nodejs-app-snippetfy/blob/master/screenshot.png)

Versão

1.0

Autor

Jacson ritzmann - jacson.ritzmann@hotmail.com

Licença

Este projeto está licenciado sob a licença MIT. veja o arquivo LICENSE.md para detalhes.
