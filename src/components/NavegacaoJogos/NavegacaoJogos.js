// NavegacaoJogos.js

import React, { useState, useEffect } from 'react';
import styles from './styles';
import JogosComponent from '../JogosComponent/JogosComponent';

const NavegacaoJogos = () => {
  const [mesAno, setMesAno] = useState('');
  const [datasJogos, setDatasJogos] = useState([]);
  const [dataSelecionada, setDataSelecionada] = useState('');

  useEffect(() => {
    const dataAtual = new Date();
    const mesAtual = dataAtual.toLocaleString('pt-BR', { month: 'long' });
    const anoAtual = dataAtual.getFullYear();
    const diaAtual = dataAtual.getDate().toString();
    setMesAno(`${mesAtual} • ${anoAtual}`);
    setDataSelecionada(diaAtual);

    fetch('https://agendafut-sv.vercel.app/jogos')
      .then(response => response.json())
      .then(data => {
        const datas = data.map(item => {
           const match = item.diaJogo.match(/([a-z]+), (\d{1,2})/);
          
          const dataEspecifica = new Date(2024, 0, match[2]); 
		  const diaDaSemanaEspecificado = dataEspecifica.toLocaleString('pt-BR', { weekday: 'short' });

          return { dia: match[2], diaSemana: diaDaSemanaEspecificado };
        });
        setDatasJogos(datas);
      })
      .catch(error => console.error('Erro na requisição:', error));
  }, []);

  const handleDataSelecionada = (dia) => {
    setDataSelecionada(dia);
  };

  return (
    <div style={styles.calendarioJogos}>
      <p style={styles.mesAno}>{mesAno}</p>
      <div style={styles.barraNavegacao}>
        {datasJogos.map(({ dia, diaSemana }) => (
          <div
            key={dia}
            style={{
              ...styles.circulo,
              ...(dia === dataSelecionada || (new Date().getDate().toString() === dia && !dataSelecionada) ? styles.selecionado : null),
            }}
            onClick={() => handleDataSelecionada(dia)}
            className={dia === dataSelecionada ? 'selecionado' : ''}
          >
            <p style={styles.dia}>{dia}</p>
            <p style={styles.diaSemana}>{diaSemana}</p>
          </div>
        ))}
      </div>
      {dataSelecionada && <JogosComponent diaSelecionado={dataSelecionada} />}
    </div>
  );
};

export default NavegacaoJogos;