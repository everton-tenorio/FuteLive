import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faCircle, faTrophy, faClock, faTv } from '@fortawesome/free-solid-svg-icons';
import styles from './styles';
import loadingImg from '../../assets/loading.gif';

const JogosComponent = ({ diaSelecionado }) => {
  const [jogos, setJogos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://agendafut-sv2.vercel.app/jogos');
        const data = await response.json();
        // Filtra os jogos apenas para o dia selecionado
        const jogosDoDia = data.filter(item => {
          const regexDia = /([a-z]+), (\d{1,2})/;
          const resultado = regexDia.exec(item.diaJogo);
          const diaCapturado = resultado ? resultado[2] : '';

          return diaCapturado === diaSelecionado;
        });

        setJogos(jogosDoDia);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao obter dados da API:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [diaSelecionado]);

  const dataAtual = new Date();
  const horaAtual = dataAtual.getHours();
  const diaAtual = dataAtual.getDate().toString();
  const formatoHora = horaAtual.toString().padStart(2, '0');

  return (
    <div className="container" style={styles.container}>
      {isLoading ? (
        <div style={{marginTop: '300px'}}><img src={loadingImg} alt="Carregando" width={30} /></div>
      ) : (
        jogos.map((item, index) => (
          <div className="row" key={index} style={styles.linhas}>
            <h3 style={styles.diaJogo}><FontAwesomeIcon icon={faBullseye} size="sm" color="red" />    {item.diaJogo}</h3>
            {item.content && item.content.map((jogo, jogoIndex) => {
              
              const regexDia = /([a-z]+), (\d{1,2})/;
              var resultado = regexDia.exec(item.diaJogo);
              var dia_data = ''
              let corHorario = ''
              if(resultado == null){
                resultado = ''
              } else {
                dia_data = resultado[2];
              }
              
              if (dia_data.toString().startsWith(diaAtual)){
                corHorario = jogo.horario.startsWith(formatoHora) ? 'red' : '#777';
                
              }

              return (
                <div key={jogoIndex} className="col-lg-4">
                  <div className="card" style={styles.card}>
                    <p style={styles.live}>
                      <FontAwesomeIcon style={{ color: corHorario }} icon={faCircle} size="lg" />
                    </p>
                    {/*<span style={{marginBottom: '10px'}}><img src='https://fla-bucket-s3-us.s3.amazonaws.com/public/images/escudos/1524865930.png' width={20}/> : <img src='https://fla-bucket-s3-us.s3.amazonaws.com/public/images/escudos/1640798653.png' width={20}/></span>*/}
                    <h4 style={styles.jogoTitle} className="card-title">{jogo.jogo}</h4>
                    <div style={styles.infoText} className="card-text">
                      <FontAwesomeIcon style={{ color: corHorario }} icon={faTrophy} size="lg" color="#777" />{` ${jogo.campeonato}`}
                    </div>
                    <div style={styles.infoText} className="card-text">
                      <FontAwesomeIcon style={{ color: corHorario }} icon={faClock} size="lg" color="#777" />{` ${jogo.horario}`}
                    </div>
                    <div style={styles.infoText} className="card-text">
                      <FontAwesomeIcon style={{ color: corHorario }} icon={faTv} size="lg" color="#777" /> <a href={`${jogo.url}`}>{`${jogo.ondePassa}`}  </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))
      )}
    </div>
  );
};

export default JogosComponent;
