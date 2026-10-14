(() => {
  const form = document.getElementById('rsvp');
  const fields = document.getElementById('rsvp-fields');
  const container = document.getElementById('guest-responses');
  const status = document.getElementById('status');
  const retry = document.getElementById('retry-invitation');
  const button = document.getElementById('send-rsvp');
  const code = new URLSearchParams(window.location.search).get('convite');
  const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  let people = [];
  let sending = false;

  async function requestApi(url, options = {}) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(url, {
        ...options,
        cache: 'no-store',
        signal: controller.signal
      });
      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error('Não foi possível acessar a confirmação. Tente novamente.');
      }
      if (!response.ok) {
        throw new Error(data.erro || 'Não foi possível registrar a resposta.');
      }
      return data;
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('A conexão demorou demais. Tente novamente.');
      }
      if (error instanceof TypeError) {
        throw new Error('Verifique sua conexão e tente novamente.');
      }
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  }

  function createPerson(person, index) {
    const card = document.createElement('div');
    card.className = 'rsvp-person';
    const heading = document.createElement('h3');
    heading.textContent = person.nome;
    card.append(heading);

    const label = document.createElement('label');
    label.htmlFor = `presence-${index}`;
    label.textContent = index === 0
      ? 'Você poderá comparecer?'
      : 'Esta criança poderá comparecer?';
    const select = document.createElement('select');
    select.id = label.htmlFor;
    select.required = true;
    for (const [value, text] of [
      ['', 'Selecione'],
      ['confirmada', 'Sim, estarei presente!'],
      ['recusada', 'Infelizmente, não poderei comparecer.']
    ]) {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = text;
      select.append(option);
    }
    select.value = ['confirmada', 'recusada'].includes(person.presenca)
      ? person.presenca : '';

    const messageLabel = document.createElement('label');
    messageLabel.htmlFor = `message-${index}`;
    messageLabel.textContent = index === 0
      ? 'Mensagem para os noivos (opcional)'
      : 'Observação sobre esta criança (opcional)';
    const message = document.createElement('textarea');
    message.id = messageLabel.htmlFor;
    message.rows = 3;
    message.maxLength = 1000;
    message.value = person.mensagem || '';
    const result = document.createElement('p');
    result.className = 'rsvp-person-status';
    result.setAttribute('aria-live', 'polite');
    card.append(label, select, messageLabel, message, result);
    container.append(card);
    return { person, select, message, result };
  }

  async function loadInvitation() {
    fields.disabled = true;
    fields.hidden = true;
    retry.hidden = true;
    container.replaceChildren();
    people = [];
    if (!code) {
      status.textContent = 'Abra o link pessoal do seu convite para confirmar sua presença.';
      return;
    }
    if (!uuid.test(code)) {
      status.textContent = 'Este link de convite é inválido. Confira o link recebido.';
      return;
    }
    status.textContent = 'Carregando seu convite…';
    try {
      const data = await requestApi(`/api/rsvp?codigo=${encodeURIComponent(code)}`);
      const guests = [data.convidado, ...(data.criancas || [])];
      if (!Array.isArray(data.criancas) || guests.some(person =>
        !person || !uuid.test(person.id) || typeof person.nome !== 'string'
      ) || new Set(guests.map(person => person.id)).size !== guests.length) {
        throw new Error('Não foi possível carregar os dados do convite.');
      }
      people = guests.map(createPerson);
      fields.hidden = false;
      fields.disabled = false;
      status.textContent = 'Seu convite está pronto. Confira e envie as respostas abaixo.';
    } catch (error) {
      status.textContent = error.message;
      retry.hidden = false;
    }
  }

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending || !people.length || !form.reportValidity()) return;
    sending = true;
    fields.disabled = true;
    button.textContent = 'Enviando…';
    status.textContent = 'Registrando as respostas…';
    let saved = 0;
    for (const { person, select, message, result } of people) {
      result.textContent = 'Enviando…';
      try {
        const data = await requestApi('/api/rsvp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            codigo: code,
            convidado_id: person.id,
            presenca: select.value,
            mensagem: message.value
          })
        });
        if (data.ok !== true) throw new Error('Não foi possível confirmar o registro.');
        result.textContent = 'Resposta registrada.';
        saved++;
      } catch (error) {
        result.textContent = `Resposta não confirmada: ${error.message}`;
      }
    }
    status.textContent = saved === people.length
      ? 'Todas as respostas foram registradas. Obrigado pelo carinho!'
      : `${saved} de ${people.length} respostas confirmadas. Confira as mensagens abaixo e tente enviar novamente.`;
    fields.disabled = false;
    button.textContent = 'Enviar confirmação';
    sending = false;
  });

  retry.addEventListener('click', loadInvitation);
  loadInvitation();
})();
