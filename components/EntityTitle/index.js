const EntityTitle = ({ breadcrumb = [], title }) => {
    return (
        <div className="entity-title-bar internal-grid">
            <div className="search-result__breadcrumb white-text">
                {breadcrumb.map(b => {return(<span>{b}</span>)} )}
                    
            </div>
            <h1>{title}</h1>
        </div>
    );
};

export default EntityTitle;
