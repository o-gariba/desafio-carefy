import { Fragment, useEffect, useState } from "react";

function App() {

  const apiKey = 'rLANOUuEIApnhL8Ws4NexZOiGbzT0HPU'

  const [input, setInput] = useState('')
  const [codigoCidade, setCodigoCidade] = useState('')
  const [condicoes, setCondicoes] = useState([])
  const [icone, setIcone] = useState('')

  useEffect(() => {
    if (input) apiLocationKey()
  }, [input])

  useEffect(() => {
    if (codigoCidade) apiCurrentConditions()
  }, [codigoCidade])

  useEffect(() => {
    if (condicoes.length > 0) {
      console.log('entrei no useEffect icone')
      pegaIcone()
    }
  }, [condicoes])

  const recebeELimpaInput = (evento) => {
    evento.preventDefault()
    const input = evento.target.form[0].value
    if (!input) throw Error('input vazio')
    setInput(input)
    evento.target.form[0].value = ''
  }

  const apiLocationKey = async () => {
    if (!input) console.log('apiLocationKey rodou sem input')

    const urlBase = 'https://dataservice.accuweather.com/locations/v1/cities/search'
    const query = `?apikey=${apiKey}&q=${input}&language=pt-br`

    const res = await fetch(urlBase + query, {
      mode: 'cors',
      method: 'GET',
    })
    const dadosBrutos = await res.json()

    console.log({ location: dadosBrutos })

    try {
      setCodigoCidade(dadosBrutos[0].Key)
    } catch (error) {
      console.log(error)
    }
  }

  const apiCurrentConditions = async () => {
    const urlBase = 'https://dataservice.accuweather.com/currentconditions/v0/'
    const query = `${codigoCidade}?apikey=${apiKey}&language=pt-br`

    const res = await fetch(urlBase + query, {
      mode: 'cors',
      method: 'GET',
    })
    const dadosBrutos = await res.json()

    console.log({ conditions: dadosBrutos })

    const dadosCondicoes = [
      dadosBrutos[0].Temperature.Metric.Value,
      dadosBrutos[0].Temperature.Metric.Unit,
      dadosBrutos[0].IsDayTime,
      dadosBrutos[0].WeatherText,
      dadosBrutos[0].WeatherIcon
    ]

    setCondicoes(dadosCondicoes)
  }

  const pegaIcone = () => {
    let iconeNum = condicoes[4]

    if (iconeNum) {
      console.log(iconeNum)
      const iconeString = iconeNum.toString()
      console.log(iconeString.length)
      if (iconeString.length === 1) iconeNum = `0${iconeNum}`
      console.log(iconeNum)
    }

    const urlBase = `https://developer.accuweather.com/sites/default/files/${iconeNum}-s.png`

    console.log(urlBase)

    setIcone(urlBase)
  }

  return (
    <Fragment>
      <div className="input">
        <form className="form">
          <input type="text" className='input' />
          <button
            className="botao"
            type="submit"
            onClick={(e) => recebeELimpaInput(e)}>buscar</button>
        </form>
      </div>

      <div className="output">
        <h1>Output:</h1>
        <p>{codigoCidade}</p>
        <p>{condicoes[0]} {condicoes[1]}</p>
        <p>É dia: {condicoes[2] ? 'Sim' : 'Não'}</p>
        <p>Condição do tempo: {condicoes[3]}</p>
        <p>Ícone: {condicoes[4]}</p>
        <img src={icone} alt="" />
      </div>
    </Fragment>
  );
}

export default App;
