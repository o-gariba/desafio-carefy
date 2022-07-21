import { useEffect, useState } from "react";
import { TextField } from "@mui/material";

import './App.css'

function App() {

  const [chaveApi, setChaveApi] = useState('')
  const [input, setInput] = useState('')
  const [codigoCidade, setCodigoCidade] = useState('')
  const [nomeCidade, setNomeCidade] = useState('')
  const [nomeEstado, setNomeEstado] = useState('')
  const [nomePais, setNomePais] = useState('')
  const [condicoes, setCondicoes] = useState([])
  const [icone, setIcone] = useState('')
  const [mensagemOutput, setMensagemOutput] = useState('Aguerdando input...')

  useEffect(() => {
    let chaveMemoria = localStorage.getItem('chaveApi')
    let memoria = localStorage.getItem('inputAtual')
    if (chaveMemoria) setChaveApi(chaveMemoria)
    if (memoria) setInput(memoria)
  }, [])

  useEffect(() => {
    if (input.length > 0) apiLocationKey()
  }, [input])


  useEffect(() => {
    if (codigoCidade.length > 0) apiCurrentConditions()
  }, [codigoCidade])

  useEffect(() => {
    if (condicoes.length > 0) {
      pegaIcone()
    }
  }, [condicoes])

  const recebeELimpaInput = (evento) => {
    evento.preventDefault()
    const input = evento.target.form[0].value
    if (!input) {
      setCondicoes([])
      return setMensagemOutput('Campo vazio, digite o nome de uma cidade')
    }
    setInput(input)
    setCondicoes([])
    evento.target.form[0].value = ''
  }

  const apiLocationKey = async () => {
    const urlBase = 'https://dataservice.accuweather.com/locations/v1/cities/search'
    const query = `?apikey=${chaveApi}&q=${input}&language=pt-br`

    const res = await fetch(urlBase + query)
    const dadosBrutos = await res.json()

    let dadosFiltrados = []

    if (dadosBrutos.length === 0) return setMensagemOutput('cidade não encontrada! digite novamente')
    else if (dadosBrutos.length === 1) {
      if (!('ParentCity' in dadosBrutos[0])) {
        setCodigoCidade(dadosBrutos[0].Key)
        setNomeCidade(dadosBrutos[0].LocalizedName)
        setNomeEstado(dadosBrutos[0].AdministrativeArea.ID)
        setNomePais(dadosBrutos[0].Country.ID)
      } else return setMensagemOutput('cidade não encontrada! digite novamente')
    } else {

      dadosBrutos.filter((obj) => {
        if (!('ParentCity' in obj)) {
          return dadosFiltrados.push(obj)
        }
      })

      if (dadosFiltrados.length === 1) {
        setCodigoCidade(dadosFiltrados[0].Key)
        setNomeCidade(dadosFiltrados[0].LocalizedName)
        setNomeEstado(dadosFiltrados[0].AdministrativeArea.ID)
        setNomePais(dadosBrutos[0].Country.ID)
      } else if (dadosFiltrados.length > 1) {
        const estados = dadosFiltrados.map((obj) => {
          return obj.AdministrativeArea.ID
        })

        const estadosFiltrados = [...new Set(estados)]

        return setMensagemOutput(`Encontrei essa cidade nos seguintes estados: ${estadosFiltrados}. Add o estado na próxima busca. Ex: ${input} <uf>`)

      } else return setMensagemOutput('cidade não encontrada! digite novamente')
    }
  }

  const apiCurrentConditions = async () => {
    const urlBase = 'https://dataservice.accuweather.com/currentconditions/v1/'
    const query = `${codigoCidade}?apikey=${chaveApi}&language=pt-br`

    const res = await fetch(urlBase + query)
    const dadosBrutos = await res.json()

    const dadosCondicoes = [
      dadosBrutos[0].Temperature.Metric.Value,
      dadosBrutos[0].Temperature.Metric.Unit,
      dadosBrutos[0].IsDayTime,
      dadosBrutos[0].WeatherText,
      dadosBrutos[0].WeatherIcon,
    ]

    setCondicoes(dadosCondicoes)
  }

  const pegaIcone = () => {
    localStorage.setItem('inputAtual', input)

    let iconeNum = condicoes[4]

    if (iconeNum) {
      const iconeString = iconeNum.toString()
      if (iconeString.length === 1) iconeNum = `0${iconeNum}`
    }

    const urlBase = `https://developer.accuweather.com/sites/default/files/${iconeNum}-s.png`

    setIcone(urlBase)
  }

  return (

      <div className="main">
        <div className="input-area">
          <form className="form">
            {chaveApi ? <TextField id="input-principal" label="Procurar cidade..." variant="standard" /> : <TextField label='chave api' variant="standard" onChange={(e) => {
              let chave = e.target.value
              if (chave.length > 30) {
                setChaveApi(chave)
                localStorage.setItem('chaveApi', chave)
              }
            }} />}
            <button
              className="botao"
              type="submit"
              onClick={(e) => recebeELimpaInput(e)}>
              buscar
            </button>
          </form>
        </div>

        <div className="output">
          {condicoes.length === 0 ? <p className="output-msgs">{mensagemOutput}</p> :
            <div className="output-resultados">
              <p className="output-cidade">{nomeCidade}, {nomeEstado} ({nomePais})</p>
              <p className="output-temperatura">{condicoes[0]} º{condicoes[1]}</p>
              <img src={icone} alt="icone do tempo" className="output-icone" />
              <p className="output-condicaoTempo">Condição do tempo: {condicoes[3]}</p>
              <p className="output-ehDia">Ainda é dia? {condicoes[2] ? 'Sim' : 'Não'}</p>
            </div>
          }
        </div>
      </div>
  );
}

export default App;
