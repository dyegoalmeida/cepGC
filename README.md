# Sistema para Validação de CEP com Login

Teste para vaga de programador PHP

# Ferramentas utilizadas:
- Visual Studio Code
- PHPMyAdmin 
- Navegador Chrome Versão 92.0.4515.131 64 bits
- Git

# Stacks:
- Angular CLI 12.2.0 
- XAMPP 8.0.7 
  - PHP 8.0.7
  - Apache 2.4.48
  - mysql MariaDB 10.4.19
- node 14.17.4
  npm 6.14.14

# Passos para reproduzir e executar o projeto:
- Instalar o xampp <b><a href="https://sourceforge.net/projects/xampp/files/XAMPP%20Windows/8.0.7/" target="_blank">Download aqui</a></b>
- Clonar/Extrair o projeto dentro da pasta "xampp\htdocs";
- Instalar o node 14.7.4 <b><a href="https://nodejs.org/dist/v14.17.4/" target="_blank">Download aqui</a></b>
- Instalar o Angular CLI 12.2.0, abra o terminal e execute o comando abaixo
  </br></br>
  <pre><code>npm install -g @angular/cli</code></pre>
- Iniciar os serviços Apache e Mysql, pode ser feito pelo gerenciador do xampp;
- Executar o script que se encontra na pasta "src\Assets" para criação do Banco;
- Abrir o terminal e executar o comando abaixo dentro da pasta do projeto
  </br></br>
  <pre><code>ng serve -o</code></pre>
  Isso irá abrir o browser automaticamente na tela de Login;
 - Caso, após executar o último comando apresentar o erro abaixo: 
   </br></br>
   <pre><code>Cannot find module '@angular-devkit/build-angular/package.json'</code></pre>
   Execute esse comando:
   </br></br>
   <pre><code>npm install --save-dev @angular-devkit/build-angular</code></pre>

# O Software contém:
- Tela de Login
- Tela de Cadastro de Usuário
- Tela de Cadastro de CEP
- Tela de listagem do CEPs cadastrados





