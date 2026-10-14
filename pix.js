(() => {
  const gifts = [...document.querySelectorAll('.pix-gift')];
  let codes;
  let loading;

  async function loadCodes() {
    if (codes) return codes;
    if (!loading) {
      loading = (async () => {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);
        try {
          const response = await fetch('pix-codes.json', { signal: controller.signal });
          if (!response.ok) throw new Error('Códigos indisponíveis');
          const data = await response.json();
          for (const amount of ['50', '100', '200']) {
            if (typeof data[amount] !== 'string' || !data[amount].startsWith('000201')) {
              throw new Error('Código inválido');
            }
          }
          codes = data;
          return codes;
        } finally {
          clearTimeout(timeout);
        }
      })();
    }
    try {
      return await loading;
    } catch (error) {
      loading = null;
      throw error;
    }
  }

  for (const gift of gifts) {
    const input = gift.querySelector('.pix-code');
    const button = gift.querySelector('.copy-pix');
    const status = gift.querySelector('.pix-status');
    gift.addEventListener('toggle', async () => {
      if (!gift.open || input.value) return;
      status.textContent = 'Carregando o código…';
      try {
        const data = await loadCodes();
        input.value = data[gift.dataset.amount];
        button.disabled = false;
        status.textContent = '';
      } catch {
        status.textContent = 'Não foi possível carregar o código. Use o QR Code ou feche e abra esta opção para tentar novamente.';
      }
    });
    button.addEventListener('click', async () => {
      if (!input.value) return;
      try {
        await navigator.clipboard.writeText(input.value);
        status.textContent = 'Pix copiado! Cole na opção Pix Copia e Cola do seu banco.';
      } catch {
        input.focus();
        input.select();
        input.setSelectionRange(0, input.value.length);
        status.textContent = 'Selecione e copie o código acima para colar no aplicativo do banco.';
      }
    });
  }
})();
