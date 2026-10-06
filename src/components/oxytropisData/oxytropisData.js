// oxytropisData.js

export const table1Data = [
    { group: 'Oxytropis (Клада линии O. campestris)', bunge: 69, kholina: 11, change: 'Критическое сужение. Статус истинного подрода подтвержден только для монофилетического ядра секции Janthina.' },
    { group: 'Phacoxytropis (Клада линии O. deflexa)', bunge: 19, kholina: 78, change: 'Колоссальная радиация. Укрупнен за счет массового переноса бывших «окситрописовых» секций с конвергентными перегородками.' },
    { group: 'Tragacanthoxytropis', bunge: 3, kholina: 0, change: 'Полностью расформирован. Подушковидные колючие жизненные формы филогенетически растворены внутри phacoid-линий.' },
    { group: 'Eumorpha', bunge: 1, kholina: 0, change: 'Упразднен; типовой вид O. macrocarpa переведен в ранг обособленной филолинии.' }
];

export const table2Data = [
    { subgenus: 'Phacoxytropis', section: 'Mesogaea', count: 6, species: 'O. cana, O. deflexa, O. glabra, O. lapponica, O. ochroleuca, O. ulzijchutagii' },
    { subgenus: 'Phacoxytropis', section: 'Chrysantha', count: 1, species: 'O. pilosa' },
    { subgenus: 'Phacoxytropis', section: 'Ortholoma', count: 12, species: 'O. biloba, O. dichroantha, O. floribunda, O. grum-grshimailoi, O. hirsuta, O. macrobotrys, O. pulvinoides, O. sarkandensis, O. podoloba, O. schrenkii, O. tenuis, O. teres' },
    { subgenus: 'Oxytropis', section: 'Janthina', count: 11, species: 'O. globiflora, O. pauciflora, O. platysema, O. coerulea, O. filiformis, O. humifusa, O. kaspensis, O. krylovii, O. ladyginii, O. merkensis, O. saposhnikovii' },
    { subgenus: 'Oxytropis', section: 'Orobia', count: 22, species: 'O. cuspidata, O. alpestris, O. alpina, O. altaica, O. ambigua, O. argentata, O. campanulata, O. chionophylla, O. confusa, O. frigida, O. gebleri, O. kusnetzovii, O. longibracteata, O. longirostra, O. macrosema, O. martjanovii, O. melaleuca, O. nivea, O. recognita, O. soongorica, O. strobilacea, O. sulphurea, O. suprajenissejensis' },
    { subgenus: 'Oxytropis', section: 'Xerobia', count: 12, species: 'O. ampullata, O. malacophylla, O. setifera, O. eriocarpa, O. intermedia, O. micrantha, O. rhizantha, O. setosa, O. stenophylla, O. potaninii, O. rhynchophysa, O. sutaica' },
    { subgenus: 'Oxytropis', section: 'Baicalia', count: 9, species: 'O. chionobia, O. fetissovii, O. heterophylla, O. inaria, O. mongolica, O. oligantha, O. pavlovii, O. pellita, O. pumila' },
    { subgenus: 'Oxytropis', section: 'Polyadena', count: 7, species: 'O. physocarpa, O. trichophysa, O. muricata, O. falcata, O. microphylla, O. fragilifolia, O. bungei' },
    { subgenus: 'Oxytropis', section: 'Остальные секции', count: 9, species: 'O. racemosa (Gobicola), O. acanthacea (Acanthos), O. squamulosa (Leucopodia), O. tschujae (Brachytropis) и др.' },
    { subgenus: 'Tragacanthoxytropis', section: 'Hystrix / Leucotriche', count: 3, species: 'O. polyphylla, O. tragacanthoides, O. hystrix, O. kossinskyi, O. aciphylla' },
    { subgenus: 'Eumorpha', section: '—', count: 1, species: 'O. macrocarpa' }
];

export const table3Data = [
    { clade: 'Подрод Oxytropis', line: 'Sect. Janthina Bunge', count: 11, status: 'Истинное монофилетическое ядро подрода.', species: 'O. globiflora, O. pauciflora, O. platysema, O. coerulea, O. filiformis, O. humifusa, O. kaspensis, O. krylovii, O. ladyginii, O. merkensis, O. saposhnikovii' },
    { clade: 'Подрод Phacoxytropis', line: 'Sect. Ortholoma', count: 19, status: 'Радиация линии O. deflexa', species: 'O. cana, O. deflexa, O. glabra, O. lapponica, O. ochroleuca, O. ulzijchutagii, O. pilosa, O. biloba, O. dichroantha, O. floribunda, O. grum-grshimailoi, O. hirsuta, O. macrobotrys, O. pulvinoides, O. sarkandensis, O. podoloba, O. schrenkii, O. tenuis, O. teres.' },
    { clade: 'Подрод Phacoxytropis', line: 'Sect. Xerobia', count: 12, status: 'Перенос из subg. Oxytropis', species: 'O. ampullata, O. malacophylla, O. setifera, O. eriocarpa, O. intermedia, O. micrantha, O. rhizantha, O. setosa, O. stenophylla, O. potaninii, O. rhynchophysa, O. sutaica.' },
    { clade: 'Подрод Phacoxytropis', line: 'Sect. Baicalia', count: 11, status: 'Перенос из subg. Oxytropis', species: 'O. chionobia, O. fetissovii, O. heterophylla, O. inaria, O. mongolica, O. oligantha, O. oligantha var. glabra, O. pavlovii, O. pellita, O. pumila, O. viridiflava.' },
    { clade: 'Подрод Phacoxytropis', line: 'Sect. Polyadena', count: 7, status: 'Перенос из subg. Oxytropis', species: 'O. physocarpa, O. trichophysa, O. muricata, O. falcata, O. microphylla, O. fragilifolia, O. bungei.' },
    { clade: 'Подрод Phacoxytropis', line: 'Sects. Hystrix / Leucotriche', count: 5, status: 'Доказана вторичность колючей морфологии.', species: 'O. polyphylla, O. tragacanthoides, O. hystrix, O. kossinskyi, O. aciphylla.' },
    { clade: 'Подрод Phacoxytropis', line: 'Остальные филолинии', count: 27, status: 'Включая большую часть бывшей секции Orobia', species: 'O. racemosa, O. acanthacea, O. squamulosa, O. macrocarpa, O. tschujae, O. cuspidata, O. alpestris, O. alpina, O. altaica, O. ambigua, O. argentata, O. campanulata, O. chionophylla, O. confusa, O. frigida, O. gebleri, O. kusnetzovii, O. longibracteata, O. longirostra, O. macrosema, O. martjanovii, O. melaleuca, O. nivea, O. recognita, O. soongorica, O. strobilacea, O. sulphurea, O. suprajenissejensis.' }
];
