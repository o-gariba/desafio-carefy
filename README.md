# Desafio Carefy

## Como usar a aplicação?

1. Você pode acessar o seguinte [link](https://desafio-carefy-garibaldi.surge.sh/)
2. Fazer um fork neste repositório e rodar um `npm install` para baixar todos os pacotes usados

Você precisará, logo no início, fornecer uma `API Key` que o site da [AccuWeather](https://developer.accuweather.com/user/me/apps) fornece mediante login (com um limite de 50 requisições por chave). Agora basta dar um `enter` e usar a aplicação para procurar o nome de uma cidade.

Caso queira fechar a aba, a aplicação armazena a chave que vc inseriu bem como a última cidade pesquisada.

Caso as buscas parem de funcionar, aperte F12 e busque a aba `Armazenamento` para excluir a memória local. Agora basta recarregar a página e fornecer uma nova `API Key`

No final deste documento faço algumas observações do que precisa ser aprimorado. Se quiser me apontar possíveis melhorias, me procure através deste repositório, abrindo uma issue, ou me chame no [Whats](https://wa.me/5516993797689). Toda contribuição será muito bem vinda!

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
- [X] Tratar entradas inválidas de nomes de cidade

> - Criar uma saída caso ocorra um erro. Verificar as saídas e validar qual resposta dar
> - Quando uma cidade está em 2 estados, o que fazer?
> > - Caso o resultado seja encontrado em mais de um estado, mostrar no output as sugestões. Ex: bom jesus pi, bom jesus rn
> > - Como aproveitar o novo input para fazer a verificação? O que minha aplicação faz hoje:

> > > 1. Entro com um nome de cidade no input
> > > 2. Aciono a função recebeELimpaInput(), que verifica se foi inserido ou não um valor e aciona o setInput com o valor passado
> > > 3. Ao atualizar o input, eu aciono a função apiLocationKey(), que busca o código da cidade. A função pega o input e faz um GET na api da AccuWeather, recebendo um array de objetos.
> > > > 1. Se eu receber um array vazio, dou return com a mensagem cidade não encontrada
> > > > 2. Se o objeto vier com um objeto, já passo isso para o setCidade
> > > > 3. Se o array tiver mais que um objeto, eu filtro os dados brutos para pegar todos os objetos que não são bairros, atribuindo eles a um novo array dadosFiltrados. Se o array passar a ter tamanho 1, posso já pegar a chave da cidade. Se não, eu faço uma listagem de todos os estados que possuem uma cidade com o nome inputado e exibo na tela, sugerindo um novo input. Se eu colocar um novo input e mesmo assim vier dois valores (que não sao bairros) vou pegar o primeiro.
> > > 4. Quando uma cidade é selecionada, eu pego o nome dela, o estado e o seu código. Ao setar o código, aciono a função apiCurrentConditions(). Ela vai dar um GET na api para saber as condições meteorológicas da cidade, armazenando como informações: temperatura, unidade de temperatura, se é dia ou noite, um texto com a condição do tempo e o número do ícone do tempo. Seto todas essas infomações e aciono a função pegaIcone()
> > > 5. a função pegaIcone() pega o valor do ícona do passo anterior e busca no site da accuweather o ícone referente. Fazendo uma verificação, pois se o numero do ícone for menor que 10, preciso add um 0 antes para achar a URL. No final seto o icone e faço a última renderização da página. 

- [X] Armazenar busca atual no localStorage
> O que preciso que seja feito: quando pesquiso uma cidade e obtenho seus dados, posso fechar a aba e quando reabri-la vou ver os dados anteriores, da cidade pesquisada
> Ideias do que fazer:
> > 1. Assim que encontro o nome da cidade, salvo o nome no localStorage. Ao iniciar a aplicação, verifico o localStorage, se tenho um valor armazenado, passo esse valor para para a função apiCurrentConditions(). Quando limpar o localStorage (preciso limpar?)
> > > Como? Crio um useEffect com o array de dependencias vazio que verifica se tenho um dado no LocalStorage, se tiver, atualizo o input, senão, não faço nada.
> > > Quando salvo no LS? na última função que é chamada na aplicação, a pegaIcone().

- [X] Melhorar o visual da aplicação

### O que fazer quando o limite diário for excedido

1. Criar uma representação de objetos resposta das requisições (json)
> 1. Resposta de cidade única
> > 
``` 
{
  "location": [
    {
      "Version": 1,
      "Key": "41597",
      "Type": "City",
      "Rank": 55,
      "LocalizedName": "Batatais",
      "EnglishName": "Batatais",
      "PrimaryPostalCode": "",
      "Region": {
        "ID": "SAM",
        "LocalizedName": "América do Sul",
        "EnglishName": "South America"
      },
      "Country": {
        "ID": "BR",
        "LocalizedName": "Brasil",
        "EnglishName": "Brazil"
      },
      "AdministrativeArea": {
        "ID": "SP",
        "LocalizedName": "São Paulo",
        "EnglishName": "São Paulo",
        "Level": 1,
        "LocalizedType": "Estado",
        "EnglishType": "State",
        "CountryID": "BR"
      },
      "TimeZone": {
        "Code": "BRT",
        "Name": "America/Sao_Paulo",
        "GmtOffset": -3,
        "IsDaylightSaving": false,
        "NextOffsetChange": null
      },
      "GeoPosition": {
        "Latitude": -20.892,
        "Longitude": -47.586,
        "Elevation": {
          "Metric": {
            "Value": 757,
            "Unit": "m",
            "UnitType": 5
          },
          "Imperial": {
            "Value": 2482,
            "Unit": "ft",
            "UnitType": 0
          }
        }
      },
      "IsAlias": false,
      "SupplementalAdminAreas": [
        {
          "Level": 2,
          "LocalizedName": "Batatais",
          "EnglishName": "Batatais"
        },
        {
          "Level": 3,
          "LocalizedName": "Batatais",
          "EnglishName": "Batatais"
        }
      ],
      "DataSets": [
        "AirQualityCurrentConditions",
        "AirQualityForecasts",
        "Alerts",
        "FutureRadar",
        "MinuteCast",
        "Radar"
      ]
    }
  ]
}
``` 

> 2. Resposta de cidade com mais de um código
> > 
```
{
  "location": [
    {
      "Version": 1,
      "Key": "2727526",
      "Type": "City",
      "Rank": 65,
      "LocalizedName": "Altinópolis",
      "EnglishName": "Altinópolis",
      "PrimaryPostalCode": "",
      "Region": {
        "ID": "SAM",
        "LocalizedName": "América do Sul",
        "EnglishName": "South America"
      },
      "Country": {
        "ID": "BR",
        "LocalizedName": "Brasil",
        "EnglishName": "Brazil"
      },
      "AdministrativeArea": {
        "ID": "MG",
        "LocalizedName": "Minas Gerais",
        "EnglishName": "Minas Gerais",
        "Level": 1,
        "LocalizedType": "Estado",
        "EnglishType": "State",
        "CountryID": "BR"
      },
      "TimeZone": {
        "Code": "BRT",
        "Name": "America/Sao_Paulo",
        "GmtOffset": -3,
        "IsDaylightSaving": false,
        "NextOffsetChange": null
      },
      "GeoPosition": {
        "Latitude": -18.858,
        "Longitude": -41.968,
        "Elevation": {
          "Metric": {
            "Value": 151,
            "Unit": "m",
            "UnitType": 5
          },
          "Imperial": {
            "Value": 495,
            "Unit": "ft",
            "UnitType": 0
          }
        }
      },
      "IsAlias": false,
      "ParentCity": {
        "Key": "33805",
        "LocalizedName": "Governador Valadares",
        "EnglishName": "Governador Valadares"
      },
      "SupplementalAdminAreas": [
        {
          "Level": 2,
          "LocalizedName": "Governador Valadares",
          "EnglishName": "Governador Valadares"
        },
        {
          "Level": 3,
          "LocalizedName": "Governador Valadares",
          "EnglishName": "Governador Valadares"
        }
      ],
      "DataSets": [
        "AirQualityCurrentConditions",
        "AirQualityForecasts",
        "Alerts",
        "FutureRadar",
        "MinuteCast",
        "Radar"
      ]
    },
    {
      "Version": 1,
      "Key": "41754",
      "Type": "City",
      "Rank": 65,
      "LocalizedName": "Altinópolis",
      "EnglishName": "Altinópolis",
      "PrimaryPostalCode": "",
      "Region": {
        "ID": "SAM",
        "LocalizedName": "América do Sul",
        "EnglishName": "South America"
      },
      "Country": {
        "ID": "BR",
        "LocalizedName": "Brasil",
        "EnglishName": "Brazil"
      },
      "AdministrativeArea": {
        "ID": "SP",
        "LocalizedName": "São Paulo",
        "EnglishName": "São Paulo",
        "Level": 1,
        "LocalizedType": "Estado",
        "EnglishType": "State",
        "CountryID": "BR"
      },
      "TimeZone": {
        "Code": "BRT",
        "Name": "America/Sao_Paulo",
        "GmtOffset": -3,
        "IsDaylightSaving": false,
        "NextOffsetChange": null
      },
      "GeoPosition": {
        "Latitude": -21.025,
        "Longitude": -47.373,
        "Elevation": {
          "Metric": {
            "Value": 916,
            "Unit": "m",
            "UnitType": 5
          },
          "Imperial": {
            "Value": 3004,
            "Unit": "ft",
            "UnitType": 0
          }
        }
      },
      "IsAlias": false,
      "SupplementalAdminAreas": [
        {
          "Level": 2,
          "LocalizedName": "Altinópolis",
          "EnglishName": "Altinópolis"
        },
        {
          "Level": 3,
          "LocalizedName": "Altinópolis",
          "EnglishName": "Altinópolis"
        }
      ],
      "DataSets": [
        "AirQualityCurrentConditions",
        "AirQualityForecasts",
        "Alerts",
        "FutureRadar",
        "MinuteCast",
        "Radar"
      ]
    }
  ]
}
```

> 3. Resposta do clima de uma cidade com código único
> > 
```
{
  "conditions": [
    {
      "LocalObservationDateTime": "2022-07-19T09:55:00-03:00",
      "EpochTime": 1658235300,
      "WeatherText": "Ensolarado",
      "WeatherIcon": 1,
      "HasPrecipitation": false,
      "PrecipitationType": null,
      "IsDayTime": true,
      "Temperature": {
        "Metric": {
          "Value": 18.7,
          "Unit": "C",
          "UnitType": 17
        },
        "Imperial": {
          "Value": 66,
          "Unit": "F",
          "UnitType": 18
        }
      },
      "MobileLink": "http://www.accuweather.com/pt/br/batatais/41597/current-weather/41597?lang=pt-br",
      "Link": "http://www.accuweather.com/pt/br/batatais/41597/current-weather/41597?lang=pt-br"
    }
  ]
}
```

2. Como dar fetch nesses dados? Comentar linhas de fetch e fazer o acesso direto.

### Teste com API ligada

Erros encontrados:
- Busquei por: pradópolis. Sem erros, tudo ok! Recarregando a página e deu certo, informações estavam ali

- Na mesma sessão, buquei por: parauapebas. Sem erros, encontrei a cidade que fica no Pará. Recarreguei a página e tudo ok!

- Na mesma sessão, busquei por: gramado. Sem erros, tudo ok! Encontrei gramados no RS.

- Sem recarregar a página, busquei por: Curitiba. Sem erros, tudo ok!! Recarreguei a pag. tudo em ordem

- Procurei por bom jesus e não retornou nada visualmente. Localstorage ainda guarda curitiba. Limpei a memória e recarregar a página. Escrevi bom jesus e o texto está sendo cortado, extrapola a caixa. Escrevi "bom jesus sp" e deu certo

- Na mesma sessao procurei por 'santanesia' e não retornou nada visualmente. O ls ainda guarda bom jesus sp. Limpando a memoria e recarregando a página deu certo.

- Pesquisei por Ipiabas e encontrou como se fosse cidade, mas é bairro. Pausa na api para verificar o que está ocorrendo. Caixa d'água velha tmb é bairro e deu como cidade do rj. 

Erros encontrados:
1. [X] após uma busca bem sucedida, não consigo fazer uma nova busca que dê erro.
2. [X] Estou achando bairros como se fossem cidades.
3. [X] Quando dou a lista de opções de bairro eu ultrapasso o limite da área branca do campo de output

Vou focar em corrigir o primeiro erro.

Fluxo de informações quando digito algo que deve dar erro:
1. seto o input
2. disparo a função apiLocationKey()
3. faço um get na api com o valor do input
4. caio no primeiro if e seto a msgOutput com o valor da msg nova
5. mas não mostro ela pq o state condições ainda está cheio com os valores da busca anterior
> - Posso apagar esse state assim que receber um novo input

Verificando se corrigi o erro. Corrigido.

### 2ª rodada de testes

- busquei por: iguatu. Recebi a resposta de que a cidade se encontra em 2 estados, escolhi um deles e mostrou os dados. Perfeito! Recarreguei a página e tudo ocorreu bem.

- Pesquisando um bairro: caixa d'água velha. Tem que falar que não existe a cidade. Deu certo!

- Buscando uma cidade de outro país: nova iorque. Encontra 3 estados com a cidade. Escolho ny mas isso não resolve. Pq?
> - Passando nova iorque ny no site do accuweather dá certo...
> - nao dá certo pq ainda tenho 2 nova iorques dentro de ny

- Ao dar enter com o input vazio enquanto ele exibe os dados de uma cidade faz com que não apareca a img de input inválido. Pq?
> - Eu excluia o array de condições apenas dpois de setar o input, e dentro dessa condição eu dava return. Logo nunca chegava a recarregar o visual do output. Corrigido