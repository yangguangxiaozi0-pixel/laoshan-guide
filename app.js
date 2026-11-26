'use strict';

const labels = {
  zh: {
    brand: '崂山游览问答', subBrand: 'LAOSHAN VISITOR GUIDE', location: '青岛 · 崂山风景区',
    headline: '出发前，问一问。', intro: '查常规开放时间、交通换乘和游客服务。\n支持中文与 English 提问。',
    ask: '你想了解什么？', submit: '查询', answer: '查询结果', official: '景区官方渠道',
    officialNote: '临时开闭园及当天运营情况，请在出发前核实。', about: '项目演示 · 依据景区公开官方资料整理',
    reviewed: '资料核对', dated: '官网发布', undated: '官网未标注发布日期', evidence: '官方来源',
    notice: '查看官方公告', call: '拨打 0532-96616', examples: '示例问题', question: '问题',
    placeholder: '例如：去巨峰在哪一站换乘？', blank: '请输入你想查询的问题。',
    samples: [
      ['开放时间', '崂山常规开放时间是几点？'],
      ['交通换乘', '去巨峰在哪一站换乘？'],
      ['行李寄存', '景区哪里可以寄存行李？'],
      ['预约购票', '崂山门票怎么预约？'],
      ['今天开放吗？', '崂山今天开放吗？']
    ]
  },
  en: {
    brand: 'Laoshan Visitor Guide', subBrand: '崂山游览问答', location: 'QINGDAO · LAOSHAN SCENIC AREA',
    headline: 'Ask before you go.', intro: 'Find regular hours, public transport, and visitor services.\nAsk in English or Chinese.',
    ask: 'What would you like to know?', submit: 'Search', answer: 'Answer', official: 'Official visitor information',
    officialNote: 'Check for temporary closures and operating updates before you travel.', about: 'Project demo · Based on public official information',
    reviewed: 'Information checked', dated: 'Official publication', undated: 'No publication date shown', evidence: 'Official sources',
    notice: 'View official notices', call: 'Call 0532-96616', examples: 'Example questions', question: 'Question',
    placeholder: 'e.g. Where do I transfer for Jufeng?', blank: 'Enter a question to continue.',
    samples: [
      ['Opening hours', 'What are the regular opening hours at Laoshan?'],
      ['Public transport', 'Where do I transfer for Jufeng?'],
      ['Luggage storage', 'Where can I leave my luggage?'],
      ['Ticket reservations', 'How can I book tickets for Laoshan?'],
      ['Open today?', 'Is Laoshan open today?']
    ]
  }
};

const form = document.querySelector('#question-form');
const input = document.querySelector('#question');
const results = document.querySelector('#results');
const answerList = document.querySelector('#answer-list');
const chips = document.querySelector('#chips');
const languageButtons = [...document.querySelectorAll('[data-language]')];
let language = 'zh';
let lastQuestion = '';

function node(tag, value, className) {
  const element = document.createElement(tag);
  if (value) element.textContent = value;
  if (className) element.className = className;
  return element;
}

function link(value, url, external = true) {
  const element = node('a', value);
  element.href = url;
  if (external) {
    element.target = '_blank';
    element.rel = 'noopener noreferrer';
  }
  return element;
}

function channels(copy) {
  return [link(copy.notice, CHANNELS.notices), link(copy.call, CHANNELS.tel, false)];
}

function addChannels(parent, copy) {
  const actions = node('div', '', 'channel-links');
  actions.append(...channels(copy));
  parent.append(actions);
}

function renderCard(result, lang, isFallback = false) {
  const copy = labels[lang];
  const card = node('article', '', isFallback ? 'answer-card needs-check' : 'answer-card');
  card.lang = lang === 'zh' ? 'zh-CN' : 'en';
  card.append(node('h3', result.title), node('p', result.text));
  if (result.rows) {
    const list = node('dl', '', 'hours');
    for (const [date, time] of result.rows) list.append(node('dt', date), node('dd', time));
    card.append(list);
  }
  if (result.note) card.append(node('p', result.note, 'note'));
  if (isFallback || result.channels) addChannels(card, copy);
  if (result.sources) {
    const section = node('div', '', 'sources');
    section.append(node('strong', copy.evidence));
    const list = node('ul');
    for (const source of result.sources) {
      const item = node('li');
      item.append(link(source.title, source.url), document.createTextNode(
        ' · ' + (source.published ? copy.dated + ' ' + source.published : copy.undated)));
      list.append(item);
    }
    section.append(list, node('p', copy.reviewed + ' ' + REVIEWED));
    card.append(section);
  }
  return card;
}

function showAnswer(shouldScroll) {
  const reply = answerQuestion(lastQuestion, language);
  const copy = labels[reply.language];
  const asked = document.querySelector('#asked');
  asked.textContent = copy.question + ' · ' + lastQuestion;
  asked.lang = reply.language === 'zh' ? 'zh-CN' : 'en';
  results.hidden = false;
  answerList.replaceChildren(...(reply.type === 'answer'
    ? reply.cards.map(card => renderCard(card, reply.language))
    : [renderCard(reply, reply.language, true)]));
  if (shouldScroll) {
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    results.scrollIntoView({ block: 'nearest', behavior: reducedMotion ? 'instant' : 'smooth' });
  }
}

function ask(value) {
  const question = value.trim();
  if (!question) {
    input.setCustomValidity(labels[language].blank);
    input.reportValidity();
    return;
  }
  input.value = question;
  lastQuestion = question;
  showAnswer(true);
}

function setLanguage(value) {
  language = value;
  const copy = labels[value];
  document.documentElement.lang = value === 'zh' ? 'zh-CN' : 'en';
  document.querySelectorAll('[data-copy]').forEach(element => {
    element.textContent = copy[element.dataset.copy];
  });
  input.placeholder = copy.placeholder;
  input.setCustomValidity('');
  languageButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === value)));
  chips.setAttribute('aria-label', copy.examples);
  chips.replaceChildren(...copy.samples.map(([title, question], index) => {
    const chip = node('button', title, index === copy.samples.length - 1 ? 'live-chip' : '');
    chip.type = 'button';
    chip.addEventListener('click', () => ask(question));
    return chip;
  }));
  document.querySelector('#official-links').replaceChildren(...channels(copy));
  document.querySelector('#reviewed').textContent = copy.reviewed + ' ' + REVIEWED;
  if (lastQuestion) showAnswer(false);
}

languageButtons.forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.language)));
input.addEventListener('input', () => input.setCustomValidity(''));
form.addEventListener('submit', event => {
  event.preventDefault();
  ask(input.value);
});
setLanguage('zh');
