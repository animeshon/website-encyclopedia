const EntityTitle = ({ breadcrumb = [], title }) => {
    return (
        <div className="entity-title-bar internal-grid">
            <div className="product__breadcrumb">
                {breadcrumb.map(b => {return(<span key={b}>{b}</span>)} )}
                    
            </div>
            <h1>{title}</h1>
        </div>
    );
};

export default EntityTitle;
