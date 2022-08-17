import React from 'react'
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
        <h1>Home</h1>
        <Link to='/conteiner'>
        <button>Conteiners</button>
        </Link>
        <Link to='/movimentacao'>
        <button>Movimentações</button>
        </Link>
        <Link to='/relatorio'>
        <button>Relatorio</button>
        </Link>
    </div>
  )
}
