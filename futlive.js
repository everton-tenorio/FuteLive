function construirTabela(data) {
    var tabelasContainer = document.getElementById('tabelas-container')
    
    data.forEach(function(tableData) {
        var tableTitle = tableData.diaJogo
        var tableContent = tableData.content
                
        // Criar um elemento div para a tabela
        var tableDiv = document.createElement('div')
                
        // Definir o título da tabela
        var titleElement = document.createElement('h2')
        titleElement.textContent = tableTitle
        tableDiv.appendChild(titleElement)
                
        // Criar um elemento div para a tabela de conteúdo
        var contentDiv = document.createElement('div')
        contentDiv.innerHTML = tableContent
        tableDiv.appendChild(contentDiv)
                
        // Adicionar a tabela ao contêiner
        tabelasContainer.appendChild(tableDiv)
    })
}
        
fetch('URL API')
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        construirTabela(data)
    })
    .catch(function(error) {
        console.log('Erro:', error)
    })
