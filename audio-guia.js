/**
 * Sistema de Áudio Inteligente (Text-to-Speech)
 * Desenvolvido para os Guias de Estudo do Concurso Público 2026.
 * Proporciona leitura assistida por voz com realce visual em tempo real.
 */

(function() {
  // Determina e persiste o ministério actual para quando o utilizador voltar à página principal
  try {
    var path = window.location.pathname.toLowerCase();
    if (path.indexOf('minsa') >= 0) {
      localStorage.setItem('active_ministerio', 'Ministério_da_Saúde');
    } else if (path.indexOf('minint') >= 0 || path.indexOf('aptidao') >= 0) {
      localStorage.setItem('active_ministerio', 'Ministério_do_Interior');
    } else if (path.indexOf('med2026') >= 0) {
      localStorage.setItem('active_ministerio', 'Ministério_da_Educação');
    }
  } catch (err) {
    console.error('Erro ao guardar active_ministerio:', err);
  }

  // Configuração padrão
  var speechConfig = {
    rate: parseFloat(localStorage.getItem('audio-guia-rate')) || 1.0,
    voiceName: localStorage.getItem('audio-guia-voice') || '',
    activeHighlightClass: 'audio-active-highlight'
  };


  var state = {
    speaking: false,
    paused: false,
    elements: [],
    currentIndex: 0,
    activeCardId: null,
    voices: []
  };

  var synth = window.speechSynthesis;
  var currentUtterance = null;

  // Injetar CSS necessário para o player e realce
  var style = document.createElement('style');
  style.textContent = '\n' +
    '  .btn-audio-control {\n' +
    '    display: inline-flex; align-items: center; gap: 4px;\n' +
    '    padding: 4px 10px; border-radius: 6px; font-size: .75rem;\n' +
    '    font-weight: 700; cursor: pointer; transition: .2s; border: 1px solid rgba(59,130,246,.3);\n' +
    '    background: rgba(59,130,246,.1); color: var(--accent);\n' +
    '    margin-left: 8px; vertical-align: middle; user-select: none;\n' +
    '  }\n' +
    '  .btn-audio-control:hover {\n' +
    '    background: var(--accent); color: #fff; transform: scale(1.03);\n' +
    '  }\n' +
    '  .btn-audio-control.active {\n' +
    '    background: #ef4444 !important; color: #fff !important; border-color: #ef4444 !important;\n' +
    '  }\n' +
    '  .' + speechConfig.activeHighlightClass + ' {\n' +
    '    background: rgba(250,204,21,.15) !important;\n' +
    '    border-left: 4px solid var(--gold) !important;\n' +
    '    padding-left: 8px !important;\n' +
    '    transition: background 0.3s ease, border-left 0.2s ease;\n' +
    '  }\n' +
    '  /* Floating Audio Player */\n' +
    '  .audio-player-panel {\n' +
    '    position: fixed; bottom: 20px; right: 20px; z-index: 9999;\n' +
    '    width: 320px; background: rgba(15,23,42,.95); border: 1px solid var(--card-border);\n' +
    '    border-radius: 12px; padding: 14px; box-shadow: 0 10px 30px rgba(0,0,0,.5);\n' +
    '    backdrop-filter: blur(10px); display: none; flex-direction: column; gap: 10px;\n' +
    '    font-family: system-ui, -apple-system, sans-serif; color: var(--fg);\n' +
    '    animation: audioSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);\n' +
    '  }\n' +
    '  @keyframes audioSlideUp {\n' +
    '    from { transform: translateY(50px) scale(0.95); opacity: 0; }\n' +
    '    to { transform: translateY(0) scale(1); opacity: 1; }\n' +
    '  }\n' +
    '  .audio-player-header {\n' +
    '    display: flex; justify-content: space-between; align-items: center;\n' +
    '    border-bottom: 1px solid rgba(255,255,255,.1); padding-bottom: 8px;\n' +
    '  }\n' +
    '  .audio-player-title { font-size: .8rem; font-weight: 700; color: var(--gold); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 240px; }\n' +
    '  .audio-player-close { background: none; border: none; color: var(--fg3); font-size: 1.1rem; cursor: pointer; }\n' +
    '  .audio-player-close:hover { color: #ef4444; }\n' +
    '  .audio-player-body { display: flex; flex-direction: column; gap: 8px; }\n' +
    '  .audio-player-progress { font-size: .7rem; color: var(--fg2); display: flex; justify-content: space-between; }\n' +
    '  .audio-player-bar-bg { width: 100%; height: 4px; background: rgba(255,255,255,.1); border-radius: 2px; overflow: hidden; }\n' +
    '  .audio-player-bar-fill { height: 100%; width: 0%; background: var(--accent); transition: width 0.2s ease; }\n' +
    '  .audio-player-controls { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 4px; }\n' +
    '  .audio-btn-action { background: var(--bg3); border: 1px solid var(--card-border); color: var(--fg); padding: 6px 12px; border-radius: 6px; font-size: .8rem; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; transition: .15s; }\n' +
    '  .audio-btn-action:hover { background: var(--accent); color: #fff; border-color: var(--accent); }\n' +
    '  .audio-btn-play-pause { font-size: .9rem; font-weight: bold; background: var(--accent); color: #fff; border: none; padding: 6px 16px; }\n' +
    '  .audio-player-settings { display: flex; gap: 8px; font-size: .75rem; align-items: center; }\n' +
    '  .audio-player-select { background: var(--bg3); color: var(--fg); border: 1px solid var(--card-border); padding: 3px 6px; border-radius: 4px; font-size: .7rem; cursor: pointer; outline: none; }\n' +
    '  @media (max-width: 480px) {\n' +
    '    .audio-player-panel { width: calc(100% - 32px); left: 16px; bottom: 16px; }\n' +
    '  }\n';
  document.head.appendChild(style);

  // Criar elemento do Player Flutuante
  var player = document.createElement('div');
  player.className = 'audio-player-panel';
  player.id = 'audioFloatingPlayer';
  player.innerHTML = '\n' +
    '  <div class="audio-player-header">\n' +
    '    <span class="audio-player-title" id="audioPlayerTitle">Módulo 1</span>\n' +
    '    <button class="audio-player-close" id="audioPlayerClose" title="Fechar Player">&times;</button>\n' +
    '  </div>\n' +
    '  <div class="audio-player-body">\n' +
    '    <div class="audio-player-progress">\n' +
    '      <span id="audioProgressText">Carregando...</span>\n' +
    '      <span id="audioPercentText">0%</span>\n' +
    '    </div>\n' +
    '    <div class="audio-player-bar-bg">\n' +
    '      <div class="audio-player-bar-fill" id="audioProgressBar"></div>\n' +
    '    </div>\n' +
    '    <div class="audio-player-controls">\n' +
    '      <button class="audio-btn-action" id="audioBtnStop" title="Parar Leitura">⏹️ Parar</button>\n' +
    '      <button class="audio-btn-action audio-btn-play-pause" id="audioBtnPlayPause" title="Pausar/Retomar">⏸️ Pausa</button>\n' +
    '      <div class="audio-player-settings">\n' +
    '        <span>⚡</span>\n' +
    '        <select class="audio-player-select" id="audioRateSelect" title="Velocidade">\n' +
    '          <option value="0.8">0.8x</option>\n' +
    '          <option value="1.0" selected>1.0x</option>\n' +
    '          <option value="1.2">1.2x</option>\n' +
    '          <option value="1.5">1.5x</option>\n' +
    '          <option value="2.0">2.0x</option>\n' +
    '        </select>\n' +
    '        <select class="audio-player-select" id="audioVoiceSelect" style="max-width: 90px;" title="Selecionar Voz">\n' +
    '          <option value="">Voz Padrão</option>\n' +
    '        </select>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </div>\n';
  document.body.appendChild(player);

  // Inicializar Vozes
  function loadVoices() {
    if (!synth) return;
    state.voices = synth.getVoices().filter(function(v) {
      return v.lang.indexOf('pt-') === 0 || v.lang.indexOf('PT-') === 0;
    });
    
    var select = document.getElementById('audioVoiceSelect');
    if (!select) return;
    
    // Guardar a seleção atual
    var currentSel = select.value || speechConfig.voiceName;
    select.innerHTML = '<option value="">Voz Padrão</option>';
    
    state.voices.forEach(function(v) {
      var opt = document.createElement('option');
      opt.value = v.name;
      opt.textContent = v.name.replace(/Microsoft|Google|Apple/g, '').trim();
      if (v.name === currentSel) opt.selected = true;
      select.appendChild(opt);
    });
  }

  if (synth && synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = loadVoices;
  }
  setTimeout(loadVoices, 500);

  // Event Listeners do Player Flutuante
  document.getElementById('audioPlayerClose').addEventListener('click', stopReading);
  document.getElementById('audioBtnStop').addEventListener('click', stopReading);
  document.getElementById('audioBtnPlayPause').addEventListener('click', togglePlayPause);
  
  var rateSelect = document.getElementById('audioRateSelect');
  rateSelect.value = speechConfig.rate.toFixed(1);
  rateSelect.addEventListener('change', function() {
    speechConfig.rate = parseFloat(this.value);
    localStorage.setItem('audio-guia-rate', this.value);
    if (state.speaking && !state.paused) {
      // Para aplicar a nova velocidade imediatamente, reiniciamos a leitura do parágrafo atual
      var curIdx = state.currentIndex;
      pauseSynthesis();
      state.currentIndex = curIdx;
      state.paused = false;
      speakCurrentElement();
    }
  });

  var voiceSelect = document.getElementById('audioVoiceSelect');
  voiceSelect.addEventListener('change', function() {
    speechConfig.voiceName = this.value;
    localStorage.setItem('audio-guia-voice', this.value);
    if (state.speaking && !state.paused) {
      var curIdx = state.currentIndex;
      pauseSynthesis();
      state.currentIndex = curIdx;
      state.paused = false;
      speakCurrentElement();
    }
  });

  // Limpar texto de forma legível
  function cleanHTMLToSpokenText(element) {
    var clone = element.cloneNode(true);
    
    // Remover elementos que não devem ser lidos
    var ignores = clone.querySelectorAll('.sec-nav, button, script, style, .kbd-hint, code');
    ignores.forEach(function(el) { el.parentNode.removeChild(el); });

    // Tratar tabelas de forma especial para fazer sentido falado
    var tables = clone.querySelectorAll('table');
    tables.forEach(function(table) {
      var rows = table.querySelectorAll('tr');
      var spokenTable = '';
      rows.forEach(function(row) {
        var cells = row.querySelectorAll('th, td');
        var text = [];
        cells.forEach(function(c) {
          text.push(c.innerText.trim());
        });
        if (text.length > 0) {
          spokenTable += text.join(' equivale a ') + '. ';
        }
      });
      var p = document.createElement('p');
      p.innerText = spokenTable;
      table.parentNode.replaceChild(p, table);
    });

    // Se for uma lista de definições, converter
    var items = clone.querySelectorAll('li, h4, p, dt, dd');
    
    var rawText = clone.innerText.trim();
    // Limpezas adicionais de caracteres não legíveis
    return rawText
      .replace(/[\u2022\u2013\u2014]/g, '') // Remove marcadores/travessões
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Identificar blocos legíveis
  function gatherReadableElements(card) {
    var body = card.querySelector('.sec-body');
    if (!body) return [];
    
    // Selecionar os blocos que possuem conteúdo textual
    var rawList = body.querySelectorAll('p, li, h4, tr, blockquote, dt, dd');
    var validElements = [];
    
    rawList.forEach(function(el) {
      // Ignorar linhas de tabelas cujos filhos já vão ser processados, ou células diretamente
      if (el.tagName.toLowerCase() === 'tr' && el.querySelector('th')) {
        // Ignora cabeçalhos de tabela
        return;
      }
      // Se for item de lista ou parágrafo e não estiver vazio
      var text = el.innerText.trim();
      if (text.length > 3) {
        validElements.push(el);
      }
    });

    return validElements;
  }

  function startReadingCard(cardId) {
    if (state.speaking) {
      stopReading();
    }

    var card = document.getElementById(cardId);
    if (!card) return;

    var elements = gatherReadableElements(card);
    if (elements.length === 0) return;

    state.elements = elements;
    state.currentIndex = 0;
    state.speaking = true;
    state.paused = false;
    state.activeCardId = cardId;

    // Atualizar UI dos botões inline
    updateAllInlineButtons();

    // Mostrar e configurar Player Flutuante
    var playerTitle = document.getElementById('audioPlayerTitle');
    var cardTitle = card.querySelector('.sec-title');
    playerTitle.textContent = cardTitle ? cardTitle.innerText : 'Lendo Módulo';

    var panel = document.getElementById('audioFloatingPlayer');
    panel.style.display = 'flex';

    document.getElementById('audioBtnPlayPause').textContent = '⏸️ Pausa';

    speakCurrentElement();
  }

  function speakCurrentElement() {
    if (!state.speaking || state.currentIndex >= state.elements.length) {
      stopReading();
      return;
    }

    // Limpar destaques anteriores
    clearAllHighlights();

    var el = state.elements[state.currentIndex];
    
    // Aplicar destaque de leitura
    el.classList.add(speechConfig.activeHighlightClass);
    
    // Rolar suavemente para o elemento
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });

    var text = cleanHTMLToSpokenText(el);
    if (!text || text.length < 2) {
      // Salta elemento vazio
      state.currentIndex++;
      speakCurrentElement();
      return;
    }

    // Atualizar Progresso no Player
    updateProgressUI();

    // Criar Utterance
    currentUtterance = new SpeechSynthesisUtterance(text);
    
    // Definir voz preferida ou de português
    if (speechConfig.voiceName) {
      var v = state.voices.find(function(item) { return item.name === speechConfig.voiceName; });
      if (v) currentUtterance.voice = v;
    } else {
      // Fallback inteligente para português
      var defaultPt = state.voices.find(function(item) {
        return item.lang.indexOf('pt-PT') === 0 || item.lang.indexOf('pt-BR') === 0;
      });
      if (defaultPt) currentUtterance.voice = defaultPt;
    }

    currentUtterance.rate = speechConfig.rate;
    currentUtterance.lang = 'pt-PT';

    currentUtterance.onend = function() {
      if (state.speaking && !state.paused) {
        state.currentIndex++;
        speakCurrentElement();
      }
    };

    currentUtterance.onerror = function(e) {
      // Se for cancelado manualmente, não faz nada. Caso contrário, avança.
      if (e.error !== 'interrupted' && state.speaking && !state.paused) {
        state.currentIndex++;
        speakCurrentElement();
      }
    };

    synth.speak(currentUtterance);
  }

  function pauseSynthesis() {
    if (synth && synth.speaking && !state.paused) {
      synth.cancel(); // No Chrome/Safari Mobile, usar cancel é mais confiável do que synth.pause() que frequentemente trava o sintetizador
      state.paused = true;
      document.getElementById('audioBtnPlayPause').textContent = '▶️ Retomar';
    }
  }

  function resumeSynthesis() {
    if (state.speaking && state.paused) {
      state.paused = false;
      document.getElementById('audioBtnPlayPause').textContent = '⏸️ Pausa';
      speakCurrentElement();
    }
  }

  function togglePlayPause() {
    if (state.paused) {
      resumeSynthesis();
    } else {
      pauseSynthesis();
    }
  }

  // Parar leitura
  function stopReading() {
    state.speaking = false;
    state.paused = false;
    if (synth) {
      synth.cancel();
    }
    
    clearAllHighlights();
    
    // Ocultar painel flutuante
    var panel = document.getElementById('audioFloatingPlayer');
    if (panel) panel.style.display = 'none';

    state.elements = [];
    state.currentIndex = 0;
    state.activeCardId = null;

    updateAllInlineButtons();
  }

  function clearAllHighlights() {
    var highlighted = document.querySelectorAll('.' + speechConfig.activeHighlightClass);
    highlighted.forEach(function(el) {
      el.classList.remove(speechConfig.activeHighlightClass);
    });
  }

  function updateProgressUI() {
    var current = state.currentIndex + 1;
    var total = state.elements.length;
    var pct = Math.round((current / total) * 100);

    document.getElementById('audioProgressText').textContent = 'Parágrafo ' + current + ' de ' + total;
    document.getElementById('audioPercentText').textContent = pct + '%';
    document.getElementById('audioProgressBar').style.width = pct + '%';
  }

  function updateAllInlineButtons() {
    var btns = document.querySelectorAll('.btn-audio-control');
    btns.forEach(function(btn) {
      var targetId = btn.getAttribute('data-target');
      if (state.speaking && state.activeCardId === targetId) {
        btn.classList.add('active');
        btn.innerHTML = '⏹️ Parar';
      } else {
        btn.classList.remove('active');
        btn.innerHTML = '🔊 Ouvir';
      }
    });
  }

  // Injeção de botões dinâmica (executando periodicamente para acompanhar SPA ou renderizações assíncronas)
  function injectAudioButtons() {
    var cards = document.querySelectorAll('.section-card');
    cards.forEach(function(card) {
      var header = card.querySelector('.sec-header');
      if (!header) return;

      var navArea = header.querySelector('.sec-num') || header.querySelector('div');
      if (!navArea) return;

      // Verificar se já possui o botão de áudio
      if (!card.querySelector('.btn-audio-control')) {
        var btn = document.createElement('span');
        btn.className = 'btn-audio-control';
        btn.setAttribute('data-target', card.id);
        btn.innerHTML = '🔊 Ouvir';
        
        btn.addEventListener('click', function(e) {
          e.stopPropagation();
          var cid = this.getAttribute('data-target');
          if (state.speaking && state.activeCardId === cid) {
            stopReading();
          } else {
            startReadingCard(cid);
          }
        });

        navArea.appendChild(btn);
      }
    });
  }

  // Parar leitura se o utilizador trocar de módulo/mudar visualização
  function checkNavigationChange() {
    var observer = new MutationObserver(function() {
      // Se o cartão atual foi ocultado pelo sistema de paginação, paramos a leitura
      if (state.speaking && state.activeCardId) {
        var card = document.getElementById(state.activeCardId);
        if (card && card.classList.contains('hidden')) {
          stopReading();
        }
      }
    });

    var main = document.getElementById('content') || document.body;
    observer.observe(main, { attributes: true, subtree: true, attributeFilter: ['class'] });
  }

  // Iniciar verificador periódico e observadores
  setInterval(injectAudioButtons, 400);
  setTimeout(checkNavigationChange, 1000);

  // Exportar para uso externo caso seja necessário
  window.AudioGuia = {
    start: startReadingCard,
    stop: stopReading,
    state: state
  };
})();
