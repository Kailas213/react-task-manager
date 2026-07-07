import {useTaskContext} from "../context/TaskContext";

function FilterControl(){
    const {filter, searchTerms, setFilter, setSearch, undoAction, canUndo}=useTaskContext();
    return(
        <div className="filter-controls">
            <div className="search-sections">
                <input type="text" placeholder="Search task..."
                value={searchTerms}
                onChange={(e)=>setSearch(e.target.value)}
                className="search-input" />

            </div>

            <div className="filter-section">
                <label>Filter:</label>
                <div className="filter-buttons">
                    {['all','pending','completed'].map(filterOption=>(
                        <button key={filterOption} onClick={()=> setFilter(filterOption)} className={filter=== filterOption? 'active':''}>
                            {filterOption.charAt(0).toUpperCase()+ filterOption.slice(1)}

                        </button>
                    ))}
                </div>
            </div>

            <div className="action-section">
                <button onClick={undoAction}
                disabled={!canUndo} className="undo-btn">Undo</button>
            </div>



        </div>
    )


}

export default FilterControl;