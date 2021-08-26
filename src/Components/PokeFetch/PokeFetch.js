import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      count: 10,
    }
  }

  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
        })
      })
      .catch((err) => console.log(err))
  }
  
  timer() {
    this.myInterval = setInterval(() => {
      this.setState(prevState => ({
        count: prevState.count - 1
      }))
      
      if (this.state.count === 0) {
        clearInterval(this.myInterval)
      } else if (this.state.count < 0) {
        this.setState({ count: 10 }, () => {
          console.log("Count updated" + " " + this.state.count)
        })
      }
    }, 1000)
  }

  render() {
    const { count } = this.state;
    if (count === 0) {
      return (
        <div className={'wrapper'}>
          <button className={'start'} onClick={() => {
            this.timer()
            this.fetchPokemon();
            this.state.count = 10;
          }}>Start!</button>
          <h1 className={'timer'} >{count}</h1>
          <div className={'pokeWrap'}>
            <img className={'pokeImg'} src={this.state.pokeSprite} />
            <h1 style={{ color: 'black' }} className={'pokeName'}>{this.state.pokeName}</h1>
          </div>
        </div>
      )
    } else {
      return (
        <div className={'wrapper'}>
          <button className={'start'} onClick={() => {
            this.timer()
            this.fetchPokemon();
          }}>Start!</button>
          <h1 className={'timer'} >{count}</h1>
          <div className={'pokeWrap'}>
            <img style={{ filter: 'contrast(1%)' }} className={'pokeImg'} src={this.state.pokeSprite} />
            <h1 style={{ color: 'transparent' }} className={'pokeName'}>{this.state.pokeName}</h1>
          </div>
        </div>
      )
    }
  }
}

export default PokeFetch;