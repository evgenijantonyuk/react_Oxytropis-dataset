export default function Section({ section }) {
    return (
        <div className="section search">
            <p className="species__section">
                Секция&nbsp;
                <span className="species__section-name">{section.name}</span>&nbsp;
                {section.author && <span className="species__section-author">{section.author}</span>}
            </p>
            {section.history && <p className="section-history">{section.history}</p>}
            {section.type && (
                <p className="section__type">
                    {section.type.label}
                    {section.type.name && (
                        <>
                            &nbsp;<span className="section__type-name">{section.type.name}</span>&nbsp;
                            {section.type.author && <span className="species__author">{section.type.author}</span>}
                        </>
                    )}
                </p>
            )}
            {section.description && <p className="section__description">{section.description}</p>}
        </div>
    );
}