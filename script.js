document.getElementById('dddForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Previne o envio padrão do formulário

  const ddd = document.getElementById('dddInput').value;
  const resultDiv = document.getElementById('result');

  resultDiv.innerHTML = '<p>Buscando...</p>'; // Mensagem de carregamento

  fetch(`https://brasilapi.com.br/api/ddd/v1/${ddd}`)
    .then(response => response.json())
    .then(data => {
      if (data && data.cities && data.cities.length > 0) {
        resultDiv.innerHTML = `
                  <div class="card">
                      <div class="card-body">
                          <h5 class="card-title">Cidades encontradas para o DDD ${ddd}:</h5>
                          <ul class="list-group list-group-flush">
                              ${data.cities.map(city => `<li class="list-group-item">${city}</li>`).join('')}
                          </ul>
                      </div>
                  </div>
              `;
      } else {
        resultDiv.innerHTML = '<p class="text-danger">Nenhuma cidade encontrada para este DDD.</p>';
      }
    })
    .catch(error => {
      resultDiv.innerHTML = `<p class="text-danger">Erro ao buscar dados: ${error.message}</p>`;
    });
});
