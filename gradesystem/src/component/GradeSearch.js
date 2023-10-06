const GradeSearch = () => {
    return(
        <div className="GradeSearch">
            <div>
                <label htmlFor="search_grede">학년</label>
                <select className="form-control" id="search_grede">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </select>
                <label htmlFor="search_id">학번</label>
                <input className="form-control" type="text" id="search_id" placeholder="학번 입력"/>
                <button className="btn dft" type="button">조회</button>
            </div>
        </div>
    );
}

export default GradeSearch;