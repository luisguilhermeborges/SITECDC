// js/calculator.js

function CalculatorInit() {
  const adultsInput = document.getElementById('calc-adults');
  const childrenInput = document.getElementById('calc-children');
  const resultsDiv = document.getElementById('calc-results');

  if (!adultsInput || !childrenInput || !resultsDiv) {
    return;
  }

  const calculateBbq = () => {
    const adults = parseInt(adultsInput.value, 10) || 0;
    const children = parseInt(childrenInput.value, 10) || 0;

    if (adults === 0 && children === 0) {
      resultsDiv.innerHTML = '<h3>Preencha os campos para calcular</h3>';
      return;
    }

    // --- Lógica de Cálculo ---
    const MEAT_PER_ADULT = 0.450; // 450g
    const MEAT_PER_CHILD = 0.225; // 225g

    const totalMeat = (adults * MEAT_PER_ADULT) + (children * MEAT_PER_CHILD);
    const totalPeople = adults + children;

    const beef = totalMeat * 0.50;    // 50%
    const sausage = totalMeat * 0.25; // 25%
    const chicken = totalMeat * 0.25; // 25%
    const garlicBread = totalPeople;  // 1 por pessoa
    const charcoal = totalMeat * 1.0; // 1kg de carvão por kg de carne

    const formatKg = (value) => {
      if (value < 1) {
        return `${Math.round(value * 1000)} g`;
      }
      return `${value.toFixed(2).replace('.', ',')} kg`;
    };

    // --- Exibição dos Resultados ---
    resultsDiv.innerHTML = `
      <h3>Sugestão para seu churrasco:</h3>
      <div class="results-grid">
        <div class="result-item">
          <div class="label">Carne Bovina</div>
          <div class="value">${formatKg(beef)}</div>
        </div>
        <div class="result-item">
          <div class="label">Linguiça</div>
          <div class="value">${formatKg(sausage)}</div>
        </div>
        <div class="result-item">
          <div class="label">Frango</div>
          <div class="value">${formatKg(chicken)}</div>
        </div>
        <div class="result-item">
          <div class="label">Pão de Alho</div>
          <div class="value">${garlicBread} un</div>
        </div>
        <div class="result-item">
          <div class="label">Carvão</div>
          <div class="value">${formatKg(charcoal)}</div>
        </div>
      </div>
    `;
  };

  adultsInput.addEventListener('input', calculateBbq);
  childrenInput.addEventListener('input', calculateBbq);

  // Cálculo inicial
  calculateBbq();
}

window.CalculatorInit = CalculatorInit;