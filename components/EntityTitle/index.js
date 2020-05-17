const EntityTitle = ({ breadcrumb = [], title }) => {
    return (
        <div className="entity-title-bar internal-grid">
            <h1>{title}</h1>
        </div>
    );
};

export default EntityTitle;
