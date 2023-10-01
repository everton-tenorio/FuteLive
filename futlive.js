function construirTabela(data) {
    var tabelasContainer = document.getElementById('tabelas-container')
    
    data.forEach(function(tableData) {
        var tableTitle = tableData.diaJogo
        var tableContent = tableData.content
                
        // Criar um elemento div para a tabela
        var tableDiv = document.createElement('div')

        // Criar um elemento div para a tabela de conteúdo
        var contentDiv = document.createElement('div')
        contentDiv.innerHTML = tableContent
                
        // Definir o título da tabela
        var titleElement = document.createElement('h2')

        var whatsappLink = document.createElement('a')
        whatsappLink.target = "_blank"
        whatsappLink.id = 'zap-link'
        contentDiv.querySelector('table').classList.add('table')
        contentDiv.querySelector('thead').classList.add('table-dark')
        var jogos_msg = contentDiv.querySelector('tbody').innerHTML
        var content_msg = `${tableTitle}%0A%20${jogos_msg.replace(/<tr>/g, '%0A%0A📺⚽').replace(/<\/tr>/g, '%0A').replace(/<\/td>/g, '\n').replace(/<[^>]*>/g, '%0A%20').replace(/\+/g, '%2B')}`

        if (window.innerWidth <= 768) {
            whatsappLink.href = `whatsapp://send?text=${content_msg}`;
        } else {
            whatsappLink.href = `https://web.whatsapp.com/send?text=${content_msg}`;
        }

        whatsappLink.innerHTML = '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/WhatsApp_icon.png/479px-WhatsApp_icon.png" width="35px">'
        whatsappLink.style = 'padding-left: 12px; font-size: 50px'
        titleElement.textContent = tableTitle
        titleElement.appendChild(whatsappLink)
        tableDiv.appendChild(titleElement)
                
        // A div da tabela de conteúdo é adicionada na tabela geral
        tableDiv.appendChild(contentDiv)
                
        // Adicionar a tabela ao contêiner
        tabelasContainer.appendChild(tableDiv)
    })
}
        
fetch('https://futlive-7txg8ka1e-everton-tenorios-projects.vercel.app/')
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        construirTabela(data)
    })
    .catch(function(error) {
        console.log('Erro:', error)
    })
