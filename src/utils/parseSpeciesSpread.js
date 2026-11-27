// src/utils/parseSpeciesSpread.js
import { AGS_DISTRICTS_GEOJSON } from "../components/data/agsGeoData.js";

const ALL_AGS_CODES = [
  "А1", "А2", "А3", "А4", "А5", "А6",
  "КАД1", "КАД2", "КАД3", "КАД4", "КАД5", "КАД6", "КАД7", "КАД8", "КАД9",
  "ЗМ1", "ЗМ2", "ЗМ3",
  "ЮМ",
];

// Уточнение районов для видов, у которых в spreadLocal нет буквенных индексов или есть особенности
const SPECIES_DISTRICT_OVERRIDES = {
  "species-coerulea": [], // Ошибочно приведён для АГС (переопределён как O. macrobotrys)
  "species-23": ["А1", "А2", "КАД1", "КАД2", "КАД5"], // O. campanulata — равнинные и предгорные районы АГС
  "species-41": ALL_AGS_CODES, // O. pilosa — практически все районы АГС
  "species-48": ["КАД3", "КАД8"], // O. pulvinoides — Дачен (Чугучак), Цинхэ (Чингиль)
  "species-49": ["КАД3"], // O. sarkandensis — Тарбагатай, Дачен (Чугучак)
  "species-53": ["А1", "А3", "А5", "А6", "КАД1", "КАД5", "КАД6"], // O. teres — Алт. кр., Респ. Алтай, Тыва, Вост. Каз.
  "species-66": ["КАД3", "КАД8"], // O. fetissovii — район Дачена (Чугучак), район Цинхе
  "species-71": ["ЗМ3", "ЮМ"], // O. pavlovii — Баян-Хонгорский аймак, вост. склон Монг. Алтая
};

// Детализированный справочник конкретных местонахождений из taxonomy.js (русские и латинские названия)
// ВАЖНО: более узкие и конкретные локации расположены ВЫШЕ широких бассейнов и хребтов
const GAZETTEER = [
  // Узкие локации и типовые пункты (приоритет при поиске)
  { pattern: /саралк|сорн|букон|курчим|тас-уй/i, name: "Нарымский хр., басс. Букони и Курчума, р. Саралка (Сорная)", coords: [49.02, 85.45] },
  { pattern: /чанглы-?булак|уч-терект|uch-terecty|tschangly-bulak|тас-кайнад|taskainat/i, name: "окр. оз. Маркаколь (рр. Чанглы-Булак, Уч-Теректы)", coords: [48.72, 85.72] },
  { pattern: /марка-?кул|маркаколь|кальджир|lacun\s+marka/i, name: "оз. Маркаколь / р. Кальджир", coords: [48.75, 85.75] },
  { pattern: /сарымсак|тау-?ты-?коль|taute-kol|катон-карагай|katon\s+karagai/i, name: "Нарымский хр., ущ. Сарымсак (Катон-Карагай)", coords: [49.12, 85.62] },
  { pattern: /нарымск|narymensis/i, name: "Нарымский хребет", coords: [49.05, 85.40] },
  { pattern: /улутау|ulutau/i, name: "горы Улутау (Вост. Казахстан)", coords: [49.35, 84.85] },

  { pattern: /улькун-уласт|ulkun-ulasty|ак-кемир|алаба[йем]/i, name: "хр. Саур (Мустау), верховья р. Улькун-Уласты", coords: [47.02, 85.48] },
  { pattern: /б\.\s*оба/i, name: "хр. Саур, верховья р. Большая Оба", coords: [47.12, 85.30] },
  { pattern: /карагайту/i, name: "хр. Саур, дол. р. Карагайту", coords: [47.08, 85.65] },
  { pattern: /саур|мустау|saur|mustau/i, name: "хр. Саур (Мустау)", coords: [47.05, 85.55] },
  { pattern: /манрак|кенгай|мичуринское/i, name: "хр. Манрак (пос. Кенгай)", coords: [47.43, 84.70] },
  { pattern: /сартау|sartau/i, name: "г. Сартау (Тарбагатай)", coords: [47.15, 83.60] },
  { pattern: /tscheсharak-assu|чехарак-ассу/i, name: "хр. Тарбагатай, р. Чекарак-Ассу", coords: [47.18, 82.95] },
  { pattern: /sai-assu|сай-ассу/i, name: "хр. Тарбагатай, ущ. Сай-Ассу", coords: [47.22, 83.15] },
  { pattern: /тарбагата|tarbagatai|аягуз|тасбеит/i, name: "хр. Тарбагатай", coords: [47.20, 82.80] },
  { pattern: /дачен|чугучак/i, name: "окр. г. Чугучак (Тачэн)", coords: [46.75, 82.98] },
  { pattern: /(?:^|[^а-яё])(?:нор-)?зайсан|saissan(?![а-яё])/i, name: "окр. оз. Зайсан", coords: [48.00, 84.00] },

  { pattern: /буготор/i, name: "Южн. склон Китайского Алтая, р. Буготор", coords: [48.12, 87.55] },
  { pattern: /бурчум|кран|bourtchoum|kran/i, name: "Китайский Алтай (между рр. Бурчум и Кран)", coords: [48.15, 87.60] },
  { pattern: /б\.\s*канас/i, name: "верховья р. Большой Канас", coords: [48.75, 87.05] },
  { pattern: /костук|kostuk/i, name: "Южн. склон Китайского Алтая, р. Костук", coords: [47.25, 89.60] },
  { pattern: /цинхэ|чингиль|цинхе/i, name: "р-н Чингиль (Цинхэ)", coords: [46.67, 90.38] },
  { pattern: /булган|булугун|улиаста|кейцу/i, name: "басс. р. Булган (Южн. Монгольский Алтай)", coords: [46.45, 91.25] },
  { pattern: /байтаг-богдо|будун-харкайтын/i, name: "хр. Байтаг-Богдо", coords: [45.25, 90.95] },

  // А1, А3, А4, А5 (Русский Алтай и Западный Саян)
  { pattern: /белух|belucha/i, name: "г. Белуха, истоки р. Катуни", coords: [49.81, 86.59] },
  { pattern: /чаганд/i, name: "верховья р. Бухтарма (выше устья р. Чаганды)", coords: [49.22, 86.75] },
  { pattern: /бухтарм/i, name: "верховья р. Бухтарма", coords: [49.25, 86.80] },
  { pattern: /буртюк|алах[оа]|alacha/i, name: "плато Укок, равнина Буртюк (между рр. Алаха и Калгуты)", coords: [49.28, 87.55] },
  { pattern: /укок|бертек|аргамж|калгут|ukok/i, name: "плато Укок", coords: [49.30, 87.60] },
  { pattern: /курата/i, name: "Семинский хр., дол. с. Курата", coords: [50.80, 86.20] },
  { pattern: /эдичак/i, name: "прав. бер. р. Эдичак (близ долины Катуни)", coords: [51.12, 86.25] },
  { pattern: /семинск|каспа|kaspa/i, name: "Семинский хр. (окр. с. Каспа)", coords: [51.17, 86.43] },
  { pattern: /инская|иня|inja|inam/i, name: "басс. р. Иня (окр. Тигирека)", coords: [51.15, 83.05] },
  { pattern: /тигирек|tigerek|tigeraek/i, name: "Тигирекский хр.", coords: [51.05, 83.00] },
  { pattern: /чарыш|усть-кан|мендурсаккон|tscharysch/i, name: "верх. р. Чарыш (Усть-Кан)", coords: [50.93, 84.76] },
  { pattern: /коргонск|королевский белок/i, name: "Коргонский хр. (Королевский белок)", coords: [50.95, 84.35] },
  { pattern: /терект|terekta/i, name: "Теректинский хр. (р. Теректа)", coords: [50.35, 85.90] },
  { pattern: /урсул|urssul/i, name: "басс. р. Урсул", coords: [50.75, 86.15] },
  { pattern: /тобожок/i, name: "Курайский хр., дол. р. Тобожок", coords: [50.35, 87.85] },
  { pattern: /курайск/i, name: "Курайский хр.", coords: [50.32, 87.95] },
  { pattern: /айгулак/i, name: "Айгулакский хр.", coords: [50.42, 87.45] },
  { pattern: /джумал|жумал/i, name: "верх. р. Жумалы (окр. рудника Нов. Калгуты)", coords: [49.45, 88.05] },
  { pattern: /дж[её]ло|dsholo/i, name: "дол. р. Чеган-Узун близ устья р. Джёло", coords: [50.08, 88.35] },
  { pattern: /чеган-узун|tschegan-usun|chegan/i, name: "долина р. Чеган-Узун", coords: [50.15, 88.40] },
  { pattern: /актур/i, name: "верховья р. Актур (Северо-Чуйский хр.)", coords: [50.08, 87.75] },
  { pattern: /кокорю|kokoro/i, name: "верховья р. Кокорю", coords: [50.15, 89.05] },
  { pattern: /аксай|боро-бургаз/i, name: "долины рр. Аксай и Боро-Бургазы", coords: [49.90, 88.95] },
  { pattern: /чуя|чуйск|tschuja/i, name: "басс. р. Чуя / Чуйская степь", coords: [50.05, 88.45] },
  { pattern: /башкаус|baschkaus|bschkaus/i, name: "долина р. Башкаус", coords: [50.65, 87.65] },
  { pattern: /хемчикск|саяно-шушенск|chemczikskij/i, name: "Хемчикский хр. (Зап. Саян)", coords: [51.65, 91.15] },

  // ЗМ1, ЗМ2, ЗМ3, ЮМ (Сайлюгем, Чихачёва, Монгун-Тайга, Монгольский и Гобийский Алтай)
  { pattern: /чеган-бургаз/i, name: "хр. Сайлюгем (дол. р. Чеган-Бургазы)", coords: [49.70, 88.66] },
  { pattern: /сайлюгем|sailugem/i, name: "хр. Сайлюгем", coords: [49.65, 88.80] },
  { pattern: /киндиктыкуль|нарын-гол/i, name: "хр. Чихачёва (оз. Киндиктыкуль / р. Нарын-Гол)", coords: [49.82, 89.52] },
  { pattern: /талдуаир|чихачев/i, name: "хр. Чихачёва (г. Талдуаир)", coords: [49.78, 89.45] },
  { pattern: /кара-бельдир|kara-beldir/i, name: "хр. Монгун-Тайга, верх. р. Кара-Бельдир", coords: [50.25, 90.15] },
  { pattern: /узун-хем|каргы/i, name: "верх. р. Узун-Хем (прит. р. Каргы)", coords: [50.35, 90.25] },
  { pattern: /арзайты/i, name: "верховья и пер. Арзайты (хр. Монгун-Тайга)", coords: [50.20, 90.05] },
  { pattern: /монгун-тайг|mongun-taiga/i, name: "хр. Монгун-Тайга", coords: [50.28, 90.12] },
  { pattern: /барлык|коге-дава/i, name: "хр. Цаган-Шибэту, перевал Барлык (Коге-Дава)", coords: [50.32, 90.68] },
  { pattern: /цаган-шиб[еэ]т|szagan-schibetu/i, name: "хр. Цаган-Шибэту", coords: [50.32, 90.68] },
  { pattern: /утуг-хая/i, name: "хр. Утуг-Хая (Тува)", coords: [50.45, 90.55] },
  { pattern: /улан-даб|ойгур|ulan-daban|oigur/i, name: "пер. Улан-Даба / р. Ойгур", coords: [49.15, 89.25] },
  { pattern: /хотон-гол|даян-нур/i, name: "оз. Даян-Нур / р. Хотон-Гол", coords: [48.35, 88.90] },
  { pattern: /цаст-ула/i, name: "г. Цаст-Ула (Монг. Алтай)", coords: [48.68, 90.95] },
  { pattern: /даин-гол|ак-корум|dain-gol|ak-koroum/i, name: "оз. Даин-Гол / Ак-Корум", coords: [48.25, 88.85] },
  { pattern: /тиекты|теректы|tiekty/i, name: "р. Тиекты (Теректы, Монг. Алтай)", coords: [47.85, 91.10] },
  { pattern: /цахар-халганы|цогт\s+сомон/i, name: "Монг. Алтай, сомон Цогт, горы Цахар-Халганы-Нуру", coords: [46.35, 94.15] },
  { pattern: /хойт-хэцу|хобдо\s+сомон/i, name: "Монг. Алтай, сомон Ховд, хр. Хойт-Хэцу-Улан-Ула", coords: [47.15, 92.40] },
  { pattern: /сутай|цасту-богдо|дзуйлин-гол|sutaica/i, name: "г. Сутай-Ула (Цасту-Богдо-Ула)", coords: [46.62, 93.60] },
  { pattern: /монхан|манхан|жаргалант|гурван-улясугол/i, name: "хр. Жаргалант-Хайрхан (сомон Манхан)", coords: [47.45, 92.55] },
  { pattern: /хасагту-хайрхан|цаган-ирмег|chassagtu-chairchan|tsagan-irmeg/i, name: "хр. Хасагту-Хайрхан (Цаган-Ирмег)", coords: [46.78, 95.85] },
  { pattern: /аджи-богдо/i, name: "хр. Аджи-Богдо", coords: [44.85, 95.25] },
  { pattern: /цаган-хутэл/i, name: "пер. Цаган-Хутэл (Монг. Алтай)", coords: [46.20, 94.50] },
  { pattern: /хацабгиин|баян-хонгор|баин-ундур/i, name: "вост. отроги Монг. Алтая (Баин-Ундур, Хацабгиин-Хара-Ула)", coords: [45.35, 98.20] },
  { pattern: /богден-гол|гуджиртэй|bogden-gol/i, name: "долина р. Богден-Гол", coords: [47.75, 96.35] },
  { pattern: /узун-дзюр|да-гуна|uzundsjur/i, name: "р. Узун-Дзюр (Сев.-Зап. Монголия)", coords: [48.10, 91.80] },
  { pattern: /аргалы|заингиави/i, name: "уроч. Аргалы по пути на Заингиави (Сев.-Зап. Монголия)", coords: [46.80, 93.20] },
  { pattern: /богдо-ола/i, name: "вост. отроги хр. Богдо-ола", coords: [46.50, 95.50] },
];

const DISTRICT_CENTERS = {
  "А1": [51.65, 86.10],
  "А2": [52.95, 88.20],
  "А3": [50.25, 86.15],
  "А4": [50.85, 88.65],
  "А5": [52.45, 90.45],
  "А6": [51.20, 90.35],
  "КАД1": [50.85, 82.85],
  "КАД2": [49.45, 82.65],
  "КАД3": [47.15, 82.85],
  "КАД4": [46.95, 85.75],
  "КАД5": [48.25, 83.25],
  "КАД6": [49.35, 84.95],
  "КАД7": [48.45, 87.45],
  "КАД8": [47.55, 89.45],
  "КАД9": [45.85, 92.15],
  "ЗМ1": [49.65, 90.25],
  "ЗМ2": [48.15, 90.35],
  "ЗМ3": [46.85, 92.85],
  "ЮМ": [45.65, 96.85],
};

// Проверка попадания точки [lat, lng] в полигон GeoJSON (ray-casting)
function isPointInRing(lat, lng, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const xi = ring[i][0]; // lng
    const yi = ring[i][1]; // lat
    const xj = ring[j][0];
    const yj = ring[j][1];

    const intersect =
      yi > lat !== yj > lat &&
      lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function isPointInGeometry(lat, lng, geometry) {
  if (!geometry) return false;
  if (geometry.type === "Polygon") {
    const [outer, ...holes] = geometry.coordinates;
    if (!isPointInRing(lat, lng, outer)) return false;
    return !holes.some((hole) => isPointInRing(lat, lng, hole));
  }
  if (geometry.type === "MultiPolygon") {
    return geometry.coordinates.some((poly) => {
      const [outer, ...holes] = poly;
      if (!isPointInRing(lat, lng, outer)) return false;
      return !holes.some((hole) => isPointInRing(lat, lng, hole));
    });
  }
  return false;
}

export function findDistrictCodeByCoords(coords) {
  if (!Array.isArray(coords) || coords.length < 2) return null;
  const [lat, lng] = coords;
  for (const feature of AGS_DISTRICTS_GEOJSON.features) {
    if (isPointInGeometry(lat, lng, feature.geometry)) {
      return feature.properties.code;
    }
  }
  return null;
}

function normalizeTextForCodes(text) {
  if (!text) return "";
  return String(text)
    .toUpperCase()
    .replace(/(?<![А-ЯЁA-Z0-9])[KК][AА][DД]\s*([1-9З])(?![А-ЯЁA-Z0-9])/g, (_, num) =>
      `КАД${num === "З" ? "3" : num}`
    )
    .replace(/(?<![А-ЯЁA-Z0-9])[З3][MМ]([1-3])(?![А-ЯЁA-Z0-9])/g, "ЗМ$1")
    .replace(/(?<![А-ЯЁA-Z0-9])[AА]([1-6Зl])(?![А-ЯЁA-Z0-9])/g, (_, num) => {
      if (num === "З") return "А3";
      if (num === "l" || num === "L") return "А1";
      return `А${num}`;
    })
    .replace(/(?<![А-ЯЁA-Z0-9])Ю[MМ](?![А-ЯЁA-Z0-9])/g, "ЮМ");
}

export function extractAgsDistricts(speciesOrText) {
  const isObj = speciesOrText && typeof speciesOrText === "object";
  if (
    isObj &&
    speciesOrText.id &&
    Object.prototype.hasOwnProperty.call(SPECIES_DISTRICT_OVERRIDES, speciesOrText.id)
  ) {
    return SPECIES_DISTRICT_OVERRIDES[speciesOrText.id];
  }

  const spreadLocal = isObj ? speciesOrText.spreadLocal : speciesOrText;
  if (!spreadLocal) return [];

  const norm = normalizeTextForCodes(spreadLocal);

  if (norm.includes("ВСЕ РАЙОНЫ АГС") || norm.includes("ВСЕХ РАЙОНАХ АГС")) {
    return [...ALL_AGS_CODES];
  }

  const found = new Set();
  const regex = /(?<![А-ЯЁA-Z0-9])(?:КАД[1-9]|ЗМ[1-3]|А[1-6]|ЮМ)(?![А-ЯЁA-Z0-9])/g;
  let match;
  while ((match = regex.exec(norm)) !== null) {
    found.add(match[0]);
  }
  return Array.from(found);
}

// Извлечение явных координат из произвольного текста (с исправлением опечаток 8б -> 86)
function parseExplicitCoords(rawText) {
  if (!rawText) return [];
  const fixedText = String(rawText)
    .replace(/(\d)б(?=\s|[°′ʹ'".,;]|$)/g, "$16")
    .replace(/б(\d)/g, "6$1");

  const coordRegex =
    /(\d{2})[°\s]+(\d{1,2})?(?:[′ʹ'\s]+(\d{1,2}))?[″"ʹ']?\s*с\.?\s*ш\.?[,\s]+(\d{2,3})[°\s]+(\d{1,2})?(?:[′ʹ'\s]+(\d{1,2}))?[″"ʹ']?\s*в\.?\s*д\.?/gi;

  const results = [];
  let match;
  while ((match = coordRegex.exec(fixedText)) !== null) {
    const latDeg = parseInt(match[1], 10);
    let latMin = match[2] ? parseInt(match[2], 10) : 0;
    const latSec = match[3] ? parseInt(match[3], 10) : 0;

    const lngDeg = parseInt(match[4], 10);
    let lngMin = match[5] ? parseInt(match[5], 10) : 0;
    const lngSec = match[6] ? parseInt(match[6], 10) : 0;

    if (latMin > 59 && latMin < 100 && latSec === 0) {
      latMin = Math.round((latMin / 100) * 60);
    }
    if (lngMin > 59 && lngMin < 100 && lngSec === 0) {
      lngMin = Math.round((lngMin / 100) * 60);
    }

    const lat = +(latDeg + latMin / 60 + latSec / 3600).toFixed(4);
    const lng = +(lngDeg + lngMin / 60 + lngSec / 3600).toFixed(4);

    if (lat >= 40 && lat <= 60 && lng >= 75 && lng <= 105) {
      const contextStart = Math.max(0, match.index - 150);
      const snippet = fixedText
        .slice(contextStart, match.index)
        .replace(/^[^:;–—(]*[:;–—(]/, "")
        .replace(/^\S*\s+/, "")
        .replace(/^[\s.,;:-]+/, "")
        .trim();

      results.push({
        coords: [lat, lng],
        snippet,
        approx: latMin === 0 && lngMin === 0,
      });
    }
  }
  return results;
}

// Очистка текста этикетки/протолога от служебных префиксов
function cleanTypeLabelText(raw) {
  return String(raw || "")
    .replace(/^(?:Тип|Лектотип|Изотип|Изолектотип|Синтип)(?:\s+и\s+(?:изотип|изолектотип))?(?:\s*\([^)]*\))?\s*:\s*/i, "")
    .replace(/^По\s+протологу\s*:\s*/i, "")
    .replace(/^["«“]+|["»”]+$/g, "")
    .trim();
}

// Извлечение ЕДИНСТВЕННОЙ точной точки сбора типового материала в пределах АГС
function extractSingleTypeLocation(speciesItem) {
  const candidates = [];

  // 1. Приоритет — гербарная этикетка типа (speciesType), затем протолог (protolog)
  if (speciesItem.speciesType) {
    // Защита от ошибочно вклеенной этикетки O. biloba в карточке O. dichroantha
    if (!(speciesItem.id === "species-43" && /biloba/i.test(speciesItem.speciesType))) {
      candidates.push({
        sourceLabel: "Тип (гербарная этикетка)",
        rawText: speciesItem.speciesType,
      });
    }
  }
  if (speciesItem.protolog) {
    candidates.push({
      sourceLabel: "По протологу",
      rawText: speciesItem.protolog,
    });
  }

  for (const cand of candidates) {
    const cleanedFullText = cleanTypeLabelText(cand.rawText);

    // 1а. Если в тексте типа есть точные координаты и они попадают в АГС
    const explicit = parseExplicitCoords(cleanedFullText);
    for (const item of explicit) {
      if (findDistrictCodeByCoords(item.coords)) {
        const label = item.snippet || cleanedFullText;
        return {
          title: `${speciesItem.nameLat} — типовой материал`,
          shortLabel: `Тип: ${label.slice(0, 52)}${label.length > 52 ? "…" : ""}`,
          desc:
            `<strong>Точка сбора типового материала (${cand.sourceLabel}):</strong><br/>` +
            `${cleanedFullText}<br/>` +
            `<em>Координаты: ${item.coords[0]}° с.ш., ${item.coords[1]}° в.д.</em>`,
          region: "Точка сбора типового материала (протолог)",
          coords: item.coords,
          approx: item.approx,
          isType: true,
        };
      }
    }

    // 1б. Поиск наиболее точного топонима в GAZETTEER (первое совпадение в пределах АГС)
    for (const entry of GAZETTEER) {
      if (entry.pattern.test(cleanedFullText) && findDistrictCodeByCoords(entry.coords)) {
        return {
          title: `${speciesItem.nameLat} — типовой материал`,
          shortLabel: `Тип: ${entry.name}`,
          desc:
            `<strong>Точка сбора типового материала (${cand.sourceLabel}):</strong><br/>` +
            `${cleanedFullText}<br/>` +
            `<em>Локализация: ${entry.name}</em>`,
          region: "Точка сбора типового материала (протолог)",
          coords: entry.coords,
          approx: true,
          isType: true,
        };
      }
    }
  }

  return null;
}

export function extractSpeciesLocations(speciesItem) {
  if (!speciesItem || speciesItem.mistake) return [];

  const text = speciesItem.spreadLocal || "";
  const locations = [];

  // 1. Точные координаты из гербарных цитат в spreadLocal
  const explicitCoords = parseExplicitCoords(text);
  explicitCoords.forEach((item, index) => {
    const idx = index + 1;
    locations.push({
      title: `${speciesItem.nameLat} — точка №${idx}`,
      shortLabel: item.snippet
        ? item.snippet.slice(0, 48) + (item.snippet.length > 48 ? "…" : "")
        : `Точка №${idx}`,
      desc: item.snippet
        ? `<strong>Местонахождение:</strong> ${item.snippet}<br/>Координаты: ${item.coords[0]}° с.ш., ${item.coords[1]}° в.д.`
        : `Координаты по гербарной этикетке: ${item.coords[0]}° с.ш., ${item.coords[1]}° в.д.`,
      region: "Точное местонахождение",
      coords: item.coords,
      approx: item.approx,
    });
  });

  // 2. Поиск конкретных географических названий из spreadLocal
  const usedNames = new Set();
  for (const entry of GAZETTEER) {
    if (entry.pattern.test(text) && !usedNames.has(entry.name)) {
      const hasCloseExact = locations.some(
        (loc) =>
          Math.abs(loc.coords[0] - entry.coords[0]) < 0.25 &&
          Math.abs(loc.coords[1] - entry.coords[1]) < 0.25
      );
      if (!hasCloseExact) {
        usedNames.add(entry.name);
        locations.push({
          title: `${speciesItem.nameLat} — ${entry.name}`,
          shortLabel: entry.name,
          desc: `<strong>Конкретное местонахождение:</strong> ${entry.name}<br/><em>По тексту конспекта:</em> ${text}`,
          region: "Местонахождение по конспекту",
          coords: entry.coords,
          approx: true,
        });
      }
    }
  }

  // 3. Добавляем ровно ОДНУ точку сбора типового материала (если она внутри АГС)
  const typeLocation = extractSingleTypeLocation(speciesItem);
  if (typeLocation) {
    // Если в той же точке уже стоит обычный маркер из GAZETTEER — слегка смещаем типовой маркер (на ~0.04°),
    // чтобы оба маркера были видны и не перекрывали друг друга
    const overlapsExisting = locations.some(
      (loc) =>
        Math.abs(loc.coords[0] - typeLocation.coords[0]) < 0.03 &&
        Math.abs(loc.coords[1] - typeLocation.coords[1]) < 0.03
    );
    if (overlapsExisting) {
      typeLocation.coords = [
        +(typeLocation.coords[0] + 0.04).toFixed(4),
        +(typeLocation.coords[1] + 0.04).toFixed(4),
      ];
    }
    locations.push(typeLocation);
  }

  // 4. Отсекаем любые точки, находящиеся за пределами Алтайской горной страны (АГС)
  const agsLocations = locations.filter(
    (loc) => findDistrictCodeByCoords(loc.coords) !== null
  );

  // 5. Если конкретных точек в АГС не найдено, но вид отмечен в < 5 районах — ставим маркеры в центры районов
  if (agsLocations.length === 0) {
    const districts = extractAgsDistricts(speciesItem);
    if (districts.length > 0 && districts.length < 5) {
      districts.forEach((code) => {
        if (DISTRICT_CENTERS[code]) {
          agsLocations.push({
            title: `${speciesItem.nameLat} — район ${code}`,
            shortLabel: `Район ${code}`,
            desc: `<strong>Флористический район ${code}</strong><br/>${text}`,
            region: "Местонахождение по конспекту",
            coords: DISTRICT_CENTERS[code],
            approx: true,
          });
        }
      });
    }
  }

  return agsLocations;
}
