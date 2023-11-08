import React, { useEffect, useState } from 'react';

const TabelaJogos = () => {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://futlive-sv.vercel.app/');
        const data = await response.json();
        setDados(data);
      } catch (error) {
        console.error('Erro:', error);
      }
    };

    fetchData();
  }, []);

  const Tabela = ({ diaJogo, content }) => {
    const [whatsappLink, setWhatsappLink] = useState('');

    useEffect(() => {
      const jogosMsg = content.match(/<tbody>[\s\S]*<\/tbody>/)[0];
      const contentMsg = `${diaJogo}%0A%20${jogosMsg.replace(/<tr>/g, '%0A%0A📺⚽').replace(/<\/tr>/g, '%0A').replace(/<\/td>/g, '\n').replace(/<[^>]*>/g, '%0A%20').replace(/\+/g, '%2B')}%0A%20https://futlive.vercel.app/`;

      if (window.innerWidth <= 768) {
        setWhatsappLink(`whatsapp://send?text=${contentMsg}`);
      } else {
        setWhatsappLink(`https://web.whatsapp.com/send?text=${contentMsg}`);
      }
    }, [diaJogo, content]);

    const contentx = content.replace(/<colgroup[^>]*>[\s\S]*?<\/colgroup>/g, '');

    return (
      <div>
        <h2>{diaJogo}
          <a id="zap-link" href={whatsappLink} target="_blank" rel="noopener noreferrer">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/WhatsApp_icon.png/479px-WhatsApp_icon.png" alt="WhatsApp" width="35px" style={{ paddingLeft: '12px', fontSize: '50px' }} />
        </a></h2>
        <div dangerouslySetInnerHTML={{ __html: contentx }}></div>
      </div>
    );
  };

  return (
    <div>
      <div className="header">
        <a href="/"><img id="futlive-logo" src="./static/futlive.png" alt="FutLive Logo" width="1%"/> Futlive</a>
      </div>
      <div className="container">
        {dados.map((tableData) => (
          <Tabela key={tableData.title} diaJogo={tableData.diaJogo} content={tableData.content} />
        ))}
      </div>
    </div>
  );
};

export default TabelaJogos;
