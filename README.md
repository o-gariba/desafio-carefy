# Desafio Carefy

## Como desenvolvi a aplicação

### Leitura e anotações sobre o PDF do desafio

App meteorológico para obter:

1. temperatura
2. condições meteoriológicas
3. se é dia ou noite na determinada cidade

Requisitos:

1. campo de entrada que vai receber o nome de uma cidade
2. Ao pressionar enter, atualizo o DOM mostrando os itens listados anteriormente MAIS um ícone da condição meteorológica

Bônus:

- Ao fechar a janela, o nome da cidade será armazenado no Local Storage

Entrega (até quinta, dia 21, às 23h59):

- Enviada por [e-mail](querosercarefy@carefy.com.br) ou pelo Whats do José. Deve conter:
> - Link da publicação no repositório github.
> - Link de acesso da aplicação com aplicação funcional.

### Criação da conta no [AccuWeather APIs](https://developer.accuweather.com)

Vi alguns vídeos sobre como a API funciona, listei os requisitos e criei minha conta na plataforma.

Submeti a criação do meu primeiro App e consegui a chave de acesso: pGVQUpdwtcAXaJx5KRvjbGwHG7uZWIGv

### Front utilizado

Escolhi usar o React por acreditar que me sinto mais livre em escrever a página por ali.

### Meu processo de desenvolvimento

1. Criei um form com um input e um botão de submissão (funcionando com enter).
2. Assim que submeto uma string, faço uma verificação para saber se está vazia e armazeno a informação em um estado (input).
3. Quando altero o input, aciono a apiCurrentConditions e pego o código da cidade via API. Armazeno essa informação em um estado (codigoCidade).
4. Assim que altero o estado do código da cidade, disparo a função da API que busca a condição atual da cidade, trato os dados e passo algumas informações para um novo estado (condicoes)
5. Se tudo ocorrer bem, exibo todo os dados no front

### O que quero fazer agora

- [X] Saber se no local é dia ou noite
- [X] Obter um ícone referente ao estado climatico
- [ ] Tratar entradas inválidas de nomes de cidade
- [ ] Melhorar o visual da aplicação