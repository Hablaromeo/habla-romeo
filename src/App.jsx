import { useState, useEffect, useRef } from "react";

const SB_URL = "https://alcgjfmkhhyrolmbmxac.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsY2dqZm1raGh5cm9sbWJteGFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNDA5NTQsImV4cCI6MjA5NTgxNjk1NH0.x1OvAmeX3ve4t6XOCNOqQTObCSwvcHySBbu7QDiUIFk";
const ROMEO_PHOTO = "data:image/jpeg;base64,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";

// ── SUPABASE ──────────────────────────────────────────────────────────────────
const sb = {
  h: { "apikey": SB_KEY, "Authorization": `Bearer ${SB_KEY}`, "Content-Type": "application/json" },
  async upsert(table, data) {
    try {
      const r = await fetch(`${SB_URL}/rest/v1/${table}`, {
        method: "POST",
        headers: { ...this.h, "Prefer": "resolution=merge-duplicates" },
        body: JSON.stringify(Array.isArray(data) ? data : [data])
      });
      return r.ok;
    } catch { return false; }
  },
  async select(table, filter = "") {
    try {
      const r = await fetch(`${SB_URL}/rest/v1/${table}?${filter}`, { headers: this.h });
      if (!r.ok) return [];
      return await r.json();
    } catch { return []; }
  },
  async delete(table, id) {
    try {
      const r = await fetch(`${SB_URL}/rest/v1/${table}?id=eq.${id}`, { method: "DELETE", headers: this.h });
      return r.ok;
    } catch { return false; }
  }
};

// ── HELPERS ───────────────────────────────────────────────────────────────────
function todayStr() { return new Date().toISOString().split("T")[0]; }
function isWeekend(dateStr) {
  const d = dateStr ? new Date(dateStr + "T12:00:00") : new Date();
  return d.getDay() === 0 || d.getDay() === 6;
}
function getRomeoAge() {
  const birth = new Date("2024-09-18"), now = new Date();
  const months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
  const y = Math.floor(months / 12), m = months % 12;
  return y > 0 ? `${y} ano${y>1?"s":""} e ${m} ${m===1?"mês":"meses"}` : `${m} ${m===1?"mês":"meses"}`;
}
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2); }
function fmtDate(d) {
  const [y, m, day] = d.split("-");
  return `${day}/${m}/${y}`;
}
function monthDates(year, month) {
  const days = [], d = new Date(year, month, 1);
  while (d.getMonth() === month) { days.push(new Date(d)); d.setDate(d.getDate() + 1); }
  return days;
}
// Deterministic shuffle based on date seed
function seededShuffle(arr, seed) {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const j = Math.abs(s) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function dateSeed(dateStr) {
  return dateStr.split("-").reduce((acc, v) => acc * 100 + parseInt(v), 0);
}

// ── ACTIVITY BANK ─────────────────────────────────────────────────────────────
const MOMENTS_WD = [
  { id: "despertar", label: "🌅 Despertar", time: "09h00" },
  { id: "manha", label: "☀️ Manhã livre", time: "09h30–12h00" },
  { id: "almoco", label: "🍽️ Almoço", time: "12h30" },
  { id: "creche", label: "🏫 Creche", time: "13h00–18h00" },
  { id: "noite", label: "🌆 Noite com a família", time: "18h00–20h30" },
  { id: "banho", label: "🛁 Banho", time: "20h30" },
  { id: "sono", label: "🌙 Sono noturno", time: "21h00" },
];
const MOMENTS_WE = [
  { id: "despertar", label: "🌅 Despertar", time: "09h00" },
  { id: "manha", label: "☀️ Manhã livre", time: "09h30–12h00" },
  { id: "almoco", label: "🍽️ Almoço", time: "12h30" },
  { id: "tarde", label: "🌤️ Tarde em casa / rua", time: "13h00–18h00" },
  { id: "noite", label: "🌆 Noite com a família", time: "18h00–20h30" },
  { id: "banho", label: "🛁 Banho", time: "20h30" },
  { id: "sono", label: "🌙 Sono noturno", time: "21h00" },
];

const ALL_ACTIVITIES = [
  // DESPERTAR
  { id:"a01", moment:"despertar", title:"Bom dia nomeado", icon:"🌞", obj:"Expressões sociais + vocabulário",
    steps:["Ao acordar, chame pelo nome com entonação animada: 'Romeo, bom dia!'","Aponte para luz, janela, teto nomeando cada um.","Modele 'oi' com aceno e espere qualquer resposta.","Imite qualquer vocalização que ele fizer.","Repita 'bom dia' com o mesmo tom toda manhã."],
    variations:["Cante 'Bom dia' com o nome dele.","Nomeie o que ele vê primeiro ao abrir os olhos.","Use o espelho portátil — 'Bom dia, Romeo!'"],
    tip:"A mesma rotina verbal todo dia cria expectativa e facilita a fala." },
  { id:"a02", moment:"despertar", title:"Troca comentada", icon:"👶", obj:"Comandos simples + nomeação corporal",
    steps:["Durante a troca, nomeie cada passo: 'Levanta a perninha!'","Toque e nomeie partes do corpo: 'Barriguinha! Pezinho!'","Pause após cada comando e aguarde.","Celebre quando ele obedece ou vocaliza.","Introduza 'dá' — peça a fralda."],
    variations:["Pergunte 'Cadê o pezinho?' antes de pegar.","Faça cócegas nomeando: 'Cócegas na barriga!'","Espelho portátil na troca — 'Olha o Romeo!'"],
    tip:"Rotinas repetitivas são as melhores sessões de terapia — acontecem todo dia." },
  { id:"a03", moment:"manha", title:"Espelho de manhã", icon:"🪞", obj:"Imitação facial + vocabulário corporal",
    steps:["Segure o espelho portátil na frente dele.","Aponte para os olhos, nariz, boca nomeando.","Faça expressões exageradas e espere ele imitar.","Diga 'oi!' para o reflexo dele.","Modele beijo no espelho."],
    variations:["Espelho na parede — brincar de se ver.","Desenhe no vidro com o dedo enquanto nomeia.","'Cadê o nariz do Romeo?' no espelho."],
    tip:"O espelho é uma ferramenta poderosa para imitação facial e fala." },
  // MANHÃ
  { id:"a04", moment:"manha", title:"Pausa estratégica", icon:"⏸️", obj:"Intenção comunicativa espontânea",
    steps:["Escolha uma brincadeira favorita e inicie junto.","Após 1–2 min, pare completamente.","Olhe para ele com expressão de espera — silêncio.","Aguarde 5–10 segundos por qualquer sinal.","Qualquer sinal = continue a brincadeira imediatamente!"],
    variations:["Carrinho: empurre e pare na metade.","Música: cante e pare antes da palavra favorita.","Livro: vire a página e pause."],
    tip:"O silêncio estratégico é sua ferramenta mais poderosa para criar comunicação." },
  { id:"a05", moment:"manha", title:"Dois caminhos", icon:"🤔", obj:"Solicitação e escolha",
    steps:["Segure dois objetos à altura dos olhos dele.","Pergunte animado: 'Qual você quer?'","Aguarde qualquer indicação — olhar, alcance, apontar.","Entregue o escolhido e nomeie: 'Carrinho!'","Repita 3–4 vezes."],
    variations:["Dois animais — qual ele prefere?","Dois livros — qual quer ler?","Duas frutas no lanche."],
    tip:"A escolha é a forma mais natural de solicitar algo." },
  { id:"a06", moment:"manha", title:"Livro comentado", icon:"📚", obj:"Apontar + nomear + atenção compartilhada",
    steps:["Abra o livro de figuras no colo dele.","Espere ele tocar ou olhar antes de falar.","Quando mostrar interesse, nomeie: 'Leão! Raaaw!'","Deixe ele virar as páginas no ritmo dele.","Aponte e espere ele olhar na direção."],
    variations:["Faça sons dos animais das figuras.","Revistas com fotos de carros ou animais.","Livro de rotina com fotos dele mesmo."],
    tip:"Siga o interesse dele — nomeie o que ELE olha, não o que você quer mostrar." },
  { id:"a07", moment:"manha", title:"Imitação espelhada", icon:"🪞", obj:"Imitação motora e vocal",
    steps:["Sente no chão na frente dele, ao nível dos olhos.","Imite um som ou gesto QUE ELE FIZER primeiro.","Depois faça um gesto simples e aguarde.","Dê tempo real para ele processar.","Comemore qualquer tentativa, mesmo parcial."],
    variations:["Imite as onomatopeias que ele já sabe.","Expressões faciais exageradas no espelho portátil.","Turno de sons: você faz 'ba', ele faz 'ba'."],
    tip:"Quando você imita ele primeiro, cria muito mais engajamento." },
  { id:"a08", moment:"manha", title:"Alfabeto com sons", icon:"🔤", obj:"Associação som-letra + vocabulário",
    steps:["Pegue as letras do alfabeto uma por uma.","Para cada letra, diga o nome e uma palavra: 'A de abelha!'","Faça o som do animal ou objeto quando possível.","Deixe ele segurar e explorar a letra.","Repita a mesma letra 3–4 vezes antes de trocar."],
    variations:["Foque nas letras do nome dele: R-O-M-E-O.","Associe letra a objeto real: 'B' + bola.","Esconda letras e pergunte 'Cadê o A?'"],
    tip:"O objetivo não é ensinar o alfabeto — é criar associações som-símbolo." },
  { id:"a09", moment:"manha", title:"Microfone e voz", icon:"🎤", obj:"Vocalização espontânea + volume de voz",
    steps:["Ofereça o microfone de brinquedo para ele.","Fale no microfone você mesmo primeiro: 'Oi Romeo!'","Espere ele colocar na boca ou vocalizar.","Imite qualquer som que ele fizer de volta.","Alterne: você fala, ele fala."],
    variations:["Cante no microfone e pause esperando ele continuar.","Faça sons de animais no microfone.","Grave sons num celular e reproduza para ele ouvir."],
    tip:"O microfone vira um objeto motivador para vocalização — use bastante." },
  { id:"a10", moment:"manha", title:"Esconde-esconde de objetos", icon:"🔍", obj:"Permanência + vocabulário",
    steps:["Esconda objeto favorito sob um pano ou pote.","Pergunte: 'Cadê o carrinho?'","Aguarde ele procurar, apontar ou vocalizar.","Revele com entusiasmo: 'Achou! Aqui está!'","Aumente: 2 potes, qual tem?"],
    variations:["Esconda a bola atrás das costas.","'Cadê o pai/mãe?' — apareça de trás da porta.","Esconda letras do alfabeto pela casa."],
    tip:"Ele tem boa permanência do objeto — use para criar comunicação." },
  { id:"a11", moment:"manha", title:"Lousa mágica e fala", icon:"🖊️", obj:"Atenção + nomeação + causa-efeito",
    steps:["Desenhe na lousa mágica um objeto simples: círculo = bola.","Nomeie enquanto desenha: 'Bola!'","Deixe ele apagar — comemore: 'Sumiu!'","Deixe ele riscar e imite o que ele fizer.","Alterne: você desenha, ele apaga e vice-versa."],
    variations:["Desenhe um animal e faça o som.","Escreva o nome dele: R-O-M-E-O.","Desenhe partes do rosto nomeando cada uma."],
    tip:"A lousa mágica combina causa-efeito com vocabulário — combinação poderosa." },
  { id:"a12", moment:"manha", title:"Construção e derrubada", icon:"🧱", obj:"Vocabulário de ação + antecipação",
    steps:["Monte torre de blocos juntos nomeando: 'Mais um!'","Use palavras de ação: 'Coloca! Empurra! Caiu!'","Deixe ele derrubar — antecipação gera vocalização.","Recomece com 'de novo?' e gesto.","Pause antes de colocar o próximo bloco."],
    variations:["Torre de copos de plástico.","Construa e peça para ele demolir com a bola.","Contar blocos: 'Um... dois... três... caiu!'"],
    tip:"A antecipação 'vai cair!' gera vocalização espontânea." },
  { id:"a13", moment:"manha", title:"Fazendinha de sons", icon:"🐄", obj:"Onomatopeias + vocabulário de animais",
    steps:["Use animais da fazenda (brinquedo ou figuras).","Mostre cada animal e faça o som correspondente.","Aguarde imitação antes de trocar de animal.","Esconda um e pergunte: 'Quem sumiu?'","Celebre qualquer tentativa de som."],
    variations:["Sons da fazenda com música de fundo.","Imitar o movimento do animal + som.","'A vaca faz...' e pause esperando ele completar."],
    tip:"Ele já sabe várias onomatopeias — isso é fala real em desenvolvimento!" },
  { id:"a14", moment:"manha", title:"Safari de sons", icon:"🦁", obj:"Onomatopeias + vocabulário de animais selvagens",
    steps:["Use animais selvagens (brinquedo, figuras ou tablet).","Apresente cada animal com som exagerado.","Faça o movimento + som: leão ruge e mostra garras.","Alterne: você mostra o animal, ele faz o som.","Esconda atrás das costas e pergunte 'Quem é?'"],
    variations:["Livro de animais selvagens com figuras grandes.","Vídeo curto do animal real (30 segundos).","Adivinhe o animal pelo som."],
    tip:"Sons de animais selvagens são altamente motivadores para vocalização." },
  { id:"a15", moment:"manha", title:"Corpo no espelho", icon:"🧍", obj:"Vocabulário corporal + imitação",
    steps:["Fique na frente do espelho grande (ou portátil) com ele.","Toque uma parte do corpo e nomeie: 'Orelha!'","Espere ele tocar também.","'Cadê o nariz do Romeo?' — aponte no espelho.","Faça expressões: feliz, surpreso, triste."],
    variations:["Cabeça Ombro Joelho e Pé na frente do espelho.","Contar dedos nomeando: 'Um dedinho...'","Imitar caretas no espelho."],
    tip:"O espelho portátil permite ver a própria boca — essencial para imitação de fala." },
  { id:"a16", moment:"manha", title:"Percussão corporal", icon:"🥁", obj:"Ritmo + imitação + vocalização",
    steps:["Bata palmas com ritmo simples e espere ele imitar.","Bata na barriga, no chão, na perna — nomeie cada parte.","Adicione um som ao ritmo: 'pa-pa-pa' enquanto bate.","Varie o ritmo lento/rápido.","Deixe ele criar o ritmo e você imita."],
    variations:["Instrumentos caseiros: pote com arroz, colher na panela.","Ritmo com as palavras do nome dele: Ro-me-o.","Imitar ritmo de músicas favoritas."],
    tip:"Ritmo e fala usam as mesmas áreas cerebrais — percussão estimula a fala." },
  { id:"a17", moment:"manha", title:"Turno de sons", icon:"🔊", obj:"Imitação vocal + alternância comunicativa",
    steps:["Sente na frente dele ao nível dos olhos.","Faça um som simples: 'ba!'","Aguarde ele responder com qualquer som.","Responda de volta — crie uma conversa de sons.","Varie: 'ba' → 'ma' → 'da' → 'pa'"],
    variations:["Imite o jargão dele de volta (conversa de bebê).","Alternância com o microfone.","Sons de animais em alternância."],
    tip:"A alternância de turnos é a base da conversa — pratique com sons antes de palavras." },
  // ALMOÇO
  { id:"a18", moment:"almoco", title:"Nomeação na mesa", icon:"🥦", obj:"Vocabulário + solicitação",
    steps:["Nomeie cada alimento ao servir: 'Arroz! Feijão!'","Ofereça poucos pedaços — espere ele pedir mais.","Modele 'mais?' abrindo a mão.","Use frases curtas: 'Quer mais?'","Celebre vocalizações como pedidos legítimos."],
    variations:["Apresente o alimento antes de servir, deixe tocar.","Sons de aprovação: 'Mmm, gostoso!'","Pergunte 'Cadê o feijão?' e aponte junto."],
    tip:"3 refeições por dia = 3 sessões de estimulação naturais." },
  { id:"a19", moment:"almoco", title:"Colher na mão", icon:"🥄", obj:"Autonomia alimentar + vocabulário de ação",
    steps:["Coloque comida mole no prato (purê, iogurte).","Guie a mão dele para pegar a colher.","Solte antes da boca — deixe ele completar.","Comente cada ação: 'Abre! Come! Mmm!'","Celebre qualquer tentativa."],
    variations:["Pratique o gesto da colher sem comida primeiro.","Use comida favorita para motivar.","Nomeie a textura: 'Mole! Quente! Gostoso!'"],
    tip:"Autonomia alimentar e fala se desenvolvem juntas — ambas pedem controle motor oral." },
  { id:"a20", moment:"almoco", title:"Escolha do almoço", icon:"🍽️", obj:"Solicitação + vocabulário alimentar",
    steps:["Antes de servir, mostre dois alimentos.","Pergunte: 'Quer arroz ou macarrão?'","Aguarde qualquer indicação de preferência.","Sirva o escolhido e confirme: 'Arroz! Escolheu arroz!'","Repita com sobremesa ou suco."],
    variations:["Mostrar a fruta do lanche antes de descascar.","Duas cores de suco — qual prefere?","Deixe ele apontar para o prato que quer."],
    tip:"Refeições são contexto natural para pedidos — use todas as vezes." },
  // TARDE/CRECHE
  { id:"a21", moment:"noite", title:"Pinico com ritual", icon:"🚽", obj:"Autonomia + rotina verbal",
    steps:["Horários fixos: ao acordar, pós-refeições, pré-banho.","Frase fixa: 'Hora do pinico!'","Celebre muito quando faz: 'Muito bem! Fez no pinico!'","Se recusar, tente em 15 min.","Associe palavras: 'Xixi! Cocô!'"],
    variations:["Livro ou música só para hora do pinico.","Sticker de recompensa visível.","Deixe ele escolher ir antes ou depois do lanche."],
    tip:"Ele já senta quando solicitado — o próximo passo é a antecipação espontânea." },
  // TARDE (FDS)
  { id:"a22", moment:"tarde", title:"Passeio comentado", icon:"🌳", obj:"Vocabulário contextual + atenção compartilhada",
    steps:["Nomeie o que aparece: 'Cachorro! Au-au!'","Aponte e ESPERE ele olhar antes de nomear.","Quando ele olhar para algo, você nomeia.","Use sempre a mesma palavra para o mesmo estímulo.","Celebre quando olhar na direção que você apontou."],
    variations:["Nomeie veículos com sons: carro, moto, ônibus.","Cumprimente pessoas: 'Oi!' com aceno.","Parquinho: nomeie cada brinquedo e ação."],
    tip:"Fale sobre o que ELE está olhando, não o que você quer que ele veja." },
  { id:"a23", moment:"tarde", title:"Caminhões em ação", icon:"🚛", obj:"Vocabulário de veículos + onomatopeias + faz-de-conta",
    steps:["Pegue os caminhões e brinque no chão com ele.","Nomeie cada um: 'Caminhão de lixo! Caminhão de bombeiro!'","Faça sons: 'Vruum! Bibi! Nino nino!'","Simule carregar e descarregar: 'Põe! Tira!'","Pause o caminhão e espere ele pedir para continuar."],
    variations:["Pista de obstáculos com livros e blocos.","Caminhão que transporta os animais da fazenda.","'O caminhão foi para onde?' — esconda e pergunte."],
    tip:"Caminhões combinam interesse dele com vocabulário rico de ações e sons." },
  { id:"a24", moment:"tarde", title:"Brincadeira livre comentada", icon:"🚗", obj:"Vocabulário em ação",
    steps:["Deixe ele liderar — siga o interesse.","Comente o que ele faz: 'O carro está andando!'","Entre na brincadeira e imite suas ações.","Faça pausas estratégicas.","Introduza um elemento novo."],
    variations:["Circuito de carrinhos com obstáculos.","Animais de borracha na bacia de água.","Corrida de carrinhos com narração."],
    tip:"A brincadeira livre é quando ele está mais comunicativo." },
  { id:"a25", moment:"tarde", title:"Animais selvagens em cena", icon:"🦒", obj:"Vocabulário + sons + faz-de-conta",
    steps:["Monte uma 'selva' com almofadas e brinquedos.","Cada animal tem nome + som + movimento.","'O leão está com fome — raaaw!'","Esconda animais na selva e pergunte 'Cadê o elefante?'","Crie uma história simples com 2–3 animais."],
    variations:["Documentário curto de animal no tablet (30 seg).","Imitar o andar de cada animal.","'Quem é o rei da selva?' — espere resposta."],
    tip:"Faz-de-conta com animais é uma das formas mais ricas de estimular a fala." },
  { id:"a26", moment:"tarde", title:"Quadro do corpo", icon:"🧩", obj:"Vocabulário corporal + nomeação",
    steps:["Monte o quadro de partes do corpo juntos.","Nomeie cada peça ao encaixar: 'Olho! Nariz! Boca!'","Retire uma peça e pergunte: 'O que sumiu?'","Aponte no corpo dele a mesma parte: 'Onde está seu olho?'","Deixe ele encaixar e você nomeia."],
    variations:["Musiquinha enquanto encaixa as peças.","Compare com o espelho: 'Igual ao Romeo!'","Toque a parte do corpo e espere ele apontar no quadro."],
    tip:"Vocabulário corporal é base para muitas outras comunicações." },
  { id:"a27", moment:"tarde", title:"Safari fotográfico", icon:"📸", obj:"Vocabulário + atenção compartilhada",
    steps:["Caminhe pela casa ou rua com ele.","Quando ele apontar para algo, fotografe.","Mostre a foto na hora: 'Olha! O cachorro!'","Nomeie o que ele escolheu fotografar.","Reveja as fotos juntos depois."],
    variations:["Fotografar animais no passeio.","Fotografar brinquedos favoritos.","Imprimir as fotos e fazer um livro caseiro."],
    tip:"Seguir o interesse dele e registrar cria atenção compartilhada genuína." },
  { id:"a28", moment:"tarde", title:"Caixinha de palavras", icon:"📦", obj:"Vocabulário + solicitação",
    steps:["Coloque 5–6 objetos cotidianos numa caixa.","Retire um por vez com entusiasmo: 'O quê é isso?'","Nomeie e use funcionalmente: colher mexe, carro anda.","Esconda um objeto: 'Cadê a colher?'","Deixe ele tirar e você nomeia."],
    variations:["Caixa só com animais da fazenda.","Caixa surpresa — objeto embrulhado.","Caixa com objetos da rotina dele."],
    tip:"Objetos cotidianos têm mais impacto que brinquedos novos." },
  { id:"a29", moment:"tarde", title:"Sopro e respiração", icon:"💨", obj:"Controle motor oral — precursor de fala",
    steps:["Mostre como soprar apagando uma vela (segura você).","Sopre num canudo dentro de copo d'água — bolhas!","Sopre um papel — quem derruba?","Encha uma bochecha e deixe ele apertar para sair o ar.","Sopre sua franja ou cabelo dele."],
    variations:["Moinhos de vento de papel.","Bolhas de sabão para soprar.","Soprar bolinhas de algodão numa mesa."],
    tip:"Controle de sopro é exercício direto para os músculos da fala." },
  { id:"a30", moment:"tarde", title:"Vogais cantadas", icon:"🎵", obj:"Produção vocal + imitação de sons da fala",
    steps:["Cante apenas vogais com entonação variada: 'Aaaaa!'","Faça cada vogal com expressão exagerada na boca.","Use o espelho para ele ver a boca abrindo.","Aguarde qualquer tentativa de imitação.","Combine vogais: 'Aaa-eee-ooo'"],
    variations:["Cantar vogais com diferentes volumes.","Vogais no microfone de brinquedo.","Vogais associadas a expressões: 'Aaaa' de susto."],
    tip:"Vogais são os primeiros sons da fala — treinar produção é estimulação direta." },
  { id:"a31", moment:"tarde", title:"Tablet com sons", icon:"📱", obj:"Imitação vocal + vocabulário",
    steps:["Selecione app ou vídeo com animais e sons (máx 5 min).","Pause o vídeo e faça o som junto com ele.","Pergunte antes de revelar: 'Quem vai aparecer?'","Nomeie cada animal quando aparecer.","Imite os sons juntos."],
    variations:["App de instrumentos musicais.","Vídeo de fazenda com sons reais.","Pausar e perguntar 'O que o leão faz?'"],
    tip:"Use o tablet com intencionalidade — pause, nomeie e interaja, não apenas assista." },
  { id:"a32", moment:"tarde", title:"Partes do rosto no espelho", icon:"😊", obj:"Vocabulário corporal + imitação de fala",
    steps:["Segure o espelho portátil na frente de vocês dois.","Aponte partes do rosto nomeando: 'Boca! Língua! Dentes!'","Faça movimentos de boca exagerados: abrir, fechar, esticar.","Mostre a língua e espere ele imitar.","'Faz igual!' apontando para o espelho."],
    variations:["Soprar no espelho e ver o vapor.","Fazer barulho com os lábios: 'Brrrr!'","Sorrir, fazer bico, abrir a boca — cada um com nome."],
    tip:"Ver a própria boca no espelho é fundamental para aprender a produzir sons." },
  // NOITE
  { id:"a33", moment:"noite", title:"Passeio sensorial", icon:"🌆", obj:"Vocabulário + experiência compartilhada",
    steps:["Nomeie o que ele toca e vê.","Busque elementos sensoriais: vento, textura, temperatura.","Celebre onomatopeias espontâneas.","Aponte para o céu: 'Lua! Estrela!'","Pratique 'tchau' para pessoas que cruzarem."],
    variations:["Leve a bola e pratique chutar.","Observe bichos: formigas, pássaros, cachorros.","Cumprimentar pessoas no caminho."],
    tip:"O passeio noturno é quando ele está mais relaxado e comunicativo." },
  { id:"a34", moment:"noite", title:"Música com pausa", icon:"🎵", obj:"Intenção comunicativa + antecipação",
    steps:["Cante uma música conhecida.","Pare antes de uma palavra que ele espera.","Aguarde qualquer reação — olhar, sorriso, som.","Continue a música como recompensa.","Repita a mesma pausa 3–4 vezes."],
    variations:["'Incy Wincy Spider' — pare no gesto da aranha.","Música de animais — pare antes do som do bicho.","Parabéns — pare antes do nome."],
    tip:"Antecipação musical é um gatilho poderoso para vocalização." },
  { id:"a35", moment:"noite", title:"Microfone karaokê", icon:"🎙️", obj:"Vocalização espontânea + volume de voz",
    steps:["Ofereça o microfone com música animada de fundo.","Cante no microfone você mesmo com entusiasmo.","Passe o microfone e aguarde qualquer vocalização.","Imite de volta o que ele fizer no microfone.","Alternem: você canta, ele canta."],
    variations:["Músicas com refrão simples e repetitivo.","Sons de animais no microfone.","Cantar o nome dele no microfone."],
    tip:"O microfone amplifica a voz e motiva a criança a vocalizar mais." },
  { id:"a36", moment:"noite", title:"Rima do dia", icon:"🎭", obj:"Consciência fonológica + fala",
    steps:["Crie rimas simples com o nome ou rotina dele.","'Romeo tomou banho, ficou tão bom!'","Repita a rima com entonação exagerada.","Pause antes da última palavra da rima.","Bata palmas no ritmo."],
    variations:["Rimas com os animais que ele conhece.","'Au-au fez o cão, no quintal do João'","Rimas com onomatopeias: 'Vrum vrum foi o carro..."],
    tip:"Rimas desenvolvem consciência fonológica — base para leitura e fala." },
  { id:"a37", moment:"noite", title:"Álbum da família", icon:"👨‍👩‍👦", obj:"Vocabulário + expressões sociais",
    steps:["Folheie álbum ou fotos no celular com ele.","Para cada foto, nomeie: 'Vovó! Titia! Pai!'","Pergunte: 'Cadê o papai?' e aguarde ele apontar.","Modele expressões: 'Oi vovó! Tchau vovó!'","Celebre quando ele reconhecer alguém."],
    variations:["Fotos dele bebê — 'Olha o Romeo pequenininho!'","Vídeo curto de familiar querido.","Foto de pessoas presentes na rotina."],
    tip:"Pessoas amadas são os motivadores mais poderosos para comunicação social." },
  { id:"a38", moment:"noite", title:"Eco de sons", icon:"🔁", obj:"Imitação vocal + alternância",
    steps:["Faça um som simples e aguarde ele repetir.","Comece com sons que ele já faz: 'au-au'","Aumente gradualmente: 'au-au-au'","Inverta: deixe ele fazer e você repita.","Misture sons conhecidos em sequências novas."],
    variations:["Sons de animais em eco.","Sílabas em eco: 'ba-ba', 'ma-ma'","Eco com o microfone de brinquedo."],
    tip:"O eco ensina que a comunicação é uma troca — alguém fala, alguém responde." },
  // BANHO
  { id:"a39", moment:"banho", title:"Banho comunicativo", icon:"🛁", obj:"Nomeação + comandos + expressões sociais",
    steps:["Nomeie partes do corpo: 'Cabeça! Ombro! Barriga!'","Use comandos simples: 'Levanta o braço!'","Brinque de dar e receber brinquedos na água.","Ao terminar, modele 'tchau' para os brinquedos.","Cante Cabeça Ombro Joelho e Pé."],
    variations:["Esconda brinquedos na espuma: 'Cadê o pato?'","Bolhas de sabão — soprar juntos.","Nomeie as ações: 'Lava! Esfrega! Enxuga!'"],
    tip:"O relaxamento do banho abre espaço para trocas espontâneas." },
  { id:"a40", moment:"banho", title:"Sopro de bolhas", icon:"🫧", obj:"Controle motor oral + vocalização",
    steps:["Use sabonete líquido para fazer espuma.","Mostre como soprar para fazer bolhas.","Aguarde ele tentar soprar também.","Nomeie: 'Bolha! Sopra! Sumiu!'","Comemorem juntos quando a bolha estoura."],
    variations:["Canudo dentro do copo d'água — bolhas na banheira.","Soprar penas ou papeis leves.","Quem faz a bolha maior?"],
    tip:"Soprar é o exercício mais direto para os músculos usados na fala." },
  // SONO
  { id:"a41", moment:"sono", title:"Ritual de sono", icon:"🌙", obj:"Rotina previsível + expressões sociais",
    steps:["Siga sempre a mesma sequência pré-sono.","Nomeie cada etapa: 'Hora de dormir! Luz apagada.'","Leia um livro curto com figuras simples.","Modele 'boa noite' com beijo e aceno.","Música de ninar enquanto deita."],
    variations:["Mesmo livro por vários dias.","'Boa noite' para cada brinquedo do quarto.","Massagem suave com nomeação do corpo."],
    tip:"Rotinas previsíveis reduzem ansiedade e facilitam a comunicação." },
  { id:"a42", moment:"sono", title:"Livro de rotina", icon:"📖", obj:"Sequência + vocabulário de rotina",
    steps:["Faça um livro caseiro com fotos da rotina dele (banho, comida, sono).","Antes de dormir, folheie contando o dia: 'Hoje o Romeo tomou banho!'","Aponte as fotos e nomeie cada momento.","Deixe ele virar as páginas.","Termine com: 'Agora é hora de dormir!'"],
    variations:["Fotos reais do dia a dia dele.","Desenhos simples de cada momento.","Ele aponta cada foto enquanto você narra."],
    tip:"Narrar o dia cria consciência de sequência temporal e vocabulário de rotina." },
  // EXTRA - podem aparecer em múltiplos momentos
  { id:"a43", moment:"manha", title:"Foto e nome", icon:"🖼️", obj:"Vocabulário + atenção compartilhada",
    steps:["Imprima ou mostre fotos de objetos favoritos.","Mostre cada foto e nomeie claramente.","Espalhe 3 fotos e pergunte: 'Cadê a bola?'","Aguarde ele apontar ou vocalizar.","Celebre a escolha certa com entusiasmo."],
    variations:["Fotos de animais que ele já conhece.","Fotos de pessoas da família.","Criar jogo da memória com as fotos."],
    tip:"Associar imagem à palavra é um passo fundamental no desenvolvimento da fala." },
  { id:"a44", moment:"tarde", title:"Sons da casa", icon:"🏠", obj:"Identificação de sons + vocabulário",
    steps:["Faça sons comuns da casa: campainha, telefone, liquidificador.","Pergunte: 'O que é isso?' antes de revelar.","Aguarde qualquer resposta — olhar, vocalização.","Revele e nomeie: 'É o telefone! Rinrim!'","Deixe ele explorar o objeto que faz o som."],
    variations:["Sons de aparelhos da cozinha.","Sons externos: chuva, passarinho, carro.","Imitar os sons juntos."],
    tip:"Identificar sons do ambiente desenvolve atenção auditiva — base para a fala." },
  { id:"a45", moment:"manha", title:"Nomeação no mercado", icon:"🛒", obj:"Vocabulário funcional + atenção compartilhada",
    steps:["Durante compras, nomeie o que ele toca ou olha.","Deixe ele segurar itens seguros: frutas, embalagens.","'O que é isso? É a maçã! Vermelha!'","Pergunte: 'Cadê a banana?' e aguarde ele procurar.","Celebre quando encontrar."],
    variations:["Seção de frutas — cores e nomes.","Seção de animais (se houver pet shop).","Nomear pessoas que passam: 'Bebê! Vovó!'"],
    tip:"O supermercado é um ambiente rico e real para vocabulário funcional." },
  { id:"a46", moment:"noite", title:"Janela do mundo", icon:"🌇", obj:"Vocabulário contextual + comentários espontâneos",
    steps:["Sente com ele na janela ou varanda.","Nomeie tudo que passa: 'Carro! Moto! Cachorro!'","Quando ele apontar, você nomeia imediatamente.","'O que mais vai passar?' — crie expectativa.","Acenar para pessoas que passam: 'Oi! Tchau!'"],
    variations:["Observar o céu: nuvem, sol, lua, estrela.","Contar carros de determinada cor.","Janela à noite: 'Escuro! Lua! Estrela!'"],
    tip:"A janela é um cinema gratuito para vocabulário — use diariamente." },
  { id:"a47", moment:"manha", title:"Instrumento caseiro", icon:"🥁", obj:"Ritmo + imitação + vocalização",
    steps:["Faça instrumentos: pote com feijão, colher na panela.","Crie um ritmo simples e espere ele imitar.","Adicione vocalizações ao ritmo: 'pa-pa-pa!'","Alterne: você cria, ele imita. Ele cria, você imita.","Acelere e desacelere o ritmo."],
    variations:["Dois instrumentos iguais — tocam juntos.","Ritmo do nome: Ro-me-o.","Acompanhar música favorita com instrumento."],
    tip:"Ritmo é a base da fala — sílabas têm ritmo assim como músicas." },
  { id:"a48", moment:"tarde", title:"Parquinho nomeado", icon:"🛝", obj:"Vocabulário de ação + pedidos espontâneos",
    steps:["No parquinho, nomeie cada brinquedo: 'Escorregador! Balanço!'","Antes de colocar no balanço, espere ele pedir (gesto ou som).","'Vai!' com gesto no escorregador — aguarde reação.","Nomeie sensações: 'Rápido! Devagar! Weee!'","Pratique 'mais!' na gangorra."],
    variations:["Outros pais e crianças — modelar 'oi' e 'tchau'.","Areia: nomear o que constrói.","'Vai de novo?' e aguardar pedido."],
    tip:"O parquinho é ambiente natural para pedidos espontâneos — não antecipe." },
  { id:"a49", moment:"manha", title:"Um livro, uma palavra", icon:"📕", obj:"Foco em vocabulário + repetição",
    steps:["Escolha UM livro favorito.","Escolha UMA palavra por página para focar.","Repita essa palavra sempre que abrir aquela página.","Use tons diferentes: sussurro, animado, surpreso.","Depois de vários dias, pare antes da palavra e espere."],
    variations:["Livro de animais — uma onomatopeia por página.","Livro de objetos — o nome do objeto.","Repetir o livro inteiro várias vezes seguidas."],
    tip:"Repetição no mesmo contexto é como palavras entram no vocabulário ativo." },
  { id:"a50", moment:"noite", title:"Conversa do dia", icon:"💬", obj:"Narrativa + vocabulário + memória",
    steps:["Antes de dormir, relembre o dia com ele.","'Hoje o Romeo foi ao parque! Weee!'","Use fotos do dia se tiver tirado.","Faça perguntas simples: 'O que você comeu?'","Nomeie emoções: 'Você ficou feliz no parque!'"],
    variations:["Desenho rápido do momento favorito do dia.","Mostrar os brinquedos que usou no dia.","'O que foi mais gostoso hoje?'"],
    tip:"Narrar o dia desenvolve memória, sequência e vocabulário emocional." },
  { id:"a51", moment:"manha", title:"Lousa e letras", icon:"✏️", obj:"Consciência de escrita + vocabulário",
    steps:["Escreva o nome ROMEO na lousa mágica.","Aponte cada letra e diga o som: 'R de Romeo!'","Deixe ele apagar — 'Sumiu o Romeo!'","Escreva objetos favoritos: BOLA, CARRO.","Deixe ele riscar enquanto você fala a letra."],
    variations:["Letras do alfabeto uma por vez.","Escrever e apagar nomes de familiares.","Traçar as letras junto com a mão dele."],
    tip:"Letras associadas ao nome próprio têm significado real — aprendem mais rápido." },
  { id:"a52", moment:"tarde", title:"Caminhão de entrega", icon:"🚚", obj:"Vocabulário funcional + faz-de-conta + pedidos",
    steps:["O caminhão 'entrega' objetos para diferentes destinos.","'O caminhão trouxe a bola para o Romeo!'","Quem quer receber? Espere ele estender a mão.","Nomeie cada carga: 'Entregou o bloco! A fruta!'","Alterne: ele dirige, você recebe. Você dirige, ele recebe."],
    variations:["Caminhão entrega cartas (papéis dobrados).","Caminhão de bombeiro apaga 'fogo' (vermelho).","Caminhão leva animais para a fazenda."],
    tip:"Faz-de-conta com veículos combina o interesse dele com linguagem rica." },
  { id:"a53", moment:"manha", title:"Imitação de ações", icon:"🤸", obj:"Imitação motora + vocabulário de ação",
    steps:["Faça uma ação simples e nomeie: 'Pula!'","Aguarde ele imitar antes de continuar.","Sequência de 2: 'Pula e bate palmas!'","Deixe ele propor uma ação — você imita.","Use ações cotidianas: comer, dormir, correr, cair."],
    variations:["Imitar animais em movimento: pula como sapo.","Ações com objetos: empurra, joga, derruba.","Imitar personagens de músicas infantis."],
    tip:"Imitação de ações é o precursor direto da imitação de palavras." },
  { id:"a54", moment:"noite", title:"Sons do ambiente", icon:"👂", obj:"Atenção auditiva + vocabulário",
    steps:["Fiquem em silêncio por 20 segundos.","'Que barulho você ouviu?' — aguarde reação.","Nomeie os sons: 'Carro! Passarinho! Vento!'","Imite o som junto: 'Vruum! Piu-piu!'","Feche os olhos e adivinhem juntos."],
    variations:["Sons da chuva — nomear e imitar.","Sons da vizinhança: cachorro, criança, música.","Criar sons com o corpo: bater pé, soprar."],
    tip:"Atenção auditiva é a habilidade base para aprender a falar." },
];

// ── ACTIVITY ROTATION ─────────────────────────────────────────────────────────
const MOMENTS_ALL = ["despertar","manha","almoco","creche","tarde","noite","banho","sono"];
const ACTS_PER_MOMENT = { despertar:1, manha:3, almoco:2, creche:1, tarde:3, noite:3, banho:1, sono:1 };

function getActivitiesForDay(dateStr) {
  const seed = dateSeed(dateStr);
  const weekend = isWeekend(dateStr);
  const moments = weekend ? ["despertar","manha","almoco","tarde","noite","banho","sono"] : ["despertar","manha","almoco","creche","noite","banho","sono"];
  const result = [];
  moments.forEach(m => {
    const pool = ALL_ACTIVITIES.filter(a => a.moment === m || (m === "tarde" && a.moment === "creche"));
    const count = ACTS_PER_MOMENT[m] || 1;
    const shuffled = seededShuffle(pool, seed + m.charCodeAt(0));
    shuffled.slice(0, count).forEach(a => result.push({ ...a, moment: m }));
  });
  return result;
}

// ── SCORE DEFINITIONS ─────────────────────────────────────────────────────────
const SCORES = [
  { v: "great",   label: "🌟 Ótimo",          color: "#A8E6CF", short: "Ótimo" },
  { v: "good",    label: "✅ Bom",             color: "#7EC8E3", short: "Bom" },
  { v: "regular", label: "🔄 Regular",         color: "#FFE566", short: "Regular" },
  { v: "none",    label: "😶 Não engajou",     color: "rgba(255,150,100,0.9)", short: "Não engajou" },
  { v: "skip",    label: "❌ Não realizada",   color: "rgba(255,255,255,0.35)", short: "Não realizada" },
];

const MILESTONES = [
  { id:"ms1", cat:"Comunicação", label:"Aponta com o dedo indicador para pedir", ref:"12m" },
  { id:"ms2", cat:"Comunicação", label:"Aponta para compartilhar interesse", ref:"12m" },
  { id:"ms3", cat:"Comunicação", label:"Dá objetos ao adulto com intencionalidade", ref:"12m" },
  { id:"ms4", cat:"Comunicação", label:"Usa pelo menos 3 palavras com sentido consistente", ref:"18m" },
  { id:"ms5", cat:"Comunicação", label:"Combina 2 palavras (ex: mais água)", ref:"24m" },
  { id:"ms6", cat:"Comunicação", label:"Usa não como protesto verbal", ref:"18m" },
  { id:"ms7", cat:"Linguagem", label:"Responde ao nome virando e olhando", ref:"12m" },
  { id:"ms8", cat:"Linguagem", label:"Entende não e para a ação", ref:"12m" },
  { id:"ms9", cat:"Linguagem", label:"Entende comandos com 1 ação sem gesto", ref:"12m" },
  { id:"ms10", cat:"Linguagem", label:"Entende comandos com 2 ações em sequência", ref:"18m" },
  { id:"ms11", cat:"Linguagem", label:"Aponta para figuras em livros quando nomeadas", ref:"15m" },
  { id:"ms12", cat:"Linguagem", label:"Reconhece nomes de objetos cotidianos", ref:"15m" },
  { id:"ms13", cat:"Social", label:"Acena tchau espontaneamente", ref:"12m" },
  { id:"ms14", cat:"Social", label:"Sorri em resposta a interações sociais", ref:"6m" },
  { id:"ms15", cat:"Social", label:"Busca adulto quando assustado ou frustrado", ref:"12m" },
  { id:"ms16", cat:"Social", label:"Demonstra afeto (abraços, beijos)", ref:"12m" },
  { id:"ms17", cat:"Social", label:"Olha na direção que o adulto aponta", ref:"12m" },
  { id:"ms18", cat:"Social", label:"Alterna olhar entre objeto e pessoa", ref:"12m" },
  { id:"ms19", cat:"Social", label:"Brinca perto de outras crianças", ref:"18m" },
  { id:"ms20", cat:"Social", label:"Demonstra orgulho olhando para adulto", ref:"15m" },
  { id:"ms21", cat:"Imitação", label:"Imita gestos simples (palmas, tchau)", ref:"12m" },
  { id:"ms22", cat:"Imitação", label:"Imita ações com objetos", ref:"12m" },
  { id:"ms23", cat:"Imitação", label:"Imita sons e vocalizações", ref:"12m" },
  { id:"ms24", cat:"Imitação", label:"Imita espontaneamente sem ser pedido", ref:"15m" },
  { id:"ms25", cat:"Cognição", label:"Brincadeira simbólica simples", ref:"15m" },
  { id:"ms26", cat:"Cognição", label:"Procura objeto escondido (permanência)", ref:"12m" },
  { id:"ms27", cat:"Cognição", label:"Faz torre com 4+ blocos", ref:"18m" },
  { id:"ms28", cat:"Cognição", label:"Sustenta atenção 5+ min em atividade preferida", ref:"18m" },
  { id:"ms29", cat:"Autonomia", label:"Come com os dedos independentemente", ref:"12m" },
  { id:"ms30", cat:"Autonomia", label:"Tenta usar colher (mesmo com derramamento)", ref:"18m" },
  { id:"ms31", cat:"Autonomia", label:"Senta no pinico quando solicitado", ref:"18m" },
  { id:"ms32", cat:"Autonomia", label:"Controla esfíncter (desfralde)", ref:"24-36m" },
];

const TIPS = [
  { id:"t1", cat:"Comunicação", title:"Não antecipe", text:"Antes de entregar o que ele quer, pause 5 segundos. O silêncio cria espaço para ele comunicar." },
  { id:"t2", cat:"Comunicação", title:"Imite ele primeiro", text:"Quando Romeo fizer um som ou gesto, repita de volta. Isso ensina que comunicação é troca." },
  { id:"t3", cat:"Comunicação", title:"Fale menos, aguarde mais", text:"Quanto menos você fala, mais ele tem espaço para vocalizar. Fique em silêncio expectante por 10 segundos." },
  { id:"t4", cat:"Comunicação", title:"Valorize qualquer tentativa", text:"Um som, um olhar, um gesto — tudo é comunicação. Responda sempre como se fosse uma palavra real." },
  { id:"t5", cat:"Linguagem", title:"Frases curtas", text:"Use frases 1-2 palavras a mais do que ele usa. Se ele não fala, use 1 palavra. Se usa 1, use 2." },
  { id:"t6", cat:"Linguagem", title:"Nomeie o que ele olha", text:"Não o que você quer que ele veja — o que ELE está olhando. Siga o interesse dele e nomeie." },
  { id:"t7", cat:"Linguagem", title:"Mesma palavra, mesma situação", text:"Use sempre água para água. Consistência ajuda no aprendizado de palavras novas." },
  { id:"t8", cat:"Linguagem", title:"Expanda o que ele diz", text:"Se ele falar aba (água), você responde: Água! Quer água! Expanda sem corrigir." },
  { id:"t9", cat:"Social", title:"Espelhe as emoções", text:"Quando ele sorrir, sorria de volta com exagero. Quando frustrado, reconheça com tom calmo." },
  { id:"t10", cat:"Social", title:"Rituais de saudação", text:"Pratique oi e tchau em todas as chegadas e saídas, mesmo dentro de casa." },
  { id:"t11", cat:"Imitação", title:"Desacelere os gestos", text:"Faça o gesto devagar e espere. A velocidade normal adulta é rápida demais para ele processar." },
  { id:"t12", cat:"Imitação", title:"Comemore tentativas imperfeitas", text:"Se ele tentar imitar e não acertar, comemore mesmo assim. O esforço de imitar é o que importa." },
  { id:"t13", cat:"Rotina", title:"Anuncie transições", text:"Antes de mudar de atividade, avise: Mais um minuto e vamos almoçar. Reduz ansiedade." },
  { id:"t14", cat:"Rotina", title:"Use palavras-chave fixas", text:"Hora do banho, hora de dormir, vamos passear — sempre as mesmas palavras para as mesmas rotinas." },
  { id:"t15", cat:"Autonomia", title:"Ofereça escolhas reais", text:"Colher ou garfo? mesmo que o resultado seja o mesmo. A escolha exercita a comunicação intencional." },
  { id:"t16", cat:"Autonomia", title:"Deixe ele tentar primeiro", text:"Na alimentação e no desfralde: espere ele tentar por 30 segundos antes de ajudar." },
  { id:"t17", cat:"Fala", title:"Sopro é exercício de fala", text:"Bolhas de sabão, canudo na água, soprar papel — esses jogos exercitam diretamente os músculos da fala." },
  { id:"t18", cat:"Fala", title:"Vogais no espelho", text:"Cantar vogais exagerando o movimento da boca na frente do espelho estimula diretamente a produção de sons." },
  { id:"t19", cat:"Fala", title:"Microfone motiva vocalização", text:"Qualquer microfone de brinquedo aumenta o interesse em vocalizar. Use sempre que possível." },
  { id:"t20", cat:"Fala", title:"Onomatopeias são palavras reais", text:"Au-au, miau, vrum — essas são as primeiras palavras funcionais. Celebre e use muito." },
  { id:"t21", cat:"Motivação", title:"Siga o interesse dele", text:"Carrinhos, animais, bola, livros — use o que ele já ama. Tem 10x mais engajamento." },
  { id:"t22", cat:"Motivação", title:"Seja imprevisível", text:"Às vezes faça algo inesperado. A surpresa gera reação comunicativa." },
  { id:"t23", cat:"Motivação", title:"Brinque no chão com ele", text:"No chão, olho no olho, você vira um parceiro de brincadeira real." },
  { id:"t24", cat:"Pais", title:"Dividam as sessões", text:"Pai e mãe alternando evita esgotamento e expõe o Romeo a estilos comunicativos diferentes." },
];

const AGENDA_TYPES = [
  { v:"fono", label:"Fonoaudiologia", color:"#7EC8E3" },
  { v:"medico", label:"Médico / Pediatra", color:"#A8E6CF" },
  { v:"exame", label:"Exame", color:"#FFE566" },
  { v:"lembrete", label:"Lembrete", color:"rgba(255,255,255,0.6)" },
  { v:"outro", label:"Outro", color:"#B39DDB" },
];

// ── SYNC HOOK ─────────────────────────────────────────────────────────────────
function useSync(profile) {
  const [data, setData] = useState({ activities: {}, milestones: {}, observations: {}, agenda: [], tipsShown: {} });
  const [syncing, setSyncing] = useState(false);
  const [online, setOnline] = useState(true);

  async function fetchAll() {
    if (!profile) return;
    setSyncing(true);
    try {
      const [acts, mss, obs, ag, tips] = await Promise.all([
        sb.select("activities", "order=updated_at.desc"),
        sb.select("milestones", "order=updated_at.desc"),
        sb.select("observations", "order=updated_at.desc"),
        sb.select("agenda", "order=date.asc"),
        sb.select("tips_shown", "order=updated_at.desc"),
      ]);
      // Build activities: { date: { actId: { profile: {score, note} } } }
      const activities = {};
      acts.forEach(a => {
        if (!activities[a.date]) activities[a.date] = {};
        if (!activities[a.date][a.act_id]) activities[a.date][a.act_id] = {};
        activities[a.date][a.act_id][a.profile] = { score: a.score, note: a.note };
      });
      const milestones = {};
      mss.forEach(m => {
        if (!milestones[m.milestone_id]) milestones[m.milestone_id] = {};
        milestones[m.milestone_id][m.profile] = { status: m.status };
      });
      const observations = {};
      obs.forEach(o => {
        if (!observations[o.date]) observations[o.date] = {};
        if (!observations[o.date][o.profile]) observations[o.date][o.profile] = {};
        observations[o.date][o.profile][o.key] = o.value;
      });
      const tipsShown = {};
      tips.forEach(t => { tipsShown[t.date] = JSON.parse(t.tip_ids || "[]"); });
      setData({ activities, milestones, observations, agenda: ag, tipsShown });
      setOnline(true);
    } catch { setOnline(false); }
    setSyncing(false);
  }

  useEffect(() => { fetchAll(); }, [profile]);
  useEffect(() => {
    if (!profile) return;
    const iv = setInterval(fetchAll, 30000);
    return () => clearInterval(iv);
  }, [profile]);

  // Day close: mark unregistered activities as skip at midnight
  useEffect(() => {
    if (!profile) return;
    function checkDayClose() {
      const now = new Date();
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      const yStr = yesterday.toISOString().split("T")[0];
      const yActs = data.activities[yStr] || {};
      const dayActivities = getActivitiesForDay(yStr);
      const promises = [];
      dayActivities.forEach(act => {
        const existing = yActs[act.id]?.[profile];
        if (!existing?.score) {
          promises.push(sb.upsert("activities", {
            id: `${yStr}_${act.id}_${profile}`,
            date: yStr, act_id: act.id, profile,
            score: "skip", note: null,
            updated_at: new Date().toISOString()
          }));
        }
      });
      if (promises.length > 0) Promise.all(promises).then(fetchAll);
    }
    const now = new Date();
    const msToMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 1, 0) - now;
    const t = setTimeout(checkDayClose, msToMidnight);
    return () => clearTimeout(t);
  }, [profile, data]);

  async function logActivity(date, actId, score, note) {
    const rowId = `${date}_${actId}_${profile}`;
    await sb.upsert("activities", { id: rowId, date, act_id: actId, profile, score: score || null, note: note || null, updated_at: new Date().toISOString() });
    setData(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      if (!next.activities[date]) next.activities[date] = {};
      if (!next.activities[date][actId]) next.activities[date][actId] = {};
      next.activities[date][actId][profile] = { score, note };
      return next;
    });
  }

  async function clearActivity(date, actId) {
    const rowId = `${date}_${actId}_${profile}`;
    await sb.delete("activities", rowId);
    setData(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      if (next.activities[date]?.[actId]) delete next.activities[date][actId][profile];
      return next;
    });
  }

  async function setMilestone(msId, status) {
    const rowId = `${msId}_${profile}`;
    await sb.upsert("milestones", { id: rowId, milestone_id: msId, profile, status, updated_at: new Date().toISOString() });
    setData(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      if (!next.milestones[msId]) next.milestones[msId] = {};
      next.milestones[msId][profile] = { status };
      return next;
    });
  }

  async function setObservation(date, key, value) {
    const rowId = `${date}_${profile}_${key}`;
    await sb.upsert("observations", { id: rowId, date, profile, key, value, updated_at: new Date().toISOString() });
    setData(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      if (!next.observations[date]) next.observations[date] = {};
      if (!next.observations[date][profile]) next.observations[date][profile] = {};
      next.observations[date][profile][key] = value;
      return next;
    });
  }

  async function addAgendaItem(item) {
    const newItem = { ...item, id: uid(), profile, updated_at: new Date().toISOString() };
    await sb.upsert("agenda", newItem);
    setData(prev => ({ ...prev, agenda: [...prev.agenda, newItem].sort((a, b) => a.date.localeCompare(b.date)) }));
  }

  async function delAgendaItem(id) {
    await sb.delete("agenda", id);
    setData(prev => ({ ...prev, agenda: prev.agenda.filter(a => a.id !== id) }));
  }

  async function setTips(date, ids) {
    await sb.upsert("tips_shown", { id: date, date, tip_ids: JSON.stringify(ids), updated_at: new Date().toISOString() });
    setData(prev => ({ ...prev, tipsShown: { ...prev.tipsShown, [date]: ids } }));
  }

  return { data, syncing, online, fetchAll, logActivity, clearActivity, setMilestone, setObservation, addAgendaItem, delAgendaItem, setTips };
}

// ── UI COMPONENTS ─────────────────────────────────────────────────────────────
function StarField() {
  const stars = Array.from({length:35},(_,i)=>({id:i,x:Math.random()*100,y:Math.random()*100,r:Math.random()*1.5+0.4,op:Math.random()*0.5+0.15,d:Math.random()*4}));
  return (
    <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>
      <svg width="100%" height="100%" style={{position:"absolute",inset:0}}>
        {stars.map(s=><circle key={s.id} cx={`${s.x}%`} cy={`${s.y}%`} r={s.r} fill="#FFE566" opacity={s.op} style={{animation:`tw 3s ${s.d}s infinite alternate`}}/>)}
      </svg>
      <style>{`@keyframes tw{from{opacity:0.05}to{opacity:0.7}}`}</style>
    </div>
  );
}

function Logo({size=36}) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="26" fill="#7EC8E3" opacity="0.9"/>
      <ellipse cx="50" cy="50" rx="43" ry="13" stroke="#A8E6CF" strokeWidth="2.5" fill="none" transform="rotate(-20 50 50)"/>
      <circle cx="20" cy="22" r="1.8" fill="#FFE566"/><circle cx="78" cy="16" r="1.4" fill="#FFE566"/>
      <circle cx="83" cy="68" r="1.8" fill="#FFE566"/><circle cx="14" cy="62" r="1.3" fill="#FFE566"/>
      <rect x="37" y="36" width="26" height="17" rx="8.5" fill="white" opacity="0.95"/>
      <polygon points="45,53 50,61 55,53" fill="white" opacity="0.95"/>
      <circle cx="43" cy="44.5" r="2.2" fill="#7EC8E3"/>
      <circle cx="50" cy="44.5" r="2.2" fill="#7EC8E3"/>
      <circle cx="57" cy="44.5" r="2.2" fill="#7EC8E3"/>
    </svg>
  );
}

function TabBar({active, onChange}) {
  const tabs=[{id:"hoje",label:"Hoje",icon:"🌟"},{id:"agenda",label:"Agenda",icon:"📅"},{id:"marcos",label:"Marcos",icon:"🏆"},{id:"relatorio",label:"Relatório",icon:"📋"},{id:"dicas",label:"Dicas",icon:"💡"}];
  return (
    <nav style={{position:"fixed",bottom:0,left:0,right:0,zIndex:100,background:"rgba(8,16,35,0.97)",backdropFilter:"blur(20px)",borderTop:"1px solid rgba(126,200,227,0.18)",display:"flex",padding:"8px 0 12px"}}>
      {tabs.map(t=>(
        <button key={t.id} onClick={()=>onChange(t.id)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2,border:"none",background:"transparent",cursor:"pointer",padding:"4px 0"}}>
          <span style={{fontSize:19}}>{t.icon}</span>
          <span style={{fontSize:9.5,fontFamily:"Nunito,sans-serif",fontWeight:700,color:active===t.id?"#7EC8E3":"rgba(255,255,255,0.38)"}}>{t.label}</span>
          {active===t.id&&<div style={{width:4,height:4,borderRadius:2,background:"#7EC8E3",marginTop:1}}/>}
        </button>
      ))}
    </nav>
  );
}

function Card({children,style={},accent=false}) {
  return <div style={{background:accent?"rgba(126,200,227,0.1)":"rgba(255,255,255,0.04)",border:`1px solid ${accent?"rgba(126,200,227,0.25)":"rgba(255,255,255,0.08)"}`,borderRadius:16,padding:16,marginBottom:14,...style}}>{children}</div>;
}

function SLabel({children,color="#A8E6CF"}) {
  return <div style={{fontSize:11,fontWeight:800,color,fontFamily:"Nunito,sans-serif",marginBottom:8,letterSpacing:"0.05em"}}>{children}</div>;
}

// ── TODAY TAB ─────────────────────────────────────────────────────────────────
function TodayTab({profile, sync}) {
  const date = todayStr();
  const weekend = isWeekend(date);
  const moments = weekend ? MOMENTS_WE : MOMENTS_WD;
  const [expanded, setExpanded] = useState(null);
  const dayActs = sync.data.activities[date] || {};
  const myObs = (sync.data.observations[date] || {})[profile] || {};
  const otherProfile = profile === "Rafael" ? "Jéssica" : "Rafael";
  const otherObs = (sync.data.observations[date] || {})[otherProfile] || {};
  const todayActivities = getActivitiesForDay(date);
  const actsByMoment = {};
  todayActivities.forEach(a => { if (!actsByMoment[a.moment]) actsByMoment[a.moment] = []; actsByMoment[a.moment].push(a); });
  const doneCount = todayActivities.filter(a => dayActs[a.id]?.[profile]?.score && dayActs[a.id]?.[profile]?.score !== "skip").length;

  return (
    <div style={{paddingBottom:90}}>
      <Card accent style={{display:"flex",alignItems:"center",gap:16,marginBottom:20}}>
        <div style={{width:68,height:68,borderRadius:34,overflow:"hidden",border:"3px solid #7EC8E3",flexShrink:0}}>
          <img src={ROMEO_PHOTO} alt="Romeo" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top"}}/>
        </div>
        <div style={{flex:1}}>
          <div style={{fontSize:20,fontWeight:900,color:"#fff",fontFamily:"Baloo 2,cursive"}}>Romeo 🚀</div>
          <div style={{fontSize:12,color:"#A8E6CF",fontFamily:"Nunito,sans-serif"}}>{getRomeoAge()} · Foco: fala e comunicação</div>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",fontFamily:"Nunito,sans-serif",marginTop:2}}>
            {new Date().toLocaleDateString("pt-BR",{weekday:"long",day:"numeric",month:"long"})} · {weekend?"🏖️ Fim de semana":"🏫 Dia de semana"}
          </div>
          <div style={{marginTop:5,display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
            <span style={{fontSize:10,color:"#FFE566",fontFamily:"Nunito,sans-serif"}}>{doneCount}/{todayActivities.length} realizadas</span>
            {sync.syncing?<span style={{fontSize:10,color:"#7EC8E3",fontFamily:"Nunito,sans-serif"}}>🔄 sync...</span>
              :sync.online?<span style={{fontSize:10,color:"#A8E6CF",fontFamily:"Nunito,sans-serif"}}>✅ online</span>
              :<span style={{fontSize:10,color:"rgba(255,100,100,0.8)",fontFamily:"Nunito,sans-serif"}}>⚠️ offline</span>}
          </div>
        </div>
      </Card>

      {moments.map(m => {
        const acts = actsByMoment[m.id] || [];
        if (acts.length === 0) return null;
        return (
          <div key={m.id} style={{marginBottom:18}}>
            <div style={{fontSize:13,fontWeight:800,color:"#A8E6CF",fontFamily:"Nunito,sans-serif",padding:"8px 4px 6px"}}>
              {m.label} <span style={{fontSize:11,fontWeight:400,color:"rgba(255,255,255,0.35)"}}>{m.time}</span>
            </div>
            {acts.map(act => {
              const myAct = dayActs[act.id]?.[profile] || {};
              const otherAct = dayActs[act.id]?.[otherProfile] || {};
              const isExp = expanded === act.id;
              const myScore = SCORES.find(s => s.v === myAct.score);
              const otherScore = SCORES.find(s => s.v === otherAct.score);
              const hasMine = !!myAct.score;
              return (
                <div key={act.id} style={{background:hasMine?"rgba(126,200,227,0.07)":"rgba(255,255,255,0.03)",border:`1px solid ${hasMine?"rgba(126,200,227,0.2)":"rgba(255,255,255,0.07)"}`,borderRadius:16,marginBottom:10,overflow:"hidden"}}>
                  <div style={{display:"flex",alignItems:"center",padding:"12px 16px",gap:12,cursor:"pointer"}} onClick={()=>setExpanded(isExp?null:act.id)}>
                    <span style={{fontSize:22}}>{act.icon}</span>
                    <div style={{flex:1}}>
                      <div style={{fontSize:14,fontWeight:700,color:"#fff",fontFamily:"Nunito,sans-serif"}}>{act.title}</div>
                      <div style={{fontSize:11,color:"rgba(255,255,255,0.35)",fontFamily:"Nunito,sans-serif",marginTop:1}}>{act.obj}</div>
                      <div style={{marginTop:4,display:"flex",gap:4,flexWrap:"wrap"}}>
                        {myScore && <span style={{fontSize:11,padding:"2px 8px",borderRadius:6,background:`${myScore.color}22`,border:`1px solid ${myScore.color}44`,color:myScore.color,fontFamily:"Nunito,sans-serif",fontWeight:700}}>{profile==="Rafael"?"👨":"👩"} {myScore.short}</span>}
                        {otherScore && <span style={{fontSize:11,padding:"2px 8px",borderRadius:6,background:`${otherScore.color}22`,border:`1px solid ${otherScore.color}44`,color:otherScore.color,fontFamily:"Nunito,sans-serif",fontWeight:700}}>{otherProfile==="Rafael"?"👨":"👩"} {otherScore.short}</span>}
                      </div>
                    </div>
                    <span style={{color:"rgba(255,255,255,0.2)",fontSize:14}}>{isExp?"▲":"▼"}</span>
                  </div>
                  {isExp && (
                    <div style={{padding:"0 16px 16px"}}>
                      <SLabel>COMO FAZER</SLabel>
                      {act.steps.map((s,i)=>(
                        <div key={i} style={{display:"flex",gap:8,marginBottom:7,alignItems:"flex-start"}}>
                          <span style={{minWidth:22,height:22,borderRadius:11,background:"rgba(126,200,227,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"#7EC8E3",fontWeight:700,fontFamily:"Nunito,sans-serif",flexShrink:0}}>{i+1}</span>
                          <span style={{fontSize:13,color:"rgba(255,255,255,0.8)",fontFamily:"Nunito,sans-serif",lineHeight:1.5}}>{s}</span>
                        </div>
                      ))}
                      <div style={{background:"rgba(255,229,102,0.07)",borderRadius:10,padding:"10px 12px",marginTop:8,marginBottom:12}}>
                        <div style={{fontSize:11,color:"#FFE566",fontWeight:700,marginBottom:5,fontFamily:"Nunito,sans-serif"}}>💡 VARIAÇÕES</div>
                        {act.variations.map((v,i)=><div key={i} style={{fontSize:12,color:"rgba(255,255,255,0.65)",fontFamily:"Nunito,sans-serif",marginBottom:3}}>· {v}</div>)}
                      </div>
                      <div style={{background:"rgba(168,230,207,0.07)",borderRadius:10,padding:"8px 12px",marginBottom:14,fontSize:12,color:"#A8E6CF",fontFamily:"Nunito,sans-serif",fontStyle:"italic"}}>✨ {act.tip}</div>

                      {otherAct.score && (
                        <div style={{background:"rgba(168,230,207,0.07)",borderRadius:10,padding:"10px 12px",marginBottom:12,border:"1px solid rgba(168,230,207,0.15)"}}>
                          <div style={{fontSize:11,color:"#A8E6CF",fontWeight:700,fontFamily:"Nunito,sans-serif",marginBottom:4}}>
                            {otherProfile==="Rafael"?"👨":"👩"} Registro de {otherProfile}:
                          </div>
                          <div style={{fontSize:12,color:"rgba(255,255,255,0.7)",fontFamily:"Nunito,sans-serif"}}>
                            {otherScore?.label}{otherAct.note ? ` — ${otherAct.note}` : ""}
                          </div>
                        </div>
                      )}

                      <SLabel color="#7EC8E3">MEU REGISTRO — toque novamente para desmarcar</SLabel>
                      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:10}}>
                        {SCORES.map(sc=>{
                          const isActive = myAct.score === sc.v;
                          return (
                            <button key={sc.v}
                              onClick={()=> isActive
                                ? sync.clearActivity(date, act.id)
                                : sync.logActivity(date, act.id, sc.v, myAct.note||"")
                              }
                              style={{padding:"9px 14px",borderRadius:10,border:"1.5px solid",borderColor:isActive?sc.color:"rgba(255,255,255,0.1)",background:isActive?`${sc.color}22`:"transparent",color:isActive?sc.color:"rgba(255,255,255,0.5)",fontSize:13,fontFamily:"Nunito,sans-serif",fontWeight:isActive?700:400,cursor:"pointer",textAlign:"left",transition:"all 0.2s",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                              <span>{sc.label}</span>
                              {isActive && <span style={{fontSize:11,opacity:0.6}}>toque para desmarcar</span>}
                            </button>
                          );
                        })}
                      </div>
                      <textarea placeholder="Observação rápida (opcional)..." value={myAct.note||""} onChange={e=>sync.logActivity(date,act.id,myAct.score||null,e.target.value)} style={{width:"100%",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,color:"#fff",padding:"9px 12px",fontSize:13,fontFamily:"Nunito,sans-serif",resize:"none",minHeight:55,boxSizing:"border-box",outline:"none"}}/>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}

      <Card>
        <SLabel color="#FFE566">📝 OBSERVAÇÕES DO DIA</SLabel>
        {[{k:"sons_novos",p:"Novos sons ou vocalizações hoje..."},{k:"palavras_novas",p:"Novas tentativas de palavras..."},{k:"habilidades",p:"Novas habilidades observadas..."},{k:"dificuldades",p:"Dificuldades ou baixo engajamento..."},{k:"conquistas",p:"Uma conquista do dia..."}].map(item=>(
          <textarea key={item.k} placeholder={item.p} value={myObs[item.k]||""} onChange={e=>sync.setObservation(date,item.k,e.target.value)} style={{width:"100%",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:10,color:"#fff",padding:"9px 12px",fontSize:13,fontFamily:"Nunito,sans-serif",resize:"none",minHeight:50,boxSizing:"border-box",outline:"none",marginBottom:10}}/>
        ))}
        {Object.keys(otherObs).length>0&&(
          <div style={{marginTop:4,padding:"12px",background:"rgba(168,230,207,0.06)",borderRadius:10,border:"1px solid rgba(168,230,207,0.12)"}}>
            <div style={{fontSize:11,color:"#A8E6CF",fontWeight:700,fontFamily:"Nunito,sans-serif",marginBottom:8}}>{otherProfile==="Rafael"?"👨":"👩"} Observações de {otherProfile}:</div>
            {Object.values(otherObs).filter(Boolean).map((v,i)=><div key={i} style={{fontSize:12,color:"rgba(255,255,255,0.6)",fontFamily:"Nunito,sans-serif",marginBottom:3}}>· {v}</div>)}
          </div>
        )}
      </Card>
      <button onClick={sync.fetchAll} style={{width:"100%",padding:"11px",borderRadius:12,background:"rgba(126,200,227,0.08)",border:"1px solid rgba(126,200,227,0.18)",color:"#7EC8E3",fontFamily:"Nunito,sans-serif",fontWeight:700,fontSize:13,cursor:"pointer",marginBottom:8}}>🔄 Atualizar agora</button>
    </div>
  );
}

// ── AGENDA TAB ────────────────────────────────────────────────────────────────
function AgendaTab({profile, sync}) {
  const [view, setView] = useState("upcoming");
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({date:"",time:"",title:"",type:"fono"});
  const monthNames=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
  const agendaItems = sync.data.agenda || [];

  function addItem() {
    if (!form.title || !form.date) return;
    sync.addAgendaItem({...form});
    setForm({date:"",time:"",title:"",type:"fono"});
    setShowForm(false);
  }

  const days = monthDates(year, month);
  const weeks = [];
  let week = [];
  const firstDay = new Date(year, month, 1).getDay();
  for (let i = 0; i < firstDay; i++) week.push(null);
  days.forEach(d => { week.push(d); if (week.length===7){weeks.push(week);week=[];} });
  if (week.length>0){while(week.length<7)week.push(null);weeks.push(week);}

  const upcoming = agendaItems.filter(i=>i.date>=todayStr()).sort((a,b)=>a.date.localeCompare(b.date));

  return (
    <div style={{paddingBottom:90}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <div style={{fontSize:18,fontWeight:800,color:"#fff",fontFamily:"Baloo 2,cursive"}}>📅 Agenda</div>
        <button onClick={()=>setShowForm(!showForm)} style={{background:"rgba(126,200,227,0.15)",border:"1px solid rgba(126,200,227,0.3)",borderRadius:10,padding:"8px 14px",color:"#7EC8E3",fontFamily:"Nunito,sans-serif",fontWeight:700,fontSize:13,cursor:"pointer"}}>+ Novo</button>
      </div>
      {showForm&&(
        <Card accent style={{marginBottom:16}}>
          <SLabel>NOVO EVENTO</SLabel>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            <input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:10,color:"#fff",padding:"10px 12px",fontSize:14,fontFamily:"Nunito,sans-serif",outline:"none",width:"100%",boxSizing:"border-box"}}/>
            <input type="time" value={form.time} onChange={e=>setForm({...form,time:e.target.value})} style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:10,color:"#fff",padding:"10px 12px",fontSize:14,fontFamily:"Nunito,sans-serif",outline:"none",width:"100%",boxSizing:"border-box"}}/>
            <input type="text" placeholder="Descrição (ex: Consulta fono, Pegar guia...)" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:10,color:"#fff",padding:"10px 12px",fontSize:14,fontFamily:"Nunito,sans-serif",outline:"none",width:"100%",boxSizing:"border-box"}}/>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {AGENDA_TYPES.map(t=>(
                <button key={t.v} onClick={()=>setForm({...form,type:t.v})} style={{padding:"6px 12px",borderRadius:20,border:"1px solid",borderColor:form.type===t.v?t.color:"rgba(255,255,255,0.12)",background:form.type===t.v?`${t.color}22`:"transparent",color:form.type===t.v?t.color:"rgba(255,255,255,0.4)",fontSize:12,fontFamily:"Nunito,sans-serif",fontWeight:600,cursor:"pointer"}}>{t.label}</button>
              ))}
            </div>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setShowForm(false)} style={{flex:1,padding:"10px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"transparent",color:"rgba(255,255,255,0.5)",fontFamily:"Nunito,sans-serif",fontWeight:700,cursor:"pointer"}}>Cancelar</button>
              <button onClick={addItem} style={{flex:2,padding:"10px",borderRadius:10,border:"none",background:"#7EC8E3",color:"#0A1428",fontFamily:"Nunito,sans-serif",fontWeight:800,cursor:"pointer"}}>Salvar</button>
            </div>
          </div>
        </Card>
      )}
      <div style={{display:"flex",background:"rgba(255,255,255,0.05)",borderRadius:12,padding:4,marginBottom:16}}>
        {[{v:"upcoming",l:"Próximos"},{v:"month",l:"Mensal"}].map(t=>(
          <button key={t.v} onClick={()=>setView(t.v)} style={{flex:1,padding:"8px 0",borderRadius:10,border:"none",background:view===t.v?"#7EC8E3":"transparent",color:view===t.v?"#0A1428":"rgba(255,255,255,0.4)",fontFamily:"Nunito,sans-serif",fontWeight:700,fontSize:13,cursor:"pointer"}}>{t.l}</button>
        ))}
      </div>
      {view==="upcoming"&&(
        <div>
          {upcoming.length===0&&<div style={{fontSize:13,color:"rgba(255,255,255,0.3)",fontFamily:"Nunito,sans-serif",textAlign:"center",padding:"40px 0"}}>Nenhum evento agendado</div>}
          {upcoming.map(item=>{
            const tc=AGENDA_TYPES.find(t=>t.v===item.type)?.color||"#7EC8E3";
            const [y,m,d]=item.date.split("-");
            return (
              <div key={item.id} style={{background:"rgba(255,255,255,0.04)",borderLeft:`3px solid ${tc}`,borderRadius:"0 14px 14px 0",padding:"12px 14px",marginBottom:10,display:"flex",justifyContent:"space-between",alignItems:"flex-start",border:"1px solid rgba(255,255,255,0.07)"}}>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:"#fff",fontFamily:"Nunito,sans-serif"}}>{item.title}</div>
                  <div style={{fontSize:11,color:tc,fontFamily:"Nunito,sans-serif",marginTop:3}}>{d}/{m}/{y}{item.time?` às ${item.time}`:""} · {AGENDA_TYPES.find(t=>t.v===item.type)?.label}</div>
                  {item.profile&&<div style={{fontSize:10,color:"rgba(255,255,255,0.3)",fontFamily:"Nunito,sans-serif",marginTop:2}}>por {item.profile}</div>}
                </div>
                <button onClick={()=>sync.delAgendaItem(item.id)} style={{background:"transparent",border:"none",color:"rgba(255,100,100,0.5)",fontSize:20,cursor:"pointer",paddingLeft:8}}>×</button>
              </div>
            );
          })}
        </div>
      )}
      {view==="month"&&(
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <button onClick={()=>{if(month===0){setMonth(11);setYear(y=>y-1);}else setMonth(m=>m-1);}} style={{background:"transparent",border:"none",color:"#7EC8E3",fontSize:22,cursor:"pointer"}}>‹</button>
            <div style={{fontSize:15,fontWeight:700,color:"#fff",fontFamily:"Nunito,sans-serif"}}>{monthNames[month]} {year}</div>
            <button onClick={()=>{if(month===11){setMonth(0);setYear(y=>y+1);}else setMonth(m=>m+1);}} style={{background:"transparent",border:"none",color:"#7EC8E3",fontSize:22,cursor:"pointer"}}>›</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2,marginBottom:6}}>
            {["D","S","T","Q","Q","S","S"].map((d,i)=><div key={i} style={{textAlign:"center",fontSize:11,color:"rgba(255,255,255,0.3)",fontFamily:"Nunito,sans-serif",padding:"4px 0"}}>{d}</div>)}
          </div>
          {weeks.map((w,wi)=>(
            <div key={wi} style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2,marginBottom:2}}>
              {w.map((d,di)=>{
                const ds=d?d.toISOString().split("T")[0]:"";
                const items=agendaItems.filter(i=>i.date===ds);
                const isToday=ds===todayStr();
                return (
                  <div key={di} style={{minHeight:40,borderRadius:8,background:isToday?"rgba(126,200,227,0.18)":d?"rgba(255,255,255,0.03)":"transparent",border:`1px solid ${isToday?"rgba(126,200,227,0.4)":"rgba(255,255,255,0.05)"}`,padding:"4px 2px",display:"flex",flexDirection:"column",alignItems:"center"}}>
                    {d&&<span style={{fontSize:12,color:isToday?"#7EC8E3":"rgba(255,255,255,0.55)",fontFamily:"Nunito,sans-serif",fontWeight:isToday?800:400}}>{d.getDate()}</span>}
                    {items.slice(0,2).map((it,ii)=>{const tc=AGENDA_TYPES.find(t=>t.v===it.type)?.color||"#7EC8E3";return <div key={ii} style={{width:"80%",height:3,borderRadius:2,background:tc,marginTop:2}}/>;  })}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── MILESTONES TAB ────────────────────────────────────────────────────────────
function MilestonesTab({profile, sync}) {
  const cats=[...new Set(MILESTONES.map(m=>m.cat))];
  const [activeCat, setActiveCat] = useState(cats[0]);
  const filtered = MILESTONES.filter(m=>m.cat===activeCat);
  const otherProfile = profile==="Rafael"?"Jéssica":"Rafael";
  const msd = sync.data.milestones;
  const statusOpts=[{v:"yes",label:"✅ Atingido",color:"#A8E6CF"},{v:"progress",label:"🔄 Em progresso",color:"#FFE566"},{v:"no",label:"❌ Ainda não",color:"rgba(255,80,80,0.8)"}];
  const done=MILESTONES.filter(m=>Object.values(msd[m.id]||{}).some(v=>v.status==="yes")).length;
  const prog=MILESTONES.filter(m=>!Object.values(msd[m.id]||{}).some(v=>v.status==="yes")&&Object.values(msd[m.id]||{}).some(v=>v.status==="progress")).length;

  return (
    <div style={{paddingBottom:90}}>
      <div style={{display:"flex",gap:10,marginBottom:20}}>
        {[{label:"✅ Atingidos",val:done,color:"#A8E6CF"},{label:"🔄 Progresso",val:prog,color:"#FFE566"},{label:"Total",val:MILESTONES.length,color:"rgba(255,255,255,0.5)"}].map((s,i)=>(
          <div key={i} style={{flex:1,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:"10px 8px",textAlign:"center"}}>
            <div style={{fontSize:20,fontWeight:800,color:s.color,fontFamily:"Nunito,sans-serif"}}>{s.val}</div>
            <div style={{fontSize:10,color:"rgba(255,255,255,0.3)",fontFamily:"Nunito,sans-serif"}}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
        {cats.map(c=>(
          <button key={c} onClick={()=>setActiveCat(c)} style={{padding:"6px 14px",borderRadius:20,border:"1px solid",borderColor:activeCat===c?"#7EC8E3":"rgba(255,255,255,0.12)",background:activeCat===c?"rgba(126,200,227,0.15)":"transparent",color:activeCat===c?"#7EC8E3":"rgba(255,255,255,0.4)",fontSize:12,fontFamily:"Nunito,sans-serif",fontWeight:700,cursor:"pointer"}}>{c}</button>
        ))}
      </div>
      {filtered.map(m=>{
        const myMs=msd[m.id]?.[profile]||{};
        const otherMs=msd[m.id]?.[otherProfile]||{};
        return (
          <Card key={m.id} style={{marginBottom:12}}>
            <div style={{marginBottom:10}}>
              <div style={{fontSize:14,fontWeight:700,color:"#fff",fontFamily:"Nunito,sans-serif",lineHeight:1.4}}>{m.label}</div>
              <div style={{fontSize:11,color:"#7EC8E3",fontFamily:"Nunito,sans-serif",marginTop:2}}>Ref: {m.ref}</div>
            </div>
            {otherMs.status&&(
              <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",fontFamily:"Nunito,sans-serif",marginBottom:8}}>
                {otherProfile==="Rafael"?"👨":"👩"} {otherProfile}: {otherMs.status==="yes"?"✅ Atingido":otherMs.status==="progress"?"🔄 Em progresso":"❌ Ainda não"}
              </div>
            )}
            <SLabel color="rgba(255,255,255,0.4)">MEU REGISTRO:</SLabel>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {statusOpts.map(s=>(
                <button key={s.v} onClick={()=>sync.setMilestone(m.id,s.v)} style={{padding:"6px 12px",borderRadius:20,border:"1.5px solid",borderColor:myMs.status===s.v?s.color:"rgba(255,255,255,0.1)",background:myMs.status===s.v?`${s.color}22`:"transparent",color:myMs.status===s.v?s.color:"rgba(255,255,255,0.35)",fontSize:12,fontFamily:"Nunito,sans-serif",fontWeight:myMs.status===s.v?700:400,cursor:"pointer",transition:"all 0.2s"}}>{s.label}</button>
              ))}
            </div>
          </Card>
        );
      })}
    </div>
  );
}

// ── REPORT TAB ────────────────────────────────────────────────────────────────
function ReportTab({sync}) {
  const [view, setView] = useState("daily");
  const [copied, setCopied] = useState(null);
  const {activities, milestones, observations} = sync.data;
  const today = todayStr();

  // All dates with any data, descending
  const allDates = Object.keys(activities).sort((a,b)=>b.localeCompare(a));

  // Last 7 days
  function last7() {
    const days = [];
    for (let i=6; i>=0; i--) {
      const d = new Date(); d.setDate(d.getDate()-i);
      days.push(d.toISOString().split("T")[0]);
    }
    return days;
  }

  const scoreMap = {
    great:"Ótimo 🌟", good:"Bom ✅", regular:"Regular 🔄",
    none:"Não engajou 😶", skip:"Não realizada ❌"
  };
  const scoreColors = {
    great:"#A8E6CF", good:"#7EC8E3", regular:"#FFE566",
    none:"rgba(255,150,100,0.9)", skip:"rgba(255,255,255,0.35)"
  };
  const scoreShort = {
    great:"Ótimo", good:"Bom", regular:"Regular",
    none:"Não engajou", skip:"Não realizada"
  };

  function buildDayText(date) {
    const dayActs = activities[date]||{};
    const dayActivities = getActivitiesForDay(date);
    let lines = [`📅 ${fmtDate(date)}`];
    let any = false;
    dayActivities.forEach(act => {
      const ra = dayActs[act.id]?.["Rafael"];
      const ja = dayActs[act.id]?.["Jéssica"];
      if ((ra?.score && ra.score !== "skip") || (ja?.score && ja.score !== "skip")) {
        any = true;
        lines.push(`\n• ${act.title}`);
        if (ra?.score && ra.score !== "skip") lines.push(`  👨 Rafael: ${scoreMap[ra.score]||ra.score}${ra.note?` — ${ra.note}`:""}`);
        if (ja?.score && ja.score !== "skip") lines.push(`  👩 Jéssica: ${scoreMap[ja.score]||ja.score}${ja.note?` — ${ja.note}`:""}`);
      }
    });
    // Observations
    const obsR = (observations[date]||{})["Rafael"]||{};
    const obsJ = (observations[date]||{})["Jéssica"]||{};
    const obsLabels = {sons_novos:"Novos sons",palavras_novas:"Novas palavras",habilidades:"Novas habilidades",dificuldades:"Dificuldades",conquistas:"Conquistas"};
    let hasObs = false;
    ["Rafael","Jéssica"].forEach(p => {
      const obs = p==="Rafael"?obsR:obsJ;
      const entries = Object.entries(obsLabels).filter(([k])=>obs[k]);
      if (entries.length>0) {
        if (!hasObs) { lines.push("\nObservações:"); hasObs=true; }
        entries.forEach(([k,l])=>lines.push(`  ${p==="Rafael"?"👨":"👩"} ${l}: ${obs[k]}`));
      }
    });
    if (!any && !hasObs) lines.push("(Nenhuma atividade registrada)");
    return lines.join("\n");
  }

  function buildWeeklyText() {
    const days = last7();
    let r = "📊 RELATÓRIO SEMANAL — Romeo\n";
    r += `Período: ${fmtDate(days[0])} a ${fmtDate(days[6])}\n`;
    r += "─────────────────────────\n";
    // Engagement summary
    let total=0, pos=0;
    days.forEach(d=>{
      const da=activities[d]||{};
      Object.values(da).forEach(byP=>Object.values(byP).forEach(a=>{
        if(a.score&&a.score!=="skip"){total++;if(a.score==="great"||a.score==="good")pos++;}
      }));
    });
    if(total>0) r+=`\n✅ Engajamento positivo: ${Math.round(pos/total*100)}% (${pos} de ${total} registros)\n`;
    // Daily summary
    days.forEach(d=>{
      const dayActs=activities[d]||{};
      const dayActivities=getActivitiesForDay(d);
      const logged=dayActivities.filter(a=>{
        const ra=dayActs[a.id]?.["Rafael"];
        const ja=dayActs[a.id]?.["Jéssica"];
        return (ra?.score&&ra.score!=="skip")||(ja?.score&&ja.score!=="skip");
      });
      if(logged.length>0){
        r+=`\n📅 ${fmtDate(d)} — ${logged.length} atividades\n`;
        logged.forEach(act=>{
          const ra=dayActs[act.id]?.["Rafael"];
          const ja=dayActs[act.id]?.["Jéssica"];
          r+=`• ${act.title}\n`;
          if(ra?.score&&ra.score!=="skip") r+=`  👨 ${scoreMap[ra.score]||ra.score}\n`;
          if(ja?.score&&ja.score!=="skip") r+=`  👩 ${scoreMap[ja.score]||ja.score}\n`;
        });
      }
    });
    // Observations
    r+="\n─────────────────────────\nObservações da semana:\n";
    days.forEach(d=>{
      const obsR=(observations[d]||{})["Rafael"]||{};
      const obsJ=(observations[d]||{})["Jéssica"]||{};
      if(obsR.conquistas||obsJ.conquistas){
        r+=`\n${fmtDate(d)} — Conquistas:\n`;
        if(obsR.conquistas) r+=`  👨 ${obsR.conquistas}\n`;
        if(obsJ.conquistas) r+=`  👩 ${obsJ.conquistas}\n`;
      }
      if(obsR.dificuldades||obsJ.dificuldades){
        r+=`\n${fmtDate(d)} — Dificuldades:\n`;
        if(obsR.dificuldades) r+=`  👨 ${obsR.dificuldades}\n`;
        if(obsJ.dificuldades) r+=`  👩 ${obsJ.dificuldades}\n`;
      }
      if(obsR.sons_novos||obsJ.sons_novos){
        r+=`\n${fmtDate(d)} — Novos sons:\n`;
        if(obsR.sons_novos) r+=`  👨 ${obsR.sons_novos}\n`;
        if(obsJ.sons_novos) r+=`  👩 ${obsJ.sons_novos}\n`;
      }
    });
    return r;
  }

  function buildMilestonesText() {
    let r = "🏆 MARCOS DE DESENVOLVIMENTO — Romeo\n";
    r += `Atualizado em: ${fmtDate(today)}\n`;
    r += "─────────────────────────\n";
    const cats = [...new Set(MILESTONES.map(m=>m.cat))];
    cats.forEach(cat => {
      r += `\n${cat.toUpperCase()}\n`;
      MILESTONES.filter(m=>m.cat===cat).forEach(m => {
        const rS = milestones[m.id]?.["Rafael"]?.status;
        const jS = milestones[m.id]?.["Jéssica"]?.status;
        const best = rS==="yes"||jS==="yes"?"yes":rS==="progress"||jS==="progress"?"progress":rS||jS||null;
        const icon = best==="yes"?"✅":best==="progress"?"🔄":best==="no"?"❌":"⬜";
        r += `${icon} ${m.label} (ref: ${m.ref})\n`;
        if(rS) r+=`   👨 Rafael: ${rS==="yes"?"Atingido":rS==="progress"?"Em progresso":"Ainda não"}\n`;
        if(jS) r+=`   👩 Jéssica: ${jS==="yes"?"Atingido":jS==="progress"?"Em progresso":"Ainda não"}\n`;
      });
    });
    return r;
  }

  function copy(text, key) {
    navigator.clipboard?.writeText(text).then(()=>{
      setCopied(key);
      setTimeout(()=>setCopied(null), 2500);
    });
  }

  // Weekly chart
  const chartData = last7().map(d=>{
    const da=activities[d]||{};
    let total=0,pos=0;
    Object.values(da).forEach(byP=>Object.values(byP).forEach(a=>{
      if(a.score&&a.score!=="skip"){total++;if(a.score==="great"||a.score==="good")pos++;}
    }));
    return{date:fmtDate(d),pct:total?Math.round(pos/total*100):0,total};
  });

  return (
    <div style={{paddingBottom:90}}>
      <div style={{fontSize:18,fontWeight:800,color:"#fff",fontFamily:"Baloo 2,cursive",marginBottom:16}}>📋 Relatórios</div>

      {/* Tabs */}
      <div style={{display:"flex",background:"rgba(255,255,255,0.05)",borderRadius:12,padding:4,marginBottom:16}}>
        {[{v:"daily",l:"Diário"},{v:"weekly",l:"Semanal"},{v:"marcos",l:"Marcos"}].map(t=>(
          <button key={t.v} onClick={()=>setView(t.v)}
            style={{flex:1,padding:"8px 0",borderRadius:10,border:"none",background:view===t.v?"#7EC8E3":"transparent",color:view===t.v?"#0A1428":"rgba(255,255,255,0.4)",fontFamily:"Nunito,sans-serif",fontWeight:700,fontSize:13,cursor:"pointer"}}>
            {t.l}
          </button>
        ))}
      </div>

      {/* DAILY */}
      {view==="daily" && (
        <div>
          {allDates.length===0 && (
            <div style={{fontSize:13,color:"rgba(255,255,255,0.3)",fontFamily:"Nunito,sans-serif",textAlign:"center",padding:"40px 0"}}>
              Nenhum dia registrado ainda
            </div>
          )}
          {allDates.map(date=>{
            const dayActs=activities[date]||{};
            const dayActivities=getActivitiesForDay(date);
            const logged=dayActivities.filter(a=>{
              const ra=dayActs[a.id]?.["Rafael"];
              const ja=dayActs[a.id]?.["Jéssica"];
              return (ra?.score&&ra.score!=="skip")||(ja?.score&&ja.score!=="skip");
            });
            const dayText=buildDayText(date);
            return (
              <Card key={date} style={{marginBottom:14}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                  <div>
                    <div style={{fontSize:14,fontWeight:800,color:"#fff",fontFamily:"Nunito,sans-serif"}}>{fmtDate(date)}</div>
                    <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",fontFamily:"Nunito,sans-serif"}}>{logged.length} atividades registradas</div>
                  </div>
                  <button onClick={()=>copy(dayText,date)}
                    style={{background:copied===date?"#A8E6CF":"rgba(126,200,227,0.15)",border:"1px solid rgba(126,200,227,0.3)",borderRadius:10,padding:"7px 14px",color:copied===date?"#0A1428":"#7EC8E3",fontFamily:"Nunito,sans-serif",fontWeight:700,fontSize:12,cursor:"pointer",transition:"all 0.2s"}}>
                    {copied===date?"✅ Copiado!":"📋 Copiar"}
                  </button>
                </div>
                {logged.map(act=>{
                  const ra=dayActs[act.id]?.["Rafael"];
                  const ja=dayActs[act.id]?.["Jéssica"];
                  return (
                    <div key={act.id} style={{borderTop:"1px solid rgba(255,255,255,0.06)",paddingTop:8,marginTop:8}}>
                      <div style={{fontSize:13,fontWeight:700,color:"rgba(255,255,255,0.85)",fontFamily:"Nunito,sans-serif",marginBottom:5}}>{act.icon} {act.title}</div>
                      <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                        {ra?.score&&ra.score!=="skip"&&<span style={{fontSize:11,padding:"2px 8px",borderRadius:6,background:`${scoreColors[ra.score]}22`,border:`1px solid ${scoreColors[ra.score]}44`,color:scoreColors[ra.score],fontFamily:"Nunito,sans-serif",fontWeight:700}}>👨 {scoreShort[ra.score]}</span>}
                        {ja?.score&&ja.score!=="skip"&&<span style={{fontSize:11,padding:"2px 8px",borderRadius:6,background:`${scoreColors[ja.score]}22`,border:`1px solid ${scoreColors[ja.score]}44`,color:scoreColors[ja.score],fontFamily:"Nunito,sans-serif",fontWeight:700}}>👩 {scoreShort[ja.score]}</span>}
                      </div>
                      {ra?.note&&<div style={{fontSize:11,color:"rgba(255,255,255,0.4)",fontFamily:"Nunito,sans-serif",marginTop:3}}>👨 {ra.note}</div>}
                      {ja?.note&&<div style={{fontSize:11,color:"rgba(255,255,255,0.4)",fontFamily:"Nunito,sans-serif",marginTop:2}}>👩 {ja.note}</div>}
                    </div>
                  );
                })}
              </Card>
            );
          })}
        </div>
      )}

      {/* WEEKLY */}
      {view==="weekly" && (
        <div>
          <Card style={{marginBottom:16}}>
            <SLabel>ENGAJAMENTO DOS ÚLTIMOS 7 DIAS</SLabel>
            <div style={{display:"flex",alignItems:"flex-end",gap:5,height:70}}>
              {chartData.map((d,i)=>(
                <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                  <div style={{width:"100%",background:d.pct>0?"#7EC8E3":"rgba(255,255,255,0.08)",borderRadius:"3px 3px 0 0",height:`${Math.max(d.pct*0.55,d.total>0?4:2)}px`,minHeight:2,transition:"height 0.3s"}}/>
                  <span style={{fontSize:9,color:"rgba(255,255,255,0.35)",fontFamily:"Nunito,sans-serif"}}>{d.date}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card style={{marginBottom:14}}>
            <pre style={{fontSize:12,color:"rgba(255,255,255,0.8)",fontFamily:"Nunito,sans-serif",whiteSpace:"pre-wrap",lineHeight:1.7,margin:0}}>{buildWeeklyText()}</pre>
          </Card>
          <button onClick={()=>copy(buildWeeklyText(),"weekly")}
            style={{width:"100%",padding:"14px 0",borderRadius:14,background:copied==="weekly"?"#A8E6CF":"#7EC8E3",border:"none",color:"#0A1428",fontSize:15,fontWeight:800,fontFamily:"Nunito,sans-serif",cursor:"pointer",transition:"all 0.3s",marginBottom:10}}>
            {copied==="weekly"?"✅ Copiado! Cole no WhatsApp":"📋 Copiar relatório semanal"}
          </button>
        </div>
      )}

      {/* MARCOS */}
      {view==="marcos" && (
        <div>
          {/* Summary cards */}
          {(() => {
            const done=MILESTONES.filter(m=>Object.values(milestones[m.id]||{}).some(v=>v.status==="yes")).length;
            const prog=MILESTONES.filter(m=>!Object.values(milestones[m.id]||{}).some(v=>v.status==="yes")&&Object.values(milestones[m.id]||{}).some(v=>v.status==="progress")).length;
            return (
              <div style={{display:"flex",gap:10,marginBottom:16}}>
                {[{label:"✅ Atingidos",val:done,color:"#A8E6CF"},{label:"🔄 Progresso",val:prog,color:"#FFE566"},{label:"Total",val:MILESTONES.length,color:"rgba(255,255,255,0.5)"}].map((s,i)=>(
                  <div key={i} style={{flex:1,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:"10px 8px",textAlign:"center"}}>
                    <div style={{fontSize:20,fontWeight:800,color:s.color,fontFamily:"Nunito,sans-serif"}}>{s.val}</div>
                    <div style={{fontSize:10,color:"rgba(255,255,255,0.3)",fontFamily:"Nunito,sans-serif"}}>{s.label}</div>
                  </div>
                ))}
              </div>
            );
          })()}
          {/* Milestone list grouped by category */}
          {[...new Set(MILESTONES.map(m=>m.cat))].map(cat=>{
            const catMs=MILESTONES.filter(m=>m.cat===cat);
            return (
              <div key={cat} style={{marginBottom:16}}>
                <div style={{fontSize:12,fontWeight:800,color:"#A8E6CF",fontFamily:"Nunito,sans-serif",marginBottom:8,paddingLeft:4}}>{cat.toUpperCase()}</div>
                {catMs.map(m=>{
                  const rS=milestones[m.id]?.["Rafael"]?.status;
                  const jS=milestones[m.id]?.["Jéssica"]?.status;
                  const best=rS==="yes"||jS==="yes"?"yes":rS==="progress"||jS==="progress"?"progress":rS||jS||null;
                  const icon=best==="yes"?"✅":best==="progress"?"🔄":best==="no"?"❌":"⬜";
                  const iconColor=best==="yes"?"#A8E6CF":best==="progress"?"#FFE566":best==="no"?"rgba(255,80,80,0.8)":"rgba(255,255,255,0.2)";
                  return (
                    <div key={m.id} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"10px 12px",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:12,marginBottom:6}}>
                      <span style={{fontSize:16,color:iconColor,flexShrink:0,marginTop:1}}>{icon}</span>
                      <div style={{flex:1}}>
                        <div style={{fontSize:13,color:"rgba(255,255,255,0.85)",fontFamily:"Nunito,sans-serif",lineHeight:1.4}}>{m.label}</div>
                        <div style={{fontSize:10,color:"rgba(255,255,255,0.3)",fontFamily:"Nunito,sans-serif",marginTop:2}}>Ref: {m.ref}</div>
                        {(rS||jS)&&(
                          <div style={{display:"flex",gap:6,marginTop:4,flexWrap:"wrap"}}>
                            {rS&&<span style={{fontSize:10,padding:"1px 6px",borderRadius:4,background:"rgba(126,200,227,0.1)",color:"#7EC8E3",fontFamily:"Nunito,sans-serif"}}>👨 {rS==="yes"?"Atingido":rS==="progress"?"Progresso":"Ainda não"}</span>}
                            {jS&&<span style={{fontSize:10,padding:"1px 6px",borderRadius:4,background:"rgba(168,230,207,0.1)",color:"#A8E6CF",fontFamily:"Nunito,sans-serif"}}>👩 {jS==="yes"?"Atingido":jS==="progress"?"Progresso":"Ainda não"}</span>}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
          {/* Copy button */}
          <button onClick={()=>copy(buildMilestonesText(),"marcos")}
            style={{width:"100%",padding:"14px 0",borderRadius:14,background:copied==="marcos"?"#A8E6CF":"#7EC8E3",border:"none",color:"#0A1428",fontSize:15,fontWeight:800,fontFamily:"Nunito,sans-serif",cursor:"pointer",transition:"all 0.3s",marginTop:8}}>
            {copied==="marcos"?"✅ Copiado! Cole no WhatsApp":"📋 Copiar relatório de marcos"}
          </button>
        </div>
      )}
    </div>
  );
}

// ── TIPS TAB ──────────────────────────────────────────────────────────────────
function TipsTab({sync}) {
  const date = todayStr();
  const shownIds = sync.data.tipsShown[date] || [];
  const [showAll, setShowAll] = useState(false);
  const [filterCat, setFilterCat] = useState("Todas");
  const cats=[...new Set(TIPS.map(t=>t.cat))];

  useEffect(()=>{
    if(shownIds.length===0){
      const pick=[...TIPS].sort(()=>Math.random()-0.5).slice(0,4).map(t=>t.id);
      sync.setTips(date,pick);
    }
  },[shownIds.length]);

  const todayTips=TIPS.filter(t=>shownIds.includes(t.id));
  const allFiltered=filterCat==="Todas"?TIPS:TIPS.filter(t=>t.cat===filterCat);
  const displayTips=showAll?allFiltered:todayTips;

  return (
    <div style={{paddingBottom:90}}>
      <div style={{fontSize:18,fontWeight:800,color:"#fff",fontFamily:"Baloo 2,cursive",marginBottom:6}}>💡 Dicas e Sugestões</div>
      <div style={{fontSize:12,color:"rgba(255,255,255,0.4)",fontFamily:"Nunito,sans-serif",marginBottom:16}}>{showAll?`${allFiltered.length} dicas`:"4 dicas selecionadas para hoje"}</div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
        <button onClick={()=>setShowAll(false)} style={{padding:"5px 12px",borderRadius:20,border:"1px solid",borderColor:!showAll?"#FFE566":"rgba(255,255,255,0.12)",background:!showAll?"rgba(255,229,102,0.12)":"transparent",color:!showAll?"#FFE566":"rgba(255,255,255,0.4)",fontSize:12,fontFamily:"Nunito,sans-serif",fontWeight:600,cursor:"pointer"}}>🌟 Do dia</button>
        <button onClick={()=>{setShowAll(true);setFilterCat("Todas");}} style={{padding:"5px 12px",borderRadius:20,border:"1px solid",borderColor:showAll&&filterCat==="Todas"?"#7EC8E3":"rgba(255,255,255,0.12)",background:showAll&&filterCat==="Todas"?"rgba(126,200,227,0.15)":"transparent",color:showAll&&filterCat==="Todas"?"#7EC8E3":"rgba(255,255,255,0.4)",fontSize:12,fontFamily:"Nunito,sans-serif",fontWeight:600,cursor:"pointer"}}>Ver todas</button>
        {showAll&&cats.map(c=>(
          <button key={c} onClick={()=>setFilterCat(c)} style={{padding:"5px 12px",borderRadius:20,border:"1px solid",borderColor:filterCat===c?"#A8E6CF":"rgba(255,255,255,0.1)",background:filterCat===c?"rgba(168,230,207,0.12)":"transparent",color:filterCat===c?"#A8E6CF":"rgba(255,255,255,0.35)",fontSize:11,fontFamily:"Nunito,sans-serif",fontWeight:600,cursor:"pointer"}}>{c}</button>
        ))}
      </div>
      {displayTips.map(tip=>(
        <Card key={tip.id} style={{marginBottom:12}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
            <div style={{fontSize:14,fontWeight:800,color:"#fff",fontFamily:"Nunito,sans-serif"}}>{tip.title}</div>
            <span style={{fontSize:10,background:"rgba(126,200,227,0.12)",border:"1px solid rgba(126,200,227,0.2)",borderRadius:6,padding:"2px 8px",color:"#7EC8E3",fontFamily:"Nunito,sans-serif",fontWeight:700,whiteSpace:"nowrap",marginLeft:8}}>{tip.cat}</span>
          </div>
          <div style={{fontSize:13,color:"rgba(255,255,255,0.75)",fontFamily:"Nunito,sans-serif",lineHeight:1.6}}>{tip.text}</div>
        </Card>
      ))}
      {!showAll&&(
        <button onClick={()=>{const pick=[...TIPS].sort(()=>Math.random()-0.5).slice(0,4).map(t=>t.id);sync.setTips(date,pick);}} style={{width:"100%",padding:"12px 0",borderRadius:12,background:"rgba(255,229,102,0.1)",border:"1px solid rgba(255,229,102,0.2)",color:"#FFE566",fontFamily:"Nunito,sans-serif",fontWeight:700,fontSize:14,cursor:"pointer",marginTop:4}}>🔀 Novas dicas do dia</button>
      )}
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function HablaRomeo() {
  const [profile, setProfile] = useState(()=>localStorage.getItem("hablaromeo_profile")||null);
  const [activeTab, setActiveTab] = useState("hoje");
  const sync = useSync(profile);

  function chooseProfile(p) {
    localStorage.setItem("hablaromeo_profile", p);
    setProfile(p);
  }

  if (!profile) {
    return (
      <div style={{minHeight:"100vh",background:"#081023",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24,position:"relative"}}>
        <StarField/>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Baloo+2:wght@700;800;900&display=swap');*{box-sizing:border-box}body{margin:0;background:#081023}`}</style>
        <div style={{position:"relative",zIndex:1,textAlign:"center",width:"100%",maxWidth:380}}>
          <Logo size={80}/>
          <h1 style={{fontSize:38,fontWeight:900,color:"#fff",fontFamily:"Baloo 2,cursive",margin:"14px 0 4px"}}>Habla Romeo</h1>
          <p style={{color:"#7EC8E3",fontSize:14,marginBottom:8,fontFamily:"Nunito,sans-serif"}}>Quem está registrando?</p>
          <p style={{color:"rgba(255,255,255,0.3)",fontSize:11,marginBottom:36,fontFamily:"Nunito,sans-serif"}}>O app vai lembrar sua escolha neste celular</p>
          <div style={{display:"flex",flexDirection:"column",gap:14,width:"100%"}}>
            {[{n:"Rafael",e:"👨"},{n:"Jéssica",e:"👩"}].map(p=>(
              <button key={p.n} onClick={()=>chooseProfile(p.n)} style={{width:"100%",padding:"18px 24px",borderRadius:18,background:"rgba(126,200,227,0.1)",border:"2px solid rgba(126,200,227,0.25)",color:"#fff",fontSize:18,fontWeight:800,fontFamily:"Nunito,sans-serif",cursor:"pointer",display:"flex",alignItems:"center",gap:16}}>
                <span style={{fontSize:32}}>{p.e}</span>{p.n}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const tabs={hoje:<TodayTab profile={profile} sync={sync}/>,agenda:<AgendaTab profile={profile} sync={sync}/>,marcos:<MilestonesTab profile={profile} sync={sync}/>,relatorio:<ReportTab sync={sync}/>,dicas:<TipsTab sync={sync}/>};

  return (
    <div style={{minHeight:"100vh",background:"#081023",fontFamily:"Nunito,sans-serif",position:"relative"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Baloo+2:wght@700;800;900&display=swap');*{box-sizing:border-box}body{margin:0;background:#081023}textarea:focus,input:focus{outline:none}button:active{transform:scale(0.97)}`}</style>
      <StarField/>
      <div style={{position:"sticky",top:0,zIndex:50,background:"rgba(8,16,35,0.95)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(126,200,227,0.15)",padding:"10px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <Logo size={28}/>
          <span style={{fontSize:17,fontWeight:900,color:"#fff",fontFamily:"Baloo 2,cursive"}}>Habla Romeo</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:12,color:"#7EC8E3",fontWeight:700,fontFamily:"Nunito,sans-serif"}}>{profile}{profile==="Rafael"?" 👨":" 👩"}</span>
          {sync.syncing&&<span style={{fontSize:10,color:"#FFE566"}}>🔄</span>}
          {!sync.online&&<span style={{fontSize:10,color:"rgba(255,100,100,0.8)"}}>⚠️</span>}
          <button onClick={()=>{localStorage.removeItem("hablaromeo_profile");setProfile(null);}} style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"4px 8px",color:"rgba(255,255,255,0.45)",fontSize:11,cursor:"pointer",fontFamily:"Nunito,sans-serif"}}>trocar</button>
        </div>
      </div>
      <div style={{padding:"20px 20px 0",position:"relative",zIndex:1}}>{tabs[activeTab]}</div>
      <TabBar active={activeTab} onChange={setActiveTab}/>
    </div>
  );
}
