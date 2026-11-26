'use strict';

const REVIEWED = '2026-11-26';
const CHANNELS = {
  notices: 'https://www.qdlaoshan.cn/News-index-s1-1.html',
  phone: '0532-96616',
  tel: 'tel:053296616'
};

const sources = {
  hours: ['常规开放时间公告', 'Regular opening hours notice', '2025-10-11', 'https://qdlaoshan.cn/News-info-nid-6069.html'],
  season: ['2026 年旅游接待通告', '2026 visitor operations notice', '2026-04-05', 'https://qdlaoshan.cn/News-info-nid-6295.html'],
  transit: ['景区绿色出行指南', 'Scenic area public transport guide', '2026-04-01', 'https://qdlaoshan.cn/News-info-nid-6289.html'],
  visit: ['景区出游提示及预约指南', 'Visitor and booking guide', '2026-10-04', 'https://qdlaoshan.cn/News-info-nid-6565.html'],
  storage: ['官网常见问题 · 行李寄存', 'Official FAQ: luggage storage', null, 'https://qdlaoshan.cn/Zixun-qinfo-qid-1.html'],
  freepark: ['官网常见问题 · 停车', 'Official FAQ: parking', null, 'https://qdlaoshan.cn/Zixun-qinfo-qid-2.html'],
  parking: ['景区官方停车指南', 'Official parking guide', '2026-10-05', 'https://qdlaoshan.cn/News-info-nid-6575.html'],
  fares: ['崂山风景名胜区门票价格', 'Official scenic area price table', '2026-06-04', 'https://www.qdlaoshan.cn/News-info-nid-6407.html'],
  closure: ['官方公告与热线说明', 'Official notice and hotline information', '2026-07-14', 'https://www.qdlaoshan.cn/News-info-nid-6466.html']
};

const regular = '常规时段，节假日及临时调整以景区最新公告为准。';
const regularEn = 'These are regular hours. Check official notices for holiday schedules and temporary changes.';
const hours = [regular, regularEn];
const scheduleLead = [
  '官网常规开放时段见下表。2026 年接待通告也列出了 4–12 月对应时段。',
  'The official regular hours are listed below. The 2026 visitor notice also lists the corresponding hours for April through December.'
];
const scheduleRows = [
  ['3 月 1 日–6 月 30 日', 'Mar 1–Jun 30', '07:00–17:30'],
  ['7 月 1 日–8 月 31 日', 'Jul 1–Aug 31', '06:00–19:00'],
  ['9 月 1 日–11 月 30 日', 'Sep 1–Nov 30', '07:00–17:30'],
  ['12 月 1 日–次年 2 月 28 日', 'Dec 1–Feb 28', '07:30–17:00']
];

const zh = 0;
const en = 1;
const entries = {};
function entry(id, title, answer, evidence, extra = {}) {
  entries[id] = { id, title, answer, evidence, ...extra };
}

entry('hours', ['常规开放时间', 'Regular opening hours'], scheduleLead, ['season', 'hours'], { rows: scheduleRows, note: hours });
entry('spring', ['3–6 月常规开放时间', 'Regular hours from March to June'],
  ['3 月 1 日至 6 月 30 日通常为 07:00–17:30。', 'Regular opening hours from March 1 through June 30 are 07:00–17:30.'], ['hours', 'season'], { note: hours });
entry('summer', ['7–8 月常规开放时间', 'Regular hours in July and August'],
  ['7 月 1 日至 8 月 31 日通常为 06:00–19:00。', 'Regular opening hours from July 1 through August 31 are 06:00–19:00.'], ['season', 'hours'], { note: hours });
entry('autumn', ['9–11 月常规开放时间', 'Regular hours from September to November'],
  ['9 月 1 日至 11 月 30 日通常为 07:00–17:30。', 'Regular opening hours from September 1 through November 30 are 07:00–17:30.'], ['season', 'hours'], { note: hours });
entry('winter', ['12–2 月常规开放时间', 'Regular hours from December to February'],
  ['12 月 1 日至次年 2 月 28 日通常为 07:30–17:00。', 'Regular opening hours from December 1 through February 28 of the following year are 07:30–17:00.'], ['hours', 'season'], { note: hours });
entry('cutoff', ['游客中心常规停售时间', 'Regular ticket counter cutoff'],
  ['景区常规开放公告说明，各游客服务中心通常比景区闭园提前约两小时停止售票。', 'The regular hours notice says visitor center ticket counters generally stop selling tickets about two hours before the scenic area closes.'], ['hours'], { note: hours });

entry('south', ['巨峰、太清 · 大河东换乘', 'Jufeng and Taiqing via Dahedong'],
  ['乘地铁 4 号线到大河东站，从 A 口出站，前往大河东游客服务中心，可换乘景区观光车去巨峰或太清。', 'Take Metro Line 4 to Dahedong, use Exit A, and transfer to a scenic shuttle for Jufeng or Taiqing at Dahedong Visitor Center.'], ['transit']);
entry('north', ['九水、华楼 · 北九水换乘', 'Jiushui and Hualou via Beijiushui'],
  ['乘蓝谷快线到北九水站，从 B 口前往九水换乘中心，换乘景区观光车去九水。官网交通提示也列出了从九水换乘景区观光车前往华楼的方式。', 'Take the Blue Valley Line to Beijiushui, take Exit B to the Jiushui Transfer Center, and transfer to the scenic shuttle to Jiushui. The official guide also describes a shuttle transfer from Jiushui to Hualou.'], ['transit']);
entry('east', ['仰口、华严 · 浦里换乘', 'Yangkou and Huayan via Puli'],
  ['乘蓝谷快线到浦里站，从 A 口出站，换乘 620 路或 926 路公交，在仰口站下车。前往华严可在仰口换乘景区观光车。', 'Take the Blue Valley Line to Puli, use Exit A, and take bus 620 or 926 to Yangkou. Transfer to the scenic shuttle at Yangkou for Huayan.'], ['transit']);
entry('erlong', ['二龙山 · 晓望下车', 'Erlongshan via Xiaowang'],
  ['按景区东线指引，乘蓝谷快线到浦里站 A 口，换乘 620 路或 926 路公交，在晓望站下车。', 'For Erlongshan, the official east route uses Puli Station Exit A on the Blue Valley Line. Take bus 620 or 926 and get off at Xiaowang.'], ['transit']);
entry('transport', ['景区公共交通换乘', 'Public transport connections'],
  ['南线巨峰、太清：地铁 4 号线大河东站 A 口。北线九水：蓝谷快线北九水站 B 口。东线仰口：蓝谷快线浦里站 A 口换乘 620 或 926 路公交。下方原文还列出华严、华楼和二龙山的换乘信息。',
   'South (Jufeng/Taiqing): Line 4 to Dahedong, Exit A. North (Jiushui): Blue Valley Line to Beijiushui, Exit B. East (Yangkou): Blue Valley Line to Puli, Exit A, then bus 620 or 926. The official guide also covers Huayan, Hualou, and Erlongshan.'], ['transit']);

entry('storage', ['免费行李寄存', 'Free luggage storage'],
  ['官网列出的免费寄存点有崂山游客服务中心、仰口游客服务中心、九水游客服务中心及九水游览区内的三水检票处。', 'The official FAQ lists free luggage storage at Laoshan, Yangkou and Jiushui visitor centers, and at the Sanshui ticket checkpoint in Jiushui.'], ['storage']);
entry('services', ['游客中心咨询服务', 'Visitor center information services'],
  ['景区游客服务中心提供免费宣传资料和志愿者咨询。', 'Scenic area visitor centers offer free informational materials and help from volunteers.'], ['season']);
entry('parking', ['游客中心停车场', 'Visitor center parking'],
  ['官网停车指南列出了大河东（巨峰、太清方向）、仰口（仰口、华严方向）、九水及华楼临时客服中心停车场。具体点位请打开原文查看。', 'The official guide lists car parks at Dahedong (Jufeng and Taiqing), Yangkou (Yangkou and Huayan), Jiushui, and the temporary Hualou Visitor Center. See the official guide for locations.'], ['parking']);
entry('freepark', ['官网列出的免费停车点', 'Officially listed free parking'],
  ['景区官网常见问题列出的免费停车点为大河东、仰口和九水游客服务中心。', 'The scenic area FAQ lists free parking at Dahedong, Yangkou, and Jiushui visitor centers.'], ['freepark']);
entry('charging', ['停车场充电设施', 'EV charging at car parks'],
  ['停车指南列出大河东南停车场 150 个可充电车位、仰口一号车场 23 个充电车位、九水地面停车场 49 个充电桩，以及华楼临时客服中心 14 个充电车位。', 'The official guide lists 150 charging spaces in Dahedong South, 23 at Yangkou Lot 1, 49 charging stations at the surface lot in Jiushui, and 14 charging spaces at the temporary Hualou center.'], ['parking']);
entry('accessible', ['华楼无障碍车位', 'Accessible parking at Hualou'],
  ['官网停车指南显示，华楼临时客服中心停车场设有 2 个无障碍车位。', 'The official parking guide lists two accessible spaces at the temporary Hualou Visitor Center.'], ['parking']);
entry('hotline', ['景区旅游服务热线', 'Scenic area visitor hotline'],
  ['旅游咨询可拨打崂山风景区服务热线 0532-96616。景区公告会发布开闭园及其他运营通知。', 'Call Laoshan Scenic Area at 0532-96616 for visitor assistance. The official notices page publishes park closures and other operational updates.'], ['closure'], { channels: true });
entry('notice', ['景区官方公告渠道', 'Official scenic area notices'],
  ['请查看景区官网公告，也可关注「崂山风景区官方微博」或「青岛崂山风景名胜区」微信公众号。电话咨询请拨打 0532-96616。', 'Check the official notices or look up 崂山风景区官方微博 on Weibo and 青岛崂山风景名胜区 on WeChat. The visitor hotline is 0532-96616.'], ['hours', 'closure'], { channels: true });

entry('booking', ['实名预约购票', 'Real-name ticket reservations'],
  ['景区实行实名制网上预约购票，预约通道提前 7 天开放。可在「崂山风景区」或「青岛崂山风景名胜区」官方微信公众号预约。', 'Laoshan uses real-name online ticket reservations. Booking opens seven days in advance. Use the official WeChat accounts 崂山风景区 or 青岛崂山风景名胜区 to reserve.'], ['visit']);
entry('refund', ['因行程变化办理退票', 'Refunds when plans change'],
  ['因天气或其他原因改变行程时，官网提示在原预约入园时段结束前通过原购票渠道办理退票；改时间出游需重新预约购票。', 'If your plans change because of weather or for another reason, the official notice says to request a refund through the original booking channel before your reserved entry slot ends. Book again for a different visit time.'], ['season']);
entry('price', ['官方门票价格表', 'Official ticket price table'],
  ['票价按游览区和票种区分。下方来源链接直达景区官方价目表，可查看各游览区门票、观光车与索道票价。', 'Prices depend on the scenic area and ticket type. The source below opens the official table for admission, sightseeing shuttles and cableways.'], ['fares']);
entry('discount', ['优惠群体购票', 'Booking discounted tickets'],
  ['景区提示，老年人、未成年人、大学生等部分优惠群体可在网上预约购票，也可携带有效证件到景区购票窗口办理。具体适用条件请以官方公示或热线为准。', 'The official guide says some eligible groups, including seniors, minors and university students, can reserve online or present valid ID at a scenic area ticket counter. See the official price table or call the hotline for eligibility details.'], ['visit', 'fares'], { channels: true });
entry('pets', ['宠物入园规定', 'Pet policy'],
  ['景区通告要求游客不要携带宠物入园。', 'The official visitor notice asks visitors to leave pets outside the scenic area.'], ['season']);
entry('drones', ['无人机使用规定', 'Drone policy'],
  ['景区规定，未经允许不得在景区内使用无人机等飞行器。', 'The scenic area prohibits drones and other aircraft without authorization.'], ['season']);

const areaRules = [
  ['erlong', /二龙山|\berlong\s*shan\b|\bxiaowang\b|晓望/i],
  ['north', /九水|华楼|華樓|\b(?:bei\s*)?jiu\s*shui\b|\bhua\s*lou\b/i],
  ['east', /仰口|华严|華嚴|浦里|\byang\s*kou\b|\bhua\s*yan\b|\bpuli\b/i],
  ['south', /巨峰|太清|大河东|大河東|\bju\s*feng\b|\btai\s*qing\b|\bda\s*he\s*dong\b/i]
];

const specialRequest = /轮椅|輪椅|卫生间|洗手间|厕所|入园截止|停止入园|最晚入园|几点.*还能进|母婴|医务|寄存尺寸|储物柜尺寸|行李限重|寄存.*(?:几点|时间|多久)|存包.*(?:几点|时间|多久)|充电收费|導盲犬|导盲犬|服务犬|卫生室|语言服务|英文导游|停车收费|停车费多少|哪家|餐馆|餐厅|酒店|民宿|推荐.*路线|规划.*路线|导航到|多久.*游完|从.*(?:机场|火车站|青岛站|青岛北站|市区|酒店|民宿).*(?:怎么|到|出发)|\b(?:wheelchair|restroom|toilet|nursing room|first aid|service dog|guide dog|restaurant|hotel|itinerary|airport|locker size|storage size|luggage size|charging (?:cost|fee)|parking (?:cost|fee)s?|english.speaking guide|guided tour|last (?:bus|shuttle|train))\b/i;

function normalize(query) {
  return query.normalize('NFKC').toLowerCase().replace(/[’‘]/g, "'").trim();
}
function requiresLive(q) {
  const live = /临时|臨時|实时|實時|今天|今日|明天|明日|后天|现在|現在|此刻|目前|今晚|明早|本周|这周|周末|节假日|节期间|假期|国庆|中秋|春节|清明|元旦|五一|十一假|台风|颱風|下雨|暴雨|下雪|大雾|天气|天氣|余票|滿員|满员|限流|售罄|(?:有|剩)票(?:吗|嗎)|满了|预约满|封路|封闭|停运|暂停|关闭了|恢复了吗|开了吗|能进吗|还有.*(?:车位|票)|排队|人多|拥挤|\b(?:today|tomorrow|tonight|this (?:morning|afternoon|week)|next (?:week|year)|now|currently|current|live|latest|temporar\w*|reopen\w*|closed|closure\w*|running|operating today|availability|available|sold out|left for|rain(?:ing)?|snow(?:ing)?|storm\w*|typhoon|weather|holiday\w*|weekend\w*|crowd\w*|queue\w*|traffic control)\b/i.test(q);
  const genericNotice = /^(?:请问\s*)?(?:哪里|在哪|怎样|怎么|如何)?\s*(?:看|查|获取)?\s*(?:景区)?(?:官方)?(?:公告|通知|最新公告|实时公告)(?:在哪里|在哪看)?[？?。 ]*$|^\s*(?:official notices|where (?:can i|do i) find (?:the )?(?:latest |official )?(?:notices|announcements))\??$/i.test(q);
  const dated = /\b20\d{2}\b|\d{1,2}\s*月\s*\d{1,2}\s*[日号]|\b(?:jan\w*|feb\w*|mar\w*|apr\w*|may|jun\w*|jul\w*|aug\w*|sep\w*|oct\w*|nov\w*|dec\w*)\s+\d{1,2}\b/i.test(q);
  const refundPolicy = /(?:退票|退款|refund)/i.test(q) && !/今天|明天|现在|已购|订单|还能|\b(?:today|tomorrow|now|my booking|my order)\b/i.test(q);
  return !genericNotice && ((!refundPolicy && live) || dated);
}
function monthIntent(q) {
  const month = [
    ['spring', /(?:^|[^\d])(?:3|4|5|6)\s*月|三月|四月|五月|六月|\b(?:mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|spring)\b/i],
    ['summer', /(?:^|[^\d])(?:7|8)\s*月|七月|八月|\b(?:jul(?:y)?|aug(?:ust)?|summer)\b/i],
    ['autumn', /(?:^|[^\d])(?:9|10|11)\s*月|九月|十月|十一月|\b(?:sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|autumn|fall)\b/i],
    ['winter', /(?:^|[^\d])(?:12|1|2)\s*月|十二月|(?<!十)一月|二月|冬季|冬天|\b(?:dec(?:ember)?|jan(?:uary)?|feb(?:ruary)?|winter)\b/i]
  ].filter(([, rule]) => rule.test(q));
  return month.length === 1 ? month[0][0] : 'hours';
}
function match(q) {
  if (specialRequest.test(q)) return null;
  if (/热线|熱線|电话|電話|96616|\b(?:hotline|telephone|phone number|contact number)\b/i.test(q)) return 'hotline';
  if (/公告|官方微博|官方通知|\b(?:notices|announcements|official weibo)\b/i.test(q)) return 'notice';
  if (/寄存|行李存|存包|放行李|寄放|luggage (?:storage|deposit)|(?:store|leave|drop off|keep|check) (?:my |our |the )?(?:bags?|luggage|suitcases?)|\b(?:lockers?|baggage storage|left luggage)\b/i.test(q)) {
    return /巨峰|太清|华严|華嚴|华楼|华樓|華樓|二龙山|\b(?:jufeng|taiqing|hualou|huayan|erlongshan)\b/i.test(q) ? null : 'storage';
  }
  if (/无障碍车位|无障碍停车|無障礙車位|\b(?:accessible|disabled) parking\b/i.test(q)) return /华楼|華樓|\bhualou\b/i.test(q) ? 'accessible' : null;
  if (/充电桩|充電|充电车位|\b(?:ev charg\w*|charging (?:stations?|spaces?))\b/i.test(q)) return 'charging';
  if (/免费停车|停[车車].*(?:免费|免費)|\b(?:free parking|parking free)\b/i.test(q)) return /华楼|華樓|华严|華嚴|二龙山|\b(?:hualou|huayan|erlongshan)\b/i.test(q) ? null : 'freepark';
  if (/停车|停車|\b(?:parking|car parks?|park (?:at|near|my|our|a))\b/i.test(q)) return 'parking';
  if (/停售|停止售票|几点不卖票|\b(?:ticket (?:counter|office|sales) (?:clos\w*|cutoff)|stop selling tickets|last ticket sale)\b/i.test(q)) return 'cutoff';
  if (/退票|退款|\brefund\w*\b/i.test(q)) return 'refund';
  if (/宠物|寵物|带狗|带猫|\b(?:pets?|dogs?|cats?)\b/i.test(q)) return 'pets';
  if (/无人机|無人機|\bdrones?\b/i.test(q)) return 'drones';
  if (/宣传资料|宣传册|志愿者|遊客中心.*服务|游客中心.*服务|visitor cent\w+ services|\b(?:brochures?|volunteers?|visitor information)\b/i.test(q)) return 'services';
  if (/优惠|優惠|学生票|老人票|老人.*免|儿童票|\b(?:discount\w*|concession\w*|student tickets?|senior tickets?)\b/i.test(q)) return 'discount';
  if (/票价|票價|价格表|门票价格|索道价格|门票多少钱|票.*多少钱|票价多少|\b(?:ticket prices?|how much.*tickets?|price table|admission (?:fees?|prices?)|cable (?:car|way) fares?)\b/i.test(q)) return 'price';
  if (/预约|預約|购票|購票|买票|实名|\b(?:reserv(?:e|ation)\w*|book(?:ing)? tickets?|(?:buy|purchase) tickets?)\b/i.test(q)) return 'booking';

  const places = areaRules.filter(([, rule]) => rule.test(q)).map(([id]) => id);
  const asksWhen = /开放时间|開放時間|开园时间|開園時間|什么时候开[门园放]|何时开[门园放]|几点|幾點|营业时间|營業時間|作息|常规时段|\b(?:(?:opening|open|closing|entry|visiting) (?:hours|times?)|what time|when (?:does|do) .*\b(?:open|close)|hours)\b/i.test(q);
  const asksTransport = /怎么去|怎样去|如何去|去往|怎么到|怎麼去|如何到|怎样到|换乘|換乘|交通|地铁|地鐵|公交|哪个站|哪一站|几号口|哪个出口|哪[个個]口|哪路车|哪路公交|坐几路|接驳车|观光车|北线|南线|东线|\b(?:metro|transport|shuttle|bus|transfer|change for|exit|station|subway|how (?:do|can) (?:i|we) (?:get|go))\b/i.test(q);
  if (asksWhen) {
    if (/(?:索道|观光车|班车|地铁|公交|服务中心|售票处|寄存处|\b(?:cable\s*(?:car|way)|shuttle|bus|metro|station|visitor cent\w+|storage)\b)/i.test(q)) return null;
    if (/怎么去|怎么到|换乘|地铁|\b(?:get to|transfer|metro)\b/i.test(q)) return null;
    return monthIntent(q);
  }
  if (asksTransport) return places.length === 1 ? places[0] : places.length > 1 ? 'transport' : /^\s*(?:公共)?交通(?:换乘)?\s*$|崂山|嶗山|\blaoshan\b|\bpublic transport\b/i.test(q) ? 'transport' : null;
  return null;
}

const fallback = {
  title: ['请通过官方渠道确认', 'Please confirm with the scenic area'],
  live: ['临时开闭园、实时客流、余票和索道运行等情况会变化。出发前请查看景区官方公告或致电 0532-96616 确认。',
    'Closures, crowd levels, ticket availability and cableway operations can change. Check official notices or call 0532-96616 before you travel.'],
  unknown: ['现有官方资料不足以确认这个问题。请查看景区官方公告，或拨打 0532-96616 咨询工作人员。',
    'The available official material does not verify this answer. Please check official notices or call scenic area staff at 0532-96616.']
};

function answerQuestion(raw, interfaceLanguage = 'zh') {
  const q = normalize(raw);
  const han = /\p{Script=Han}/u.test(q);
  const latin = /[a-z]/i.test(q);
  const language = han && latin ? (/^[a-z]/i.test(q) ? 'en' : 'zh') : han ? 'zh' : latin ? 'en' : interfaceLanguage;
  const index = language === 'en' ? en : zh;
  const live = requiresLive(q);
  const parts = q.split(/[?？；;。]|\s+and\s+(?=(?:is|are|where|when|what|how|can|do|does)\b)|(?:另外|以及(?=怎么|哪里|几点|能否))/i).filter(part => part.trim());
  const ids = live ? [] : [...new Set(parts.map(match))];
  if (!ids.length || ids.includes(null)) {
    return { type: 'official', id: live ? 'live' : 'unknown', language, cards: [], title: fallback.title[index], text: fallback[live ? 'live' : 'unknown'][index] };
  }
  return {
    type: 'answer',
    id: ids.join('+'),
    language,
    cards: ids.map(id => {
      const data = entries[id];
      return {
        title: data.title[index], text: data.answer[index], note: data.note?.[index],
        rows: data.rows?.map(row => [row[index], row[2]]),
        channels: Boolean(data.channels),
        sources: data.evidence.map(key => {
          const source = sources[key];
          return { title: source[index], published: source[2], url: source[3] };
        })
      };
    })
  };
}

if (typeof module !== 'undefined') module.exports = { answerQuestion, REVIEWED, CHANNELS, sources };
