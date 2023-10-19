import React from "react";

const GradeItem = ({no, id, classtype, subject, type, require, grades, attendance, assignment, mid, final, pass, isChecked, onUpdate, getResult}) => {
    const total =  attendance + assignment + mid + final;
    const result = (total, pass, grades) => {
        if(grades === 1){
            // 1학점 일때 : P/NP
            if(pass === "P"){ return "P"; }
            else{             return "NP"; }
        }else{
            return getResult(total);
        }
    };
    const onChageCheckbox = () =>{
        // 체크박스 토글 동작
        onUpdate(no);
    }
    return(
        <tr className="GradeItem">
            <td>
                {isChecked ? 
                <input onChange={onChageCheckbox} type="checkbox" checked />
                : <input onChange={onChageCheckbox} type="checkbox" />}
            </td>
            <td>{type}</td>
            <td>{require}</td>
            <td>{subject}</td>
            <td>{grades}</td>
            <td>{attendance}</td>
            <td>{assignment}</td>
            <td>{mid}</td>
            <td>{final}</td>
            <td>{total}</td>
            <td></td>
            <td className="gradeCell">
                <span className={result(total, pass, grades) === "F" ? "c_rd" : ""}>
                    {result(total, pass, grades)}
                </span>
            </td>
        </tr>
    );
}

export default React.memo(GradeItem);