
#
# ArchApp
![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20PRODUÇÃO&color=GREEN&style=for-the-badge) ![Badge issues](https://img.shields.io/github/issues/dchueri/arch-site?style=for-the-badge) ![Badge licensa](https://img.shields.io/github/license/dchueri/arch-site?label=LICENSE&style=for-the-badge) ![Badge Versão](https://img.shields.io/badge/VERSION-1.0.0-blue?style=for-the-badge) 

## Índice

* [Descrição](#descrição)
* [Funcionalidades da Aplicação](#funcionalidades-da-aplicação)
* [Acesso ao Projeto](#acesso-ao-projeto)
* [Tecnologias utilizadas](#tecnologias-utilizadas)
* [Contribuidores](#contribuidores)
* [Pessoas Desenvolvedoras do Projeto](#pessoas-desenvolvedoras)
* [Licença](#licença)

## 🚀 Descrição

Projeto desenvolvido para o escritório de arquitetura Rodolfo Martins. O **Arch** tem o intuito de realizar o controle de bonificações mensais de cada projetista a respeito do projeto arquitetônico.

## 🔨 Funcionalidades da aplicação

- `Painel de administrador`: quando o usuário fizer o login como ADMINISTRADOR ele terá as seguintes funcionalidades:
	- `Usuários`:
		- `Listagem de todos os usuários cadastrados`: o usuário pode visualizar as importações que já foram feitas.
![Imagem de exemplo](https://i.imgur.com/8IrqZsT.png)

		- `Cadastro de usuários`: Somente o ADMINISTRADOR pode realizar cadastros de novos usuários. (Todos os usuários são criados com a função de "*Projetista*", caso deseje alterar a função isso deve ser feito posteriormente no painel de "*Edição de Usuário*" explicado abaixo).
![Imagem de exemplo](https://i.imgur.com/bXLRrrQ.png)
		- `Edição de usuário`: Alterações dos dados dos usuários e também a exclusão do usuário.
![Imagem de exemplo](https://i.imgur.com/nuWSZgA.png)
	- `Projetos`: 
		- `Listagem de todos os projetos`: nesse painel serão listados todos os projetos cadastrados. É possível também realizar o cadastro de um novo projeto.
![Imagem de exemplo](https://i.imgur.com/00Uzelw.png)

		- `Cadastro de um novo projeto`: a opção "*Data do Acordo*" é referente a data da assinatura do contrato.
![Imagem de exemplo](https://i.imgur.com/MZpV5Fd.png)

		- `Edição de projetos`: no painel de "*Projetos*", ao selecionar a opção de editar, o usuário é direcionado para a área de edição de projeto. Nessa mesma área pode ser realizada a exclusão do projeto selecionado.
	![Imagem de exemplo](https://i.imgur.com/rlK3mNg.png)

	- `Relatórios`:
		- `Relatório completo`: nessa área o administrador pode visualizar todos os projetos que estão cadastrados com uma demonstração do valor total das comissões referentes a esses projetos.
	![Imagem de exemplo](https://i.imgur.com/GJcsFXa.png)

		- `Relatório por projetista`: área onde administrador pode visualizar os projetos e as comissões que devem ser pagas no mês selecionado ao usuário selecionado.	![Imagem de exemplo](https://i.imgur.com/SAomEff.png)

		- `Relatório mensal`: área onde administrador pode visualizar os projetos e as comissões que devem ser pagas no mês selecionado.	![Imagem de exemplo](https://i.imgur.com/rMFcBaR.png)

- `Painel de projetista`: quando o usuário fizer o login como PROJETISTA ele terá as seguintes funcionalidades:
	- `Meus Projetos`: é apresentado ao usuário todos os projetos pelo qual ele é responsável.
![Imagem de exemplo](https://i.imgur.com/WNQCecU.png)
	
	- `Relatório mensal`: área onde usuário pode visualizar os projetos e as comissões que serão recebidas no mês selecionado.	![Imagem de exemplo](https://i.imgur.com/rMFcBaR.png)

	- `Meu Perfil`: área onde usuário pode editar suas informações pessoais.	![Imagem de exemplo](https://i.imgur.com/5JM5SjR.png)
## 🛠️ Construído com
Front-end:
* `ReactJS`
* `Vite`
* `TypeScript`
* `React Router DOM`
* `MaterialUI`
* `Host: Vercel`

Back-end:
* `TypeScript`
* `NestJS`
* `TypeORM`
* `Database: PostgreSQL`
* `Host: Heroku`

## 🖇️ Contribuidores

Seja o primeiro a contribuir!

## ✒️ Autor

| [<img src="https://avatars.githubusercontent.com/u/84249430?s=400&u=b789830e57ccc23a4d4d758542785461dd656b5f&v=4" width=115><br><sub>Diego  Chueri</sub>](https://github.com/dchueri) | 
| :---: |

## 📄 Licença

Este projeto está sob a [MIT License](https://github.com/dchueri/arch-site/blob/main/LICENSE).
