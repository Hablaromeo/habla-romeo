import { useState, useEffect, useRef, useCallback } from "react";

// ── CONFIG ────────────────────────────────────────────────────────────────────
const SB_URL = "https://alcgjfmkhhyrolmbmxac.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsY2dqZm1raGh5cm9sbWJteGFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNDA5NTQsImV4cCI6MjA5NTgxNjk1NH0.x1OvAmeX3ve4t6XOCNOqQTObCSwvcHySBbu7QDiUIFk";
const ROMEO_PHOTO = "data:image/jpeg;base64,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";

// ── SUPABASE CLIENT ───────────────────────────────────────────────────────────
const sb = {
  headers: { "apikey": SB_KEY, "Authorization": `Bearer ${SB_KEY}`, "Content-Type": "application/json", "Prefer": "resolution=merge-duplicates" },
  async upsert(table, data) {
    try {
      const r = await fetch(`${SB_URL}/rest/v1/${table}`, {
        method: "POST", headers: { ...this.headers, "Prefer": "resolution=merge-duplicates" },
        body: JSON.stringify(Array.isArray(data) ? data : [data])
      });
      return r.ok;
    } catch { return false; }
  },
  async select(table, filter = "") {
    try {
      const r = await fetch(`${SB_URL}/rest/v1/${table}?${filter}`, { headers: this.headers });
      if (!r.ok) return [];
      return await r.json();
    } catch { return []; }
  },
  async delete(table, id) {
    try {
      const r = await fetch(`${SB_URL}/rest/v1/${table}?id=eq.${id}`, { method: "DELETE", headers: this.headers });
      return r.ok;
    } catch { return false; }
  }
};

// ── HELPERS ───────────────────────────────────────────────────────────────────
function todayStr() { return new Date().toISOString().split("T")[0]; }
function isWeekend() { const d = new Date().getDay(); return d === 0 || d === 6; }
function getRomeoAge() {
  const birth = new Date("2024-09-18"), now = new Date();
  const months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
  const y = Math.floor(months / 12), m = months % 12;
  return y > 0 ? `${y} ano${y > 1 ? "s" : ""} e ${m} ${m === 1 ? "mês" : "meses"}` : `${m} ${m === 1 ? "mês" : "meses"}`;
}
function weekDates() {
  const days = [];
  for (let i = 6; i >= 0; i--) { const d = new Date(); d.setDate(d.getDate() - i); days.push(d.toISOString().split("T")[0]); }
  return days;
}
function fmtDate(d) { const [, m, day] = d.split("-"); return `${day}/${m}`; }
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2); }
function monthDates(year, month) {
  const days = [], d = new Date(year, month, 1);
  while (d.getMonth() === month) { days.push(new Date(d)); d.setDate(d.getDate() + 1); }
  return days;
}

// ── DATA ──────────────────────────────────────────────────────────────────────
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

const ACTIVITIES = [
  { id:"a1", moment:"despertar", title:"Bom dia com nomeação", time:"3–5 min", icon:"🌞", obj:"Compreensão verbal + expressões sociais",
    steps:["Ao acordar, fale o nome dele animado: 'Romeo, bom dia!'","Aponte para teto, janela, luz — nomeie: 'Luz! Sol!'","Espere qualquer vocalização ou olhar de resposta.","Modele 'oi' com gesto e tom empolgado.","Elogie qualquer reação: 'Isso! Bom dia!'"],
    variations:["Nomeie partes do corpo durante a troca de fralda.","Cante 'Bom dia' com o nome dele.","Imite o som que ele fizer ao acordar."],
    tip:"O despertar é momento de baixa guarda — ele está receptivo." },
  { id:"a2", moment:"despertar", title:"Troca de fralda comunicativa", time:"3–5 min", icon:"👶", obj:"Nomeação + comandos simples",
    steps:["Durante a troca, nomeie cada etapa: 'Levanta a perninha!'","Faça uma pausa após o comando e aguarde resposta.","Nomeie partes do corpo: 'Barriguinha! Pezinho!'","Celebre quando obedece: 'Isso! Que menino!'","Introduza 'dá' — peça para ele dar a fralda."],
    variations:["Esconda o rosto com a fralda limpa: esconde-esconde.","Faça sons engraçados durante a troca.","Pergunte 'Cadê o pezinho?' antes de pegar."],
    tip:"Rotinas repetitivas são ouro — ele já sabe o que vem depois." },
  { id:"a3", moment:"manha", title:"Pausa estratégica", time:"5–8 min", icon:"⏸️", obj:"Intenção comunicativa espontânea",
    steps:["Escolha uma brincadeira favorita (carrinho, bolinha, livro).","Brinque junto por 1–2 min para criar expectativa.","Pare completamente e olhe com expressão de espera.","Aguarde 5–10 segundos sem falar.","Qualquer sinal (olhar, vocalização, gesto) = continue imediatamente!"],
    variations:["Carrinho: empurre e pare na metade.","Música: cante e pare antes da palavra favorita.","Livro: vire a página e pause."],
    tip:"O silêncio estratégico é sua ferramenta mais poderosa." },
  { id:"a4", moment:"manha", title:"Dois caminhos", time:"3–5 min", icon:"🤔", obj:"Solicitação e escolha",
    steps:["Segure dois objetos à altura dos olhos dele.","Pergunte animado: 'Qual você quer?'","Aguarde qualquer indicação — olhar, alcance, apontar.","Entregue o escolhido e nomeie: 'Carrinho!'","Repita 3–4 vezes com objetos diferentes."],
    variations:["Lanche: duas frutas.","Dois carrinhos de cores diferentes.","Dois livros — qual ele quer ver?"],
    tip:"A escolha é a forma mais natural de solicitar algo." },
  { id:"a5", moment:"manha", title:"Livro comentado", time:"5–8 min", icon:"📚", obj:"Apontar + nomear + atenção compartilhada",
    steps:["Abra o livro de figuras no colo dele.","Espere ele tocar ou olhar antes de falar.","Quando mostrar interesse, nomeie: 'Leão! Raaaw!'","Deixe ele virar as páginas no ritmo dele.","Aponte e espere ele olhar na direção."],
    variations:["Faça sons dos animais das figuras.","Imprima fotos de objetos que ele conhece.","Revistas com fotos de carros, animais ou comidas."],
    tip:"Romeo adora livros — use como porta de entrada para comunicação." },
  { id:"a6", moment:"manha", title:"Imitação espelhada", time:"5–8 min", icon:"🪞", obj:"Imitação motora e vocal",
    steps:["Sente no chão na frente dele, ao nível dos olhos.","Imite um som ou gesto QUE ELE FIZER primeiro.","Depois faça um gesto simples: bater palmas.","Aguarde — dê tempo real para ele processar.","Comemore qualquer tentativa, mesmo parcial."],
    variations:["Imite as onomatopeias que ele já sabe (au-au, miau).","Gestos com música: Cabeça Ombro Joelho Pé.","Expressões faciais exageradas no espelho."],
    tip:"Quando você imita ele primeiro, cria muito mais engajamento." },
  { id:"a7", moment:"almoco", title:"Nomeação na mesa", time:"10–15 min", icon:"🥦", obj:"Vocabulário + solicitação",
    steps:["Nomeie cada alimento ao servir: 'Arroz! Feijão!'","Ofereça poucos pedaços — espere ele pedir mais.","Modele 'mais?' abrindo a mão e espere resposta.","Use frases curtas: 'Quer mais?'","Celebre vocalizações como pedidos legítimos."],
    variations:["Apresente o alimento antes de servir, deixe tocar.","Sons de aprovação: 'Mmm, gostoso!'","Pergunte 'Cadê o feijão?' e aponte junto."],
    tip:"3 refeições por dia = 3 sessões de terapia naturais." },
  { id:"a8", moment:"almoco", title:"Colher na mão", time:"5–8 min", icon:"🥄", obj:"Autonomia alimentar",
    steps:["Coloque comida mole no prato (purê, iogurte).","Guie a mão dele para pegar a colher.","Ajude no movimento mas solte antes da boca.","Elogie qualquer tentativa: 'Sozinho! Que menino!'","Aceite a bagunça — é parte do processo."],
    variations:["Pratique o gesto da colher sem comida primeiro.","Use comida que ele já ama para motivar.","Deixe explorar com os dedos antes da colher."],
    tip:"Ele ainda não usa talher porque não foi ensinado — vai aprender rápido." },
  { id:"a9", moment:"creche", title:"Pinico com rotina", time:"5 min (várias vezes)", icon:"🚽", obj:"Autonomia + compreensão de rotina",
    steps:["Horários fixos: ao acordar, após refeições, antes do banho.","Use sempre a mesma frase: 'Hora do pinico!'","Celebre muito quando faz: 'Muito bem!'","Não force — se recusar, tente em 15 min.","Associe palavras: 'Xixi! Cocô!'"],
    variations:["Deixe-o escolher ir antes ou depois do lanche.","Livro ou música só para hora do pinico.","Sticker de recompensa visível."],
    tip:"Ele já senta quando solicitado — meio caminho andado!" },
  { id:"a10", moment:"tarde", title:"Passeio comentado", time:"20–30 min", icon:"🌳", obj:"Vocabulário contextual",
    steps:["Nomeie o que aparece: 'Cachorro! Au-au!'","Aponte e ESPERE ele olhar antes de nomear.","Quando ele olhar para algo, você nomeia.","Use sempre a mesma palavra para o mesmo estímulo.","Celebre quando olhar na direção que você apontou."],
    variations:["Nomeie veículos com sons: carro, moto, ônibus.","Foque em animais — ponto forte dele.","Cumprimente pessoas: 'Oi!' com aceno."],
    tip:"Fale sobre o que ELE está olhando, não o que você quer." },
  { id:"a11", moment:"tarde", title:"Brincadeira livre comentada", time:"15–20 min", icon:"🚗", obj:"Brincar funcional + vocabulário",
    steps:["Deixe ele liderar — siga o interesse dele.","Comente o que ele faz: 'O carro está andando!'","Entre na brincadeira dele e imite suas ações.","Faça pausas estratégicas.","Introduza um personagem novo."],
    variations:["Circuito de carrinhos com obstáculos.","Animais de borracha na bacia de água.","Blocos para construir e derrubar juntos."],
    tip:"A brincadeira livre é quando ele está mais comunicativo." },
  { id:"a12", moment:"tarde", title:"Animais com sons", time:"5–8 min", icon:"🐾", obj:"Imitação vocal + vocabulário",
    steps:["Use bonecos, livro ou fotos de animais.","Mostre o animal e faça o som correspondente.","Aguarde imitação — onomatopeia ou olhar expectante.","Celebre qualquer tentativa: 'Isso! Au-au!'","Trabalhe os que ele já sabe (porco, cão, leão, gato)."],
    variations:["Vídeo curto do animal real fazendo o som.","Jogo de memória de animais.","Adivinhe o animal pelo som."],
    tip:"Ele já sabe várias onomatopeias — isso é comunicação real!" },
  { id:"a13", moment:"tarde", title:"Construção e derrubada", time:"5–8 min", icon:"🧱", obj:"Causa-efeito + vocabulário",
    steps:["Monte uma torre de blocos juntos.","Use palavras de ação: 'Coloca! Mais um! Caiu!'","Deixe ele derrubar — a antecipação é comunicativa.","Recomece com 'de novo?' e gesto.","Pause antes de colocar o próximo bloco."],
    variations:["Torre de copos de plástico.","Latas de alimentos vazias.","Construa e peça para ele demolir com a bola."],
    tip:"A antecipação 'vai cair!' gera vocalização espontânea." },
  { id:"a14", moment:"noite", title:"Música com pausa", time:"5–10 min", icon:"🎵", obj:"Intenção comunicativa + antecipação",
    steps:["Cante uma música que ele já conhece.","Pare antes de uma palavra ou som que ele espera.","Aguarde qualquer reação — olhar, sorriso, som.","Continue a música como recompensa.","Repita a mesma pausa 3–4 vezes."],
    variations:["'Incy Wincy Spider' — pare no gesto da aranha.","Música de animais — pare antes do som do bicho.","Parabéns — pare no último verso."],
    tip:"A antecipação musical é um gatilho poderoso para vocalização." },
  { id:"a15", moment:"noite", title:"Passeio sensorial", time:"20–30 min", icon:"🌆", obj:"Vocabulário + experiência compartilhada",
    steps:["Nomeie o que ele toca e vê durante o passeio.","Busque elementos sensoriais: textura de árvore, vento.","Celebre onomatopeias espontâneas.","Aponte para o céu: 'Lua! Estrela!'","Pratique 'tchau' para pessoas que cruzarem."],
    variations:["Leve a bola e pratique chutar.","Observe bichos: formigas, pássaros, cachorros.","Explorar diferentes pisos: grama, paralelepípedo."],
    tip:"O passeio é quando ele mais vocaliza espontaneamente." },
  { id:"a16", moment:"banho", title:"Banho comunicativo", time:"10–15 min", icon:"🛁", obj:"Nomeação + comandos + expressões sociais",
    steps:["Nomeie partes do corpo: 'Cabeça! Ombro! Barriga!'","Use comandos simples: 'Levanta o braço!'","Brinque de dar e receber brinquedos na água.","Ao terminar, modele 'tchau' para os brinquedos.","Cante Cabeça Ombro Joelho e Pé."],
    variations:["Esconda brinquedos na espuma: 'Cadê o pato?'","Bolhas de sabão e espere reação.","Nomeie as ações: 'Lava! Esfrega! Enxuga!'"],
    tip:"O relaxamento do banho abre espaço para trocas espontâneas." },
  { id:"a17", moment:"sono", title:"Ritual de sono", time:"10–15 min", icon:"🌙", obj:"Rotina previsível + expressões sociais",
    steps:["Siga sempre a mesma sequência pré-sono.","Nomeie cada etapa: 'Hora de dormir! Luz apagada.'","Leia um livro curto com figuras simples.","Modele 'boa noite' com beijo e aceno.","Músicas de ninar enquanto deita."],
    variations:["Mesmo livro por vários dias — previsibilidade acalma.","'Boa noite' para cada brinquedo do quarto.","Massagem suave com nomeação das partes do corpo."],
    tip:"Rotinas previsíveis reduzem ansiedade e facilitam comunicação." },
  { id:"a18", moment:"manha", title:"Esconde-esconde de objetos", time:"5 min", icon:"🔍", obj:"Permanência + vocabulário",
    steps:["Esconda objeto favorito sob um pano ou pote.","Pergunte animado: 'Cadê o carrinho?'","Aguarde ele procurar e apontar ou vocalizar.","Revele com entusiasmo: 'Achou! Aqui está!'","Aumente a dificuldade: 2 potes, onde está?"],
    variations:["Esconda a bola atrás das costas.","'Cadê o pai?' — pai aparece de trás da porta.","Esconda um animal de pelúcia favorito."],
    tip:"Ele tem boa permanência do objeto — use para criar comunicação." },
];

const MILESTONES = [
  { id:"ms1", cat:"Comunicação", label:"Aponta com o dedo indicador para pedir", ref:"12m" },
  { id:"ms2", cat:"Comunicação", label:"Aponta para compartilhar interesse (não só pedir)", ref:"12m" },
  { id:"ms3", cat:"Comunicação", label:"Dá objetos ao adulto com intencionalidade", ref:"12m" },
  { id:"ms4", cat:"Comunicação", label:"Usa pelo menos 3 palavras com sentido consistente", ref:"18m" },
  { id:"ms5", cat:"Comunicação", label:"Combina 2 palavras (ex: 'mais água')", ref:"24m" },
  { id:"ms6", cat:"Comunicação", label:"Usa 'não' como protesto verbal", ref:"18m" },
  { id:"ms7", cat:"Linguagem", label:"Responde ao nome virando e olhando", ref:"12m" },
  { id:"ms8", cat:"Linguagem", label:"Entende 'não' e para a ação", ref:"12m" },
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
  { id:"ms19", cat:"Social", label:"Brinca perto de outras crianças (paralela)", ref:"18m" },
  { id:"ms20", cat:"Social", label:"Demonstra orgulho olhando para adulto ao conseguir algo", ref:"15m" },
  { id:"ms21", cat:"Imitação", label:"Imita gestos simples (palmas, tchau)", ref:"12m" },
  { id:"ms22", cat:"Imitação", label:"Imita ações com objetos", ref:"12m" },
  { id:"ms23", cat:"Imitação", label:"Imita sons e vocalizações", ref:"12m" },
  { id:"ms24", cat:"Imitação", label:"Imita espontaneamente sem ser pedido", ref:"15m" },
  { id:"ms25", cat:"Cognição", label:"Brincadeira simbólica simples (finge comer/dormir)", ref:"15m" },
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
  { id:"t7", cat:"Linguagem", title:"Mesma palavra, mesma situação", text:"Use sempre 'água' para água. Consistência ajuda muito no aprendizado de palavras novas." },
  { id:"t8", cat:"Linguagem", title:"Expanda o que ele diz", text:"Se ele falar 'aba' (água), você responde 'Água! Quer água!' Expanda sem corrigir." },
  { id:"t9", cat:"Social", title:"Espelhe as emoções", text:"Quando ele sorrir, sorria de volta com exagero. Quando frustrado, reconheça com tom calmo." },
  { id:"t10", cat:"Social", title:"Rituais de saudação", text:"Pratique 'oi' e 'tchau' em todas as chegadas e saídas, mesmo dentro de casa." },
  { id:"t11", cat:"Imitação", title:"Desacelere os gestos", text:"Faça o gesto devagar e espere. A velocidade normal adulta é rápida demais para ele processar." },
  { id:"t12", cat:"Imitação", title:"Comemore tentativas imperfeitas", text:"Se ele tentar imitar e não acertar, comemore mesmo assim. O esforço de imitar é o que importa." },
  { id:"t13", cat:"Rotina", title:"Anuncie transições", text:"Antes de mudar de atividade, avise: 'Mais um minuto e vamos almoçar.' Reduz ansiedade." },
  { id:"t14", cat:"Rotina", title:"Use palavras-chave fixas", text:"'Hora do banho', 'hora de dormir', 'vamos passear' — sempre as mesmas palavras para as mesmas rotinas." },
  { id:"t15", cat:"Autonomia", title:"Ofereça escolhas reais", text:"'Colher ou garfo?' mesmo que o resultado seja o mesmo. A escolha exercita a comunicação intencional." },
  { id:"t16", cat:"Autonomia", title:"Deixe ele tentar primeiro", text:"Na alimentação e no desfralde: espere ele tentar por 30 segundos antes de ajudar." },
  { id:"t17", cat:"Sensorial", title:"Variedade sensorial diária", text:"Toque diferentes texturas: areia, argila, água, grama. Estimulação sensorial apoia o desenvolvimento da fala." },
  { id:"t18", cat:"Sensorial", title:"Música como âncora", text:"Músicas repetidas criam expectativas — e expectativas geram vocalização. Repita as favoritas." },
  { id:"t19", cat:"Motivação", title:"Siga o interesse dele", text:"Carrinhos, animais, bola, livros — use o que ele já ama. Tem 10x mais engajamento." },
  { id:"t20", cat:"Motivação", title:"Seja imprevisível", text:"Às vezes faça algo inesperado. A surpresa gera reação comunicativa." },
  { id:"t21", cat:"Motivação", title:"Brinque no chão com ele", text:"No chão, olho no olho, você vira um parceiro de brincadeira real." },
  { id:"t22", cat:"Pais", title:"Dividam as sessões", text:"Pai e mãe alternando evita esgotamento e expõe o Romeo a estilos comunicativos diferentes." },
  { id:"t23", cat:"Pais", title:"Registre conquistas pequenas", text:"Um novo som, uma nova reação — anote. O progresso pode ser invisível no dia a dia." },
  { id:"t24", cat:"Pais", title:"Confie no processo", text:"Romeo tem ótima compreensão verbal e compartilha atenção. São sinais muito positivos." },
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
  const pendingRef = useRef([]);

  async function fetchAll() {
    setSyncing(true);
    try {
      const [acts, mss, obs, ag, tips] = await Promise.all([
        sb.select("activities", "order=updated_at.desc"),
        sb.select("milestones", "order=updated_at.desc"),
        sb.select("observations", "order=updated_at.desc"),
        sb.select("agenda", "order=date.asc"),
        sb.select("tips_shown", "order=updated_at.desc"),
      ]);

      const activities = {};
      acts.forEach(a => {
        if (!activities[a.date]) activities[a.date] = {};
        if (!activities[a.date][a.act_id]) activities[a.date][a.act_id] = {};
        activities[a.date][a.act_id][a.profile] = { score: a.score, note: a.note, id: a.id };
      });

      const milestones = {};
      mss.forEach(m => {
        if (!milestones[m.milestone_id]) milestones[m.milestone_id] = {};
        milestones[m.milestone_id][m.profile] = { status: m.status, id: m.id };
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

  useEffect(() => { if (profile) fetchAll(); }, [profile]);

  // Poll every 30s for real-time feel
  useEffect(() => {
    if (!profile) return;
    const interval = setInterval(fetchAll, 30000);
    return () => clearInterval(interval);
  }, [profile]);

  async function logActivity(date, actId, score, note) {
    const rowId = `${date}_${actId}_${profile}`;
    await sb.upsert("activities", { id: rowId, date, act_id: actId, profile, score: score || null, note: note || null, updated_at: new Date().toISOString() });
    setData(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      if (!next.activities[date]) next.activities[date] = {};
      if (!next.activities[date][actId]) next.activities[date][actId] = {};
      next.activities[date][actId][profile] = { score, note, id: rowId };
      return next;
    });
  }

  async function setMilestone(msId, status) {
    const rowId = `${msId}_${profile}`;
    await sb.upsert("milestones", { id: rowId, milestone_id: msId, profile, status, updated_at: new Date().toISOString() });
    setData(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      if (!next.milestones[msId]) next.milestones[msId] = {};
      next.milestones[msId][profile] = { status, id: rowId };
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

  return { data, syncing, online, fetchAll, logActivity, setMilestone, setObservation, addAgendaItem, delAgendaItem, setTips };
}

// ── COMPONENTS ────────────────────────────────────────────────────────────────
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

function TabBar({active,onChange}) {
  const tabs=[{id:"hoje",label:"Hoje",icon:"🌟"},{id:"agenda",label:"Agenda",icon:"📅"},{id:"marcos",label:"Marcos",icon:"🏆"},{id:"relatorio",label:"Relatório",icon:"📋"},{id:"dicas",label:"Dicas",icon:"💡"}];
  return (
    <nav style={{position:"fixed",bottom:0,left:0,right:0,zIndex:100,background:"rgba(8,16,35,0.97)",backdropFilter:"blur(20px)",borderTop:"1px solid rgba(126,200,227,0.18)",display:"flex",justifyContent:"space-around",padding:"8px 0 12px"}}>
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

function ScoreSelect({value,onChange}) {
  const levels=[{v:"great",label:"🌟 Engajou muito bem!",color:"#A8E6CF"},{v:"good",label:"✅ Fez com pequena ajuda",color:"#7EC8E3"},{v:"partial",label:"🔄 Tentou parcialmente",color:"#FFE566"},{v:"none",label:"❌ Não engajou hoje",color:"rgba(255,100,100,0.8)"}];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      {levels.map(l=>(
        <button key={l.v} onClick={()=>onChange(l.v)} style={{padding:"9px 14px",borderRadius:10,border:"1.5px solid",borderColor:value===l.v?l.color:"rgba(255,255,255,0.1)",background:value===l.v?`${l.color}22`:"transparent",color:value===l.v?l.color:"rgba(255,255,255,0.5)",fontSize:13,fontFamily:"Nunito,sans-serif",fontWeight:value===l.v?700:400,cursor:"pointer",textAlign:"left",transition:"all 0.2s"}}>
          {l.label}
        </button>
      ))}
    </div>
  );
}

function ProfileBadge({profile, color, note}) {
  return (
    <span style={{fontSize:11,padding:"2px 8px",borderRadius:6,background:`${color}22`,border:`1px solid ${color}44`,color,fontFamily:"Nunito,sans-serif",fontWeight:700,marginRight:4}}>
      {profile==="Rafael"?"👨":"👩"} {profile}{note?`: ${note}`:""}
    </span>
  );
}

// ── TODAY TAB ─────────────────────────────────────────────────────────────────
function TodayTab({profile, sync}) {
  const date = todayStr();
  const weekend = isWeekend();
  const moments = weekend ? MOMENTS_WE : MOMENTS_WD;
  const [expanded, setExpanded] = useState(null);
  const dayActs = sync.data.activities[date] || {};
  const myObs = (sync.data.observations[date] || {})[profile] || {};
  const allObs = sync.data.observations[date] || {};
  const otherProfile = profile === "Rafael" ? "Jéssica" : "Rafael";
  const otherObs = allObs[otherProfile] || {};

  const actsByMoment = {};
  ACTIVITIES.forEach(a => { if (!actsByMoment[a.moment]) actsByMoment[a.moment] = []; actsByMoment[a.moment].push(a); });

  const doneToday = Object.keys(dayActs).filter(k => dayActs[k][profile]?.score || dayActs[k][otherProfile]?.score).length;

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
          <div style={{marginTop:5,display:"flex",gap:6,alignItems:"center"}}>
            {sync.syncing ? <span style={{fontSize:10,color:"#FFE566",fontFamily:"Nunito,sans-serif"}}>🔄 Sincronizando...</span>
              : sync.online ? <span style={{fontSize:10,color:"#A8E6CF",fontFamily:"Nunito,sans-serif"}}>✅ Sincronizado · {doneToday} atividades hoje</span>
              : <span style={{fontSize:10,color:"rgba(255,100,100,0.8)",fontFamily:"Nunito,sans-serif"}}>⚠️ Sem conexão</span>}
          </div>
        </div>
      </Card>

      {moments.map(m => {
        const acts = actsByMoment[m.id] || [];
        if (acts.length === 0) return (
          <div key={m.id} style={{marginBottom:16}}>
            <div style={{fontSize:13,fontWeight:800,color:"rgba(255,255,255,0.3)",fontFamily:"Nunito,sans-serif",padding:"8px 4px 4px"}}>{m.label} <span style={{fontSize:11,fontWeight:400}}>{m.time}</span></div>
          </div>
        );
        return (
          <div key={m.id} style={{marginBottom:18}}>
            <div style={{fontSize:13,fontWeight:800,color:"#A8E6CF",fontFamily:"Nunito,sans-serif",padding:"8px 4px 6px"}}>{m.label} <span style={{fontSize:11,fontWeight:400,color:"rgba(255,255,255,0.35)"}}>{m.time}</span></div>
            {acts.map(act => {
              const myAct = dayActs[act.id]?.[profile] || {};
              const otherAct = dayActs[act.id]?.[otherProfile] || {};
              const isExp = expanded === act.id;
              const anyDone = myAct.score || otherAct.score;
              return (
                <div key={act.id} style={{background:anyDone?"rgba(168,230,207,0.08)":"rgba(255,255,255,0.03)",border:`1px solid ${anyDone?"rgba(168,230,207,0.2)":"rgba(255,255,255,0.07)"}`,borderRadius:16,marginBottom:10,overflow:"hidden"}}>
                  <div style={{display:"flex",alignItems:"center",padding:"12px 16px",gap:12,cursor:"pointer"}} onClick={()=>setExpanded(isExp?null:act.id)}>
                    <span style={{fontSize:22}}>{act.icon}</span>
                    <div style={{flex:1}}>
                      <div style={{fontSize:14,fontWeight:700,color:"#fff",fontFamily:"Nunito,sans-serif"}}>{act.title}</div>
                      <div style={{fontSize:11,color:"rgba(255,255,255,0.38)",fontFamily:"Nunito,sans-serif"}}>⏱ {act.time}</div>
                      {/* Show who logged */}
                      <div style={{marginTop:4,display:"flex",gap:4,flexWrap:"wrap"}}>
                        {myAct.score && <ProfileBadge profile={profile} color="#7EC8E3" note={myAct.score==="great"?"🌟":myAct.score==="good"?"✅":myAct.score==="partial"?"🔄":"❌"}/>}
                        {otherAct.score && <ProfileBadge profile={otherProfile} color="#A8E6CF" note={otherAct.score==="great"?"🌟":otherAct.score==="good"?"✅":otherAct.score==="partial"?"🔄":"❌"}/>}
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

                      {/* Other person log (read-only) */}
                      {otherAct.score && (
                        <div style={{background:"rgba(168,230,207,0.07)",borderRadius:10,padding:"10px 12px",marginBottom:12,border:"1px solid rgba(168,230,207,0.15)"}}>
                          <div style={{fontSize:11,color:"#A8E6CF",fontWeight:700,fontFamily:"Nunito,sans-serif",marginBottom:4}}>
                            {otherProfile==="Rafael"?"👨":"👩"} Registro de {otherProfile}:
                          </div>
                          <div style={{fontSize:12,color:"rgba(255,255,255,0.7)",fontFamily:"Nunito,sans-serif"}}>
                            {otherAct.score==="great"?"🌟 Engajou muito bem":otherAct.score==="good"?"✅ Fez com pequena ajuda":otherAct.score==="partial"?"🔄 Tentou parcialmente":"❌ Não engajou"}
                            {otherAct.note && ` — ${otherAct.note}`}
                          </div>
                        </div>
                      )}

                      <SLabel color="#7EC8E3">MEU REGISTRO ({profile})</SLabel>
                      <ScoreSelect value={myAct.score} onChange={v=>sync.logActivity(date,act.id,v,myAct.note||"")}/>
                      <div style={{marginTop:10}}>
                        <textarea placeholder="Observação rápida..." value={myAct.note||""} onChange={e=>sync.logActivity(date,act.id,myAct.score||null,e.target.value)} style={{width:"100%",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,color:"#fff",padding:"9px 12px",fontSize:13,fontFamily:"Nunito,sans-serif",resize:"none",minHeight:55,boxSizing:"border-box",outline:"none"}}/>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}

      {/* Observations */}
      <Card>
        <SLabel color="#FFE566">📝 MINHAS OBSERVAÇÕES DO DIA</SLabel>
        {[{k:"sons_novos",p:"Novos sons ou vocalizações hoje..."},{k:"palavras_novas",p:"Novas tentativas de palavras..."},{k:"habilidades",p:"Novas habilidades observadas..."},{k:"dificuldades",p:"Dificuldades ou baixo engajamento..."},{k:"conquistas",p:"Uma conquista do dia..."}].map(item=>(
          <textarea key={item.k} placeholder={item.p} value={myObs[item.k]||""} onChange={e=>sync.setObservation(date,item.k,e.target.value)} style={{width:"100%",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:10,color:"#fff",padding:"9px 12px",fontSize:13,fontFamily:"Nunito,sans-serif",resize:"none",minHeight:50,boxSizing:"border-box",outline:"none",marginBottom:10}}/>
        ))}
        {/* Show other person's observations */}
        {Object.keys(otherObs).length > 0 && (
          <div style={{marginTop:8,padding:"12px",background:"rgba(168,230,207,0.06)",borderRadius:10,border:"1px solid rgba(168,230,207,0.12)"}}>
            <div style={{fontSize:11,color:"#A8E6CF",fontWeight:700,fontFamily:"Nunito,sans-serif",marginBottom:8}}>
              {otherProfile==="Rafael"?"👨":"👩"} Observações de {otherProfile}:
            </div>
            {Object.entries(otherObs).map(([k,v])=>v?<div key={k} style={{fontSize:12,color:"rgba(255,255,255,0.6)",fontFamily:"Nunito,sans-serif",marginBottom:4}}>· {v}</div>:null)}
          </div>
        )}
      </Card>

      <button onClick={sync.fetchAll} style={{width:"100%",padding:"12px",borderRadius:12,background:"rgba(126,200,227,0.1)",border:"1px solid rgba(126,200,227,0.2)",color:"#7EC8E3",fontFamily:"Nunito,sans-serif",fontWeight:700,fontSize:13,cursor:"pointer",marginBottom:10}}>
        🔄 Atualizar agora
      </button>
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
  days.forEach(d => { week.push(d); if (week.length === 7) { weeks.push(week); week = []; } });
  if (week.length > 0) { while (week.length < 7) week.push(null); weeks.push(week); }

  const upcoming = agendaItems.filter(i=>i.date>=todayStr()).sort((a,b)=>a.date.localeCompare(b.date));

  return (
    <div style={{paddingBottom:90}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <div style={{fontSize:18,fontWeight:800,color:"#fff",fontFamily:"Baloo 2,cursive"}}>📅 Agenda</div>
        <button onClick={()=>setShowForm(!showForm)} style={{background:"rgba(126,200,227,0.15)",border:"1px solid rgba(126,200,227,0.3)",borderRadius:10,padding:"8px 14px",color:"#7EC8E3",fontFamily:"Nunito,sans-serif",fontWeight:700,fontSize:13,cursor:"pointer"}}>+ Novo</button>
      </div>

      {showForm && (
        <Card accent style={{marginBottom:16}}>
          <SLabel>NOVO EVENTO</SLabel>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            <input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:10,color:"#fff",padding:"10px 12px",fontSize:14,fontFamily:"Nunito,sans-serif",outline:"none",width:"100%",boxSizing:"border-box"}}/>
            <input type="time" value={form.time} onChange={e=>setForm({...form,time:e.target.value})} style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:10,color:"#fff",padding:"10px 12px",fontSize:14,fontFamily:"Nunito,sans-serif",outline:"none",width:"100%",boxSizing:"border-box"}}/>
            <input type="text" placeholder="Descrição (ex: Consulta fono, Pegar guia...)" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:10,color:"#fff",padding:"10px 12px",fontSize:14,fontFamily:"Nunito,sans-serif",outline:"none",width:"100%",boxSizing:"border-box"}}/>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {AGENDA_TYPES.map(t=>(
                <button key={t.v} onClick={()=>setForm({...form,type:t.v})} style={{padding:"6px 12px",borderRadius:20,border:"1px solid",borderColor:form.type===t.v?t.color:"rgba(255,255,255,0.12)",background:form.type===t.v?`${t.color}22`:"transparent",color:form.type===t.v?t.color:"rgba(255,255,255,0.4)",fontSize:12,fontFamily:"Nunito,sans-serif",fontWeight:600,cursor:"pointer"}}>
                  {t.label}
                </button>
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
          <button key={t.v} onClick={()=>setView(t.v)} style={{flex:1,padding:"8px 0",borderRadius:10,border:"none",background:view===t.v?"#7EC8E3":"transparent",color:view===t.v?"#0A1428":"rgba(255,255,255,0.4)",fontFamily:"Nunito,sans-serif",fontWeight:700,fontSize:13,cursor:"pointer"}}>
            {t.l}
          </button>
        ))}
      </div>

      {view==="upcoming" && (
        <div>
          {upcoming.length===0 && <div style={{fontSize:13,color:"rgba(255,255,255,0.3)",fontFamily:"Nunito,sans-serif",textAlign:"center",padding:"40px 0"}}>Nenhum evento agendado</div>}
          {upcoming.map(item=>{
            const tc=AGENDA_TYPES.find(t=>t.v===item.type)?.color||"#7EC8E3";
            const [y,m,d]=item.date.split("-");
            return (
              <div key={item.id} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderLeft:`3px solid ${tc}`,borderRadius:"0 14px 14px 0",padding:"12px 14px",marginBottom:10,display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:"#fff",fontFamily:"Nunito,sans-serif"}}>{item.title}</div>
                  <div style={{fontSize:11,color:tc,fontFamily:"Nunito,sans-serif",marginTop:3}}>
                    {d}/{m}/{y}{item.time?` às ${item.time}`:""} · {AGENDA_TYPES.find(t=>t.v===item.type)?.label}
                  </div>
                  {item.profile && <div style={{fontSize:10,color:"rgba(255,255,255,0.35)",fontFamily:"Nunito,sans-serif",marginTop:2}}>Adicionado por {item.profile}</div>}
                </div>
                <button onClick={()=>sync.delAgendaItem(item.id)} style={{background:"transparent",border:"none",color:"rgba(255,100,100,0.5)",fontSize:20,cursor:"pointer",paddingLeft:8}}>×</button>
              </div>
            );
          })}
        </div>
      )}

      {view==="month" && (
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
  const statusOpts=[{v:"yes",label:"✅ Atingido",color:"#A8E6CF"},{v:"progress",label:"🔄 Em progresso",color:"#FFE566"},{v:"no",label:"❌ Ainda não",color:"rgba(255,80,80,0.8)"}];
  const msd = sync.data.milestones;
  const total=MILESTONES.length;
  const done=MILESTONES.filter(m=>(msd[m.id]?.["Rafael"]?.status==="yes")||(msd[m.id]?.["Jéssica"]?.status==="yes")).length;
  const prog=MILESTONES.filter(m=>{const r=msd[m.id];return !done&&((r?.["Rafael"]?.status==="progress")||(r?.["Jéssica"]?.status==="progress"));}).length;

  return (
    <div style={{paddingBottom:90}}>
      <div style={{display:"flex",gap:10,marginBottom:20}}>
        {[{label:"✅ Atingidos",val:done,color:"#A8E6CF"},{label:"🔄 Progresso",val:prog,color:"#FFE566"},{label:"Total",val:total,color:"rgba(255,255,255,0.5)"}].map((s,i)=>(
          <div key={i} style={{flex:1,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:"10px 8px",textAlign:"center"}}>
            <div style={{fontSize:20,fontWeight:800,color:s.color,fontFamily:"Nunito,sans-serif"}}>{s.val}</div>
            <div style={{fontSize:10,color:"rgba(255,255,255,0.3)",fontFamily:"Nunito,sans-serif"}}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
        {cats.map(c=>(
          <button key={c} onClick={()=>setActiveCat(c)} style={{padding:"6px 14px",borderRadius:20,border:"1px solid",borderColor:activeCat===c?"#7EC8E3":"rgba(255,255,255,0.12)",background:activeCat===c?"rgba(126,200,227,0.15)":"transparent",color:activeCat===c?"#7EC8E3":"rgba(255,255,255,0.4)",fontSize:12,fontFamily:"Nunito,sans-serif",fontWeight:700,cursor:"pointer"}}>
            {c}
          </button>
        ))}
      </div>
      {filtered.map(m=>{
        const myMs=msd[m.id]?.[profile]||{};
        const otherMs=msd[m.id]?.[otherProfile]||{};
        return (
          <Card key={m.id} style={{marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
              <div style={{flex:1,paddingRight:8}}>
                <div style={{fontSize:14,fontWeight:700,color:"#fff",fontFamily:"Nunito,sans-serif",lineHeight:1.4}}>{m.label}</div>
                <div style={{fontSize:11,color:"#7EC8E3",fontFamily:"Nunito,sans-serif",marginTop:2}}>Ref: {m.ref}</div>
              </div>
            </div>
            {/* Other person status */}
            {otherMs.status && (
              <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",fontFamily:"Nunito,sans-serif",marginBottom:8}}>
                {otherProfile==="Rafael"?"👨":"👩"} {otherProfile}: {otherMs.status==="yes"?"✅ Atingido":otherMs.status==="progress"?"🔄 Em progresso":"❌ Ainda não"}
              </div>
            )}
            <SLabel color="rgba(255,255,255,0.4)">MEU REGISTRO:</SLabel>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {statusOpts.map(s=>(
                <button key={s.v} onClick={()=>sync.setMilestone(m.id,s.v)} style={{padding:"6px 12px",borderRadius:20,border:"1.5px solid",borderColor:myMs.status===s.v?s.color:"rgba(255,255,255,0.1)",background:myMs.status===s.v?`${s.color}22`:"transparent",color:myMs.status===s.v?s.color:"rgba(255,255,255,0.35)",fontSize:12,fontFamily:"Nunito,sans-serif",fontWeight:myMs.status===s.v?700:400,cursor:"pointer",transition:"all 0.2s"}}>
                  {s.label}
                </button>
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
  const [type, setType] = useState("daily");
  const [copied, setCopied] = useState(false);
  const date = todayStr();
  const dates = weekDates();
  const {activities, milestones, observations} = sync.data;
  const scoreMap={great:"Engajou muito bem 🌟",good:"Fez com pequena ajuda ✅",partial:"Tentou parcialmente 🔄",none:"Não engajou ❌"};

  function buildDaily() {
    const dayActs = activities[date]||{};
    let r=`RELATÓRIO DIÁRIO — Romeo dos Santos\n`;
    r+=`Data: ${new Date().toLocaleDateString("pt-BR")}\n\n`;
    r+="ATIVIDADES:\n";
    let any=false;
    ACTIVITIES.forEach(a=>{
      const ra=dayActs[a.id]?.["Rafael"];
      const ja=dayActs[a.id]?.["Jéssica"];
      if(ra?.score||ja?.score){
        any=true;
        r+=`• ${a.title}\n`;
        if(ra?.score) r+=`  👨 Rafael: ${scoreMap[ra.score]}${ra.note?` — ${ra.note}`:""}\n`;
        if(ja?.score) r+=`  👩 Jéssica: ${scoreMap[ja.score]}${ja.note?` — ${ja.note}`:""}\n`;
      }
    });
    if(!any) r+="(Nenhuma atividade registrada)\n";
    const obsLabels={sons_novos:"Novos sons",palavras_novas:"Novas palavras",habilidades:"Novas habilidades",dificuldades:"Dificuldades",conquistas:"Conquistas"};
    r+="\nOBSERVAÇÕES:\n";
    ["Rafael","Jéssica"].forEach(p=>{
      const obs=(observations[date]||{})[p]||{};
      const entries=Object.entries(obsLabels).filter(([k])=>obs[k]);
      if(entries.length>0){r+=`${p==="Rafael"?"👨":"👩"} ${p}:\n`;entries.forEach(([k,l])=>r+=`  • ${l}: ${obs[k]}\n`);}
    });
    return r;
  }

  function buildWeekly() {
    let r=`RELATÓRIO SEMANAL — Romeo dos Santos\n`;
    r+=`Semana: ${fmtDate(dates[0])} a ${fmtDate(dates[6])}\n\n`;
    const sc={great:0,good:0,partial:0,none:0,total:0};
    dates.forEach(d=>{const da=activities[d]||{};Object.values(da).forEach(byP=>{Object.values(byP).forEach(a=>{if(a.score){sc[a.score]++;sc.total++;}});});});
    if(sc.total>0){r+=`ENGAJAMENTO: ${Math.round((sc.great+sc.good)/sc.total*100)}% positivo\n`;r+=`🌟 Muito bem: ${sc.great} | ✅ Com ajuda: ${sc.good} | 🔄 Parcial: ${sc.partial} | ❌ Sem engajamento: ${sc.none}\n\n`;}
    r+="MARCOS:\n";
    MILESTONES.forEach(m=>{
      const byP=milestones[m.id]||{};
      const yes=Object.values(byP).some(v=>v.status==="yes");
      const prog=!yes&&Object.values(byP).some(v=>v.status==="progress");
      if(yes) r+=`✅ ${m.label}\n`;
      else if(prog) r+=`🔄 ${m.label}\n`;
    });
    r+="\nCONQUISTAS DA SEMANA:\n";
    dates.forEach(d=>{["Rafael","Jéssica"].forEach(p=>{const v=(observations[d]||{})[p]?.conquistas;if(v)r+=`${fmtDate(d)} (${p}): ${v}\n`;});});
    r+="\nDIFICULDADES:\n";
    dates.forEach(d=>{["Rafael","Jéssica"].forEach(p=>{const v=(observations[d]||{})[p]?.dificuldades;if(v)r+=`${fmtDate(d)} (${p}): ${v}\n`;});});
    return r;
  }

  const text = type==="daily" ? buildDaily() : buildWeekly();
  function copy(){navigator.clipboard?.writeText(text.replace(/\\n/g,"\n")).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2500);});}

  const chartData=dates.map(d=>{
    const da=activities[d]||{};
    let total=0,pos=0;
    Object.values(da).forEach(byP=>{Object.values(byP).forEach(a=>{if(a.score){total++;if(a.score==="great"||a.score==="good")pos++;}});});
    return{date:fmtDate(d),pct:total?Math.round(pos/total*100):0,total};
  });

  return (
    <div style={{paddingBottom:90}}>
      <div style={{fontSize:18,fontWeight:800,color:"#fff",fontFamily:"Baloo 2,cursive",marginBottom:16}}>📋 Relatórios</div>
      <div style={{display:"flex",background:"rgba(255,255,255,0.05)",borderRadius:12,padding:4,marginBottom:16}}>
        {[{v:"daily",l:"Diário"},{v:"weekly",l:"Semanal"}].map(t=>(
          <button key={t.v} onClick={()=>setType(t.v)} style={{flex:1,padding:"8px 0",borderRadius:10,border:"none",background:type===t.v?"#7EC8E3":"transparent",color:type===t.v?"#0A1428":"rgba(255,255,255,0.4)",fontFamily:"Nunito,sans-serif",fontWeight:700,fontSize:14,cursor:"pointer"}}>
            {t.l}
          </button>
        ))}
      </div>
      {type==="weekly"&&(
        <Card style={{marginBottom:16}}>
          <SLabel>ENGAJAMENTO DA SEMANA (Rafael + Jéssica)</SLabel>
          <div style={{display:"flex",alignItems:"flex-end",gap:5,height:70}}>
            {chartData.map((d,i)=>(
              <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                <div style={{width:"100%",background:d.pct>0?"#7EC8E3":"rgba(255,255,255,0.08)",borderRadius:"3px 3px 0 0",height:`${Math.max(d.pct*0.55,d.total>0?4:2)}px`,minHeight:2}}/>
                <span style={{fontSize:9,color:"rgba(255,255,255,0.35)",fontFamily:"Nunito,sans-serif"}}>{d.date}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
      <Card style={{marginBottom:14}}>
        <pre style={{fontSize:12,color:"rgba(255,255,255,0.8)",fontFamily:"Nunito,sans-serif",whiteSpace:"pre-wrap",lineHeight:1.7,margin:0}}>{text.replace(/\\n/g,"\n")}</pre>
      </Card>
      <button onClick={copy} style={{width:"100%",padding:"14px 0",borderRadius:14,background:copied?"#A8E6CF":"#7EC8E3",border:"none",color:"#0A1428",fontSize:15,fontWeight:800,fontFamily:"Nunito,sans-serif",cursor:"pointer",transition:"all 0.3s"}}>
        {copied?"✅ Copiado!":"📋 Copiar relatório (Rafael + Jéssica)"}
      </button>
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
      <div style={{fontSize:12,color:"rgba(255,255,255,0.4)",fontFamily:"Nunito,sans-serif",marginBottom:16}}>{showAll?`${allFiltered.length} dicas`:"4 dicas do dia — iguais para Rafael e Jéssica"}</div>
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
        <button onClick={()=>{const pick=[...TIPS].sort(()=>Math.random()-0.5).slice(0,4).map(t=>t.id);sync.setTips(date,pick);}} style={{width:"100%",padding:"12px 0",borderRadius:12,background:"rgba(255,229,102,0.1)",border:"1px solid rgba(255,229,102,0.2)",color:"#FFE566",fontFamily:"Nunito,sans-serif",fontWeight:700,fontSize:14,cursor:"pointer",marginTop:4}}>
          🔀 Novas dicas do dia
        </button>
      )}
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
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
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:12,color:"#7EC8E3",fontWeight:700,fontFamily:"Nunito,sans-serif"}}>{profile} {profile==="Rafael"?"👨":"👩"}</span>
          {sync.syncing&&<span style={{fontSize:10,color:"#FFE566",fontFamily:"Nunito,sans-serif"}}>🔄</span>}
          {!sync.online&&<span style={{fontSize:10,color:"rgba(255,100,100,0.8)",fontFamily:"Nunito,sans-serif"}}>⚠️</span>}
          <button onClick={()=>{localStorage.removeItem("hablaromeo_profile");setProfile(null);}} style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"4px 8px",color:"rgba(255,255,255,0.45)",fontSize:11,cursor:"pointer",fontFamily:"Nunito,sans-serif"}}>trocar</button>
        </div>
      </div>
      <div style={{padding:"20px 20px 0",position:"relative",zIndex:1}}>{tabs[activeTab]}</div>
      <TabBar active={activeTab} onChange={setActiveTab}/>
    </div>
  );
}
