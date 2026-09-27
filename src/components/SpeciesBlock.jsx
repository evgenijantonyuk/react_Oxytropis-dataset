export default function SpeciesBlock({ species }) {
    const {
        number, nameLat, nameLatLink, author, literature, synonyms = [],
        nameRu, place, type, protolog, eco, spreadLocal, spreadGeneral,
        note, mistake, extra,
    } = species;

    return (
        <div className={`species__block search ${mistake ? 'species__block_mistake' : ''}`}>
            {number && <span className="species__number">{number}.</span>}

            <span className="species__name-lat">
        {nameLatLink ? (
            <a href={nameLatLink} target="_blank" rel="noreferrer">{nameLat}</a>
        ) : nameLat}
      </span>
            {author && <span className="species__author">{author}</span>}

            {literature && <span className="species-literature">{literature}</span>}

            {synonyms.map((syn, i) => (
                <span key={i}>
          {syn.lat && <span className="species__synonym">{syn.lat}</span>}
                    {syn.author && <span className="species__synonym-author">{syn.author}</span>}
                    {syn.lit && <span className="species-literature">{syn.lit}</span>}
        </span>
            ))}

            {nameRu && <span className="species__name-ru">{nameRu}</span>}

            {place && <p className="species__place">{place}</p>}
            {type && <p className="species__type">{type}</p>}
            {protolog && <p className="species__protolog">{protolog}</p>}
            {eco && <p className="species__eco">{eco}</p>}

            {spreadLocal && (
                <p className="specie__spread">
                    Распр.: <span className="species__spread-local">{spreadLocal}</span>
                </p>
            )}
            {spreadGeneral && (
                <p className="specie__spread">
                    Общ. распр.: <span className="species__spread-general">{spreadGeneral}</span>
                </p>
            )}

            {note && <p className="species__note">{note}</p>}
            {extra}
        </div>
    );
}