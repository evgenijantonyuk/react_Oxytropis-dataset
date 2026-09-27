export default function Subgenus({ subgenus }) {
    return (
        <div className="subgenus search">
            <h3 className="subgenus__title">
                {subgenus.title}&nbsp;
                {subgenus.author && <span className="species__author">{subgenus.author}</span>}
            </h3>
            {subgenus.history && <p className="section-history">{subgenus.history}</p>}
            {subgenus.type && (
                <p className="section__type">
                    {subgenus.type.label}&nbsp;
                    <span className="section__type-name">{subgenus.type.name}</span>&nbsp;
                    {subgenus.type.author && <span className="species__author">{subgenus.type.author}</span>}
                </p>
            )}
            {subgenus.description && <p className="subgenus__description">{subgenus.description}</p>}
        </div>
    );
}