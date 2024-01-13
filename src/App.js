import React from 'react';
import NavegacaoJogos from './components/NavegacaoJogos/NavegacaoJogos';
import TabelaJogos from './components/JogosComponent/JogosComponent';

const App = () => {
  return (
    <div>
      <div className="header">
        <a href="/"><img id="futlive-logo" src="./static/futlive.png" alt="FutLive Logo" width="1%"/> Futelive</a>
      </div>
      <NavegacaoJogos />
      <TabelaJogos />
    </div>
  );
};

export default App;
