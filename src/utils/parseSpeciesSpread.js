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
  "species-66": ["КАД3", "КАД8"], // O. fetissovii — район Дачена (Чугучак); район Цинхэ
  "species-71": ["ЗМ3", "ЮМ"], // O. pavlovii — Баян-Хонгорский аймак, вост. склон Монг. Алтая
};

// Детализированный справочник конкретных местонахождений из taxonomy.js
const GAZETTEER = [
  // ЗМ3 и ЮМ (включая точные пункты O. ulzijchutagii, O. sutaica, O. fragilifolia, O. pavlovii, O. filiformis)
  { pattern: /цахар-халганы|цогт\s+сомон/i, name: "Монг. Алтай, сомон Цогт, горы Цахар-Халганы-Нуру", coords: [46.35, 94.15] },
  { pattern: /хойт-хэцу|хобдо\s+сомон/i, name: "Монг. Алтай, сомон Ховд, хр. Хойт-Хэцу-Улан-Ула", coords: [47.15, 92.40] },
  { pattern: /сутай|цасту-богдо|дзуйлин-гол/i, name: "г. Сутай-Ула (Цасту-Богдо-Ула)", coords: [46.62, 93.60] },
  { pattern: /монхан|манхан|жаргалант|гурван-улясугол/i, name: "хр. Жаргалант-Хайрхан (сомон Манхан)", coords: [47.45, 92.55] },
  { pattern: /хасагту-хайрхан|цаган-ирмег/i, name: "хр. Хасагту-Хайрхан", coords: [46.78, 95.85] },
  { pattern: /аджи-богдо/i, name: "хр. Аджи-Богдо", coords: [44.85, 95.25] },
  { pattern: /цаган-хутэл/i, name: "пер. Цаган-Хутэл (Монг. Алтай)", coords: [46.20, 94.50] },
  { pattern: /хацабгиин|баян-хонгор|баин-ундур/i, name: "вост. отроги Монг. Алтая (Баян-Хонгор)", coords: [45.35, 98.20] },
  { pattern: /богден-гол|гуджиртэй/i, name: "долина р. Богден-Гол", coords: [47.75, 96.35] },
  { pattern: /узун-дзюр|да-гуна/i, name: "р. Узун-Дзюр (Сев.-Зап. Монголия)", coords: [48.10, 91.80] },
  { pattern: /угей|угийн|угий-?нур/i, name: "оз. Угий-Нур (Угей-нор)", coords: [47.76, 102.74] },
  { pattern: /аргалы|заингиави/i, name: "Сев.-Зап. Монголия, уроч. Аргалы (путь на Заингиави)", coords: [46.40, 96.20] },
  { pattern: /богдо-ола/i, name: "вост. отроги хр. Богдо-Ола", coords: [45.80, 97.50] },

  // КАД3, КАД4, КАД5 (Тарбагатай, Саур, Манрак, Зайсан)
  { pattern: /саур|мустау|карагайту|улькун-уласт/i, name: "хр. Саур (Мустау)", coords: [47.05, 85.55] },
  { pattern: /б\.\s*оба/i, name: "хр. Саур, верховья р. Большая Оба", coords: [47.12, 85.30] },
  { pattern: /манрак|кенгай|мичуринское/i, name: "хр. Манрак (пос. Кенгай)", coords: [47.43, 84.70] },
  { pattern: /тарбагат|аягуз|тасбеит/i, name: "хр. Тарбагатай", coords: [47.20, 82.80] },
  { pattern: /сартау/i, name: "г. Сартау (Тарбагатай)", coords: [47.15, 83.60] },
  { pattern: /дачен|чугучак/i, name: "окр. г. Чугучак (Тачэн)", coords: [46.75, 82.98] },
  { pattern: /(?:^|[^а-яё])(?:нор-)?зайсан(?![а-яё])/i, name: "окр. оз. Зайсан", coords: [48.00, 84.00] },

  // КАД6, КАД7, КАД8, КАД9 (Южный и Китайский Алтай, Булган, Байтаг-Богдо)
  { pattern: /марка-?кул|маркаколь|кальджир|чанглы-?булак|тас-кайнад|уч-терект/i, name: "оз. Маркаколь / р. Кальджир", coords: [48.75, 85.75] },
  { pattern: /нарымск|сарымсак|тау-?ты-?коль|катон-карагай/i, name: "Нарымский хр. (Катон-Карагай)", coords: [49.12, 85.62] },
  { pattern: /улутау/i, name: "горы Улутау (Вост. Казахстан)", coords: [49.35, 84.85] },
  { pattern: /бурчум|кран|буготор/i, name: "Китайский Алтай (между рр. Бурчум и Кран)", coords: [48.15, 87.60] },
  { pattern: /б\.\s*канас/i, name: "верховья р. Большой Канас", coords: [48.75, 87.05] },
  { pattern: /костук/i, name: "Южн. склон Китайского Алтая, р. Костук", coords: [47.25, 89.60] },
  { pattern: /цинх[эе]|чингиль/i, name: "р-н Чингиль (Цинхэ)", coords: [46.67, 90.38] },
  { pattern: /булган|булугун|улиаст|кейцу/i, name: "басс. р. Булган (Южн. Монгольский Алтай)", coords: [46.45, 91.25] },
  { pattern: /байтаг-богдо|будун-харкайтын/i, name: "хр. Байтаг-Богдо", coords: [45.25, 90.95] },

  // А1, А3, А4, А5 (Русский Алтай и Западный Саян)
  { pattern: /бухтарм|чаганд|саралка/i, name: "верховья р. Бухтарма", coords: [49.25, 86.80] },
  { pattern: /укок|бертек|аргамж|калгут/i, name: "плато Укок", coords: [49.30, 87.60] },
  { pattern: /жумалы|нов\.\s*калгут/i, name: "хр. Сайлюгем, верх. р. Жумалы (рудн. Нов. Калгуты)", coords: [49.55, 88.15] },
  { pattern: /семинск|каспа|курата|эдичак/i, name: "Семинский хр. (окр. с. Каспа)", coords: [51.17, 86.43] },
  { pattern: /чарыш|усть-кан|мендурсаккон|тигирек/i, name: "верх. р. Чарыш (Усть-Кан)", coords: [50.93, 84.76] },
  { pattern: /коргонск|королевский белок/i, name: "Коргонский хр. (Королевский белок)", coords: [50.95, 84.35] },
  { pattern: /курайск|тобожок/i, name: "Курайский хр.", coords: [50.32, 87.95] },
  { pattern: /айгулак/i, name: "Айгулакский хр.", coords: [50.42, 87.45] },
  { pattern: /чуя|чуйск|чеган-узун|дж[её]ло|актур|кокорю|аксай|боро-бургаз/i, name: "басс. р. Чуя / Чуйская степь", coords: [50.05, 88.45] },
  { pattern: /башкаус/i, name: "долина р. Башкаус", coords: [50.65, 87.65] },
  { pattern: /хемчикск|саяно-шушенск/i, name: "Хемчикский хр. (Зап. Саян)", coords: [51.65, 91.15] },

  // ЗМ1, ЗМ2 (Сайлюгем, Чихачёва, Монгун-Тайга, Кобдо, Даян-Нур)
  { pattern: /сайлюгем|чеган-бургаз/i, name: "хр. Сайлюгем (дол. р. Чеган-Бургазы)", coords: [49.70, 88.66] },
  { pattern: /чихачев|киндиктыкуль|нарын-гол|талдуаир/i, name: "хр. Чихачёва (оз. Киндиктыкуль)", coords: [49.82, 89.52] },
  { pattern: /монгун-тайг|кара-бельдир|узун-хем|каргы|арзайты/i, name: "хр. Монгун-Тайга", coords: [50.28, 90.12] },
  { pattern: /цаган-шиб[еэ]т|барлык|коге-дава|утуг-хая/i, name: "хр. Цаган-Шибэту", coords: [50.32, 90.68] },
  { pattern: /улан-даб|ойгур/i, name: "пер. Улан-Даба / р. Ойгур", coords: [49.15, 89.25] },
  { pattern: /хотон-гол|даян-нур|цаст-ула/i, name: "оз. Даян-Нур / р. Хотон-Гол", coords: [48.35, 88.90] },
  { pattern: /даин-гол|ак-корум/i, name: "оз. Даин-Гол", coords: [48.25, 88.85] },
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

function isPointInRing(lng, lat, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const xi = ring[i][0];
    const yi = ring[i][1];
    const xj = ring[j][0];
    const yj = ring[j][1];

    const intersect =
      yi > lat !== yj > lat &&
      lng < ((xj - xi) * (lat - yi)) / (yj - yi + 1e-12) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function isPointInGeometry(lng, lat, geometry) {
  if (!geometry || !geometry.coordinates) return false;
  if (geometry.type === "Polygon") {
    const [outer, ...holes] = geometry.coordinates;
    if (!outer || !isPointInRing(lng, lat, outer)) return false;
    return !holes.some((hole) => isPointInRing(lng, lat, hole));
  }
  if (geometry.type === "MultiPolygon") {
    return geometry.coordinates.some((poly) => {
      const [outer, ...holes] = poly;
      if (!outer || !isPointInRing(lng, lat, outer)) return false;
      return !holes.some((hole) => isPointInRing(lng, lat, hole));
    });
  }
  return false;
}

export function findDistrictCodeByCoords(coords) {
  if (!Array.isArray(coords) || coords.length < 2) return null;
  const [lat, lng] = coords;
  const features = AGS_DISTRICTS_GEOJSON?.features || [];
  for (const feature of features) {
    if (isPointInGeometry(lng, lat, feature.geometry)) {
      return feature.properties?.code || null;
    }
  }
  return null;
}

function normalizeTextForCodes(text) {
  if (!text) return "";
  return String(text)
    .toUpperCase()
    .replace(/A/g, "А")
    .replace(/K/g, "К")
    .replace(/D/g, "Д")
    .replace(/M/g, "М")
    .replace(/(?<![А-ЯЁ])([АДМ])З(?![А-ЯЁ])/g, "$13") // заменяет кириллическую З на 3 в индексах (КАДЗ -> КАД3, АЗ -> А3)
    .replace(/(?<![А-ЯЁ])3М(?![А-ЯЁ])/g, "ЗМ")
    .replace(/(?<![А-ЯЁ])A[L1](?![А-ЯЁ])/g, "А1")
    .replace(/(?<![А-ЯЁ])АL(?![А-ЯЁ])/g, "А1")
    .replace(/КАД\s+([1-9])/g, "КАД$1");
}

function normalizeCoordsText(text) {
  if (!text) return "";
  // Исправляем частую OCR-опечатку в taxonomy.js: кириллическая "б" вместо цифры "6" рядом с цифрами (например, 8б -> 86)
  return String(text)
    .replace(/(\d)б/gi, "$16")
    .replace(/б(\d)/gi, "6$1");
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
  const regex = /(?:КАД[1-9]|ЗМ[1-3]|А[1-6]|ЮМ)/g;
  let match;
  while ((match = regex.exec(norm)) !== null) {
    found.add(match[0]);
  }
  return Array.from(found);
}

export function extractSpeciesLocations(speciesItem) {
  if (!speciesItem || speciesItem.mistake) return [];

  const rawText = speciesItem.spreadLocal || "";
  if (!rawText) return [];

  const text = normalizeCoordsText(rawText);
  const locations = [];

  // 1. Точные координаты из гербарных цитат
  const coordRegex =
    /(\d{2})[°\s]+(\d{1,2})?(?:[′ʹ'\s]+(\d{1,2}))?[″"ʹ']?\s*с\.?\s*ш\.?[,\s]+(\d{2,3})[°\s]+(\d{1,2})?(?:[′ʹ'\s]+(\d{1,2}))?[″"ʹ']?\s*в\.?\s*д\.?/gi;

  let match;
  let idx = 1;
  while ((match = coordRegex.exec(text)) !== null) {
    const latDeg = parseInt(match[1], 10);
    let latMin = match[2] ? parseInt(match[2], 10) : 0;
    const latSec = match[3] ? parseInt(match[3], 10) : 0;

    const lngDeg = parseInt(match[4], 10);
    let lngMin = match[5] ? parseInt(match[5], 10) : 0;
    const lngSec = match[6] ? parseInt(match[6], 10) : 0;

    // Коррекция опечаток вроде 50°80' (десятичные доли градуса вместо минут, как для с. Курата: 50.80° с.ш.)
    const lat =
      latMin >= 60
        ? +(latDeg + latMin / 100).toFixed(4)
        : +(latDeg + latMin / 60 + latSec / 3600).toFixed(4);
    const lng =
      lngMin >= 60
        ? +(lngDeg + lngMin / 100).toFixed(4)
        : +(lngDeg + lngMin / 60 + lngSec / 3600).toFixed(4);

    if (lat >= 40 && lat <= 60 && lng >= 75 && lng <= 105) {
      const contextStart = Math.max(0, match.index - 150);
      const snippet = text
        .slice(contextStart, match.index)
        .replace(/^[^:;–—(]*[:;–—(]/, "")
        .replace(/^\S*\s+/, "")
        .replace(/^[\s.,;:-]+/, "")
        .trim();

      locations.push({
        title: `${speciesItem.nameLat} — точка №${idx}`,
        shortLabel: snippet
          ? snippet.slice(0, 48) + (snippet.length > 48 ? "…" : "")
          : `Точка №${idx}`,
        desc: snippet
          ? `<strong>Местонахождение:</strong> ${snippet}<br/>Координаты: ${lat}° с.ш., ${lng}° в.д.`
          : `Координаты по гербарной этикетке: ${lat}° с.ш., ${lng}° в.д.`,
        region: "Точное местонахождение",
        coords: [lat, lng],
        approx: latMin === 0 && lngMin === 0,
      });
      idx += 1;
    }
  }

  // 2. Поиск конкретных географических названий
  const usedNames = new Set();
  for (const entry of GAZETTEER) {
    if (entry.pattern.test(text) && !usedNames.has(entry.name)) {
      const hasCloseExact = locations.some(
        (loc) =>
          Math.abs(loc.coords[0] - entry.coords[0]) < 0.35 &&
          Math.abs(loc.coords[1] - entry.coords[1]) < 0.35
      );
      if (!hasCloseExact) {
        usedNames.add(entry.name);
        locations.push({
          title: `${speciesItem.nameLat} — ${entry.name}`,
          shortLabel: entry.name,
          desc: `<strong>Конкретное местонахождение:</strong> ${entry.name}<br/><em>По тексту конспекта:</em> ${rawText}`,
          region: "Местонахождение по конспекту",
          coords: entry.coords,
          approx: true,
        });
      }
    }
  }

  // 3. Если конкретных точек не найдено, но вид отмечен в < 5 районах — ставим маркеры в центры этих районов
  if (locations.length === 0) {
    const districts = extractAgsDistricts(speciesItem);
    if (districts.length > 0 && districts.length < 5) {
      districts.forEach((code) => {
        if (DISTRICT_CENTERS[code]) {
          locations.push({
            title: `${speciesItem.nameLat} — район ${code}`,
            shortLabel: `Район ${code}`,
            desc: `<strong>Флористический район ${code}</strong><br/>${rawText}`,
            region: "Местонахождение по конспекту",
            coords: DISTRICT_CENTERS[code],
            approx: true,
          });
        }
      });
    }
  }

  return locations;
}
