import React from "react";

const Header = () => {
    return(
        <header className="Header">
            <h1><i className="ri-graduation-cap-line"></i> 학점 관리 시스템</h1>
            <p>
                TODAY : {new Date().toLocaleDateString()}
            </p>
        </header>
    );
}

export default React.memo(Header);