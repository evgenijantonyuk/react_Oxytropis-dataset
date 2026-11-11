import oChionophylla from '../../assets/oxytropisLiveForm/oChionophylla.png'
import oAcanthacea from '../../assets/oxytropisLiveForm/oAcanthacea.jpg'
import oAlpina from '../../assets/oxytropisLiveForm/oAlpina.jpg'
import oPilosa from '../../assets/oxytropisLiveForm/oPilosa.jpg'
export const LIFE_FORMS_DATA = [
    {
        id: 'cushion',
        title: 'Подушковидные (Куртины)',
        scientificName: 'Форма: Подушковидные растения',
        exampleSpecies: 'Oxytropis chionophylla',
        description: 'Формируют ультраплотные полушаровидные «подушки» или прижатые к земле коврики из множества укороченных побегов. Оптимальная адаптация к экстремальным ветрам высокогорий Алтая, удерживающая тепло и влагу внутри структуры.',
        imageUrl:  oChionophylla,
        adaptations: ['Защита от сильных ветров', 'Терморегуляция куртины', 'Снижение испарения'],
        resource: `Фото из виртуального гербария Kew.`
    },
    {
        id: 'prickly',
        title: 'Иглистые / Колючие формы',
        scientificName: 'Форма: Иглистые растения',
        exampleSpecies: 'Oxytropis acanthacea (Остролодочник колючий)',
        description: 'Уникальная защитная форма каменистых экосистем Алтая. Черешки листьев после отмирания листовых пластинок твердеют и превращаются в прочные, острые иглы. Создают непреодолимый барьер для травоядных животных.',
        imageUrl: oAcanthacea,
        adaptations: ['Жесткие колючие остатки черешков', 'Защита от поедания скотом', 'Удержание редкой влаги'],
        resource: 'Фото из виртуального гербария ЦСБС СО РАН.'
    },
    {
        id: 'rosette',
        title: 'Бесстебельные розеточные',
        scientificName: 'Форма: Бесстебельные розеточные',
        exampleSpecies: 'Oxytropis alpina (Остролодочник альпийский)',
        description: 'Надземный стебель практически отсутствует или скрыт в почве. Развитые прикорневые листья собраны в густую розетку, прижатую к каменистому субстрату высокогорий. Опираются на мощный стержневой корень.',
        imageUrl: oAlpina ,
        adaptations: ['Максимальный контакт с почвой', 'Глубокая стержнекорневая система', 'Стойкость к ветровому иссушению'],
        resource: 'Фото с сайта iNaturalist.'
    },
    {
        id: 'caulescent',
        title: 'Стебельные, кустистые',
        scientificName: 'Форма: Стебельныеб кустистые',
        exampleSpecies: 'Oxytropis pilosa (Остролодочник волосистый)',
        description: 'Классическая травянистая форма для видов из более мягких климатических условий (степи, луга, опушки). Имеют хорошо выраженные ветвистые, восходящие или прямостоячие стебли с интенсивным опушением для защиты от перегрева.',
        imageUrl: oPilosa,
        adaptations: ['Интенсивное опушение побегов', 'Конкуренция за свет в травостое', 'Обильное ветвление'],
        resource: 'Фото с сайта iNaturalist.'
    }
];
