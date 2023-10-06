import React from "react";

const GradeItemNoData = () => {
    return(
        <tr className="GradeItemNoData">
            <td colSpan={12}>
                조회된 데이터가 없습니다.
            </td>
        </tr>
    );
}

export default React.memo(GradeItemNoData);