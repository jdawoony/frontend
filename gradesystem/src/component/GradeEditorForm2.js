import {useState} from "react";
import React from "react";

const GradeEditorForm2 = ({newItem}) => {
    const [passVal, setPass] = useState();
    const getPass = (e) => {
        setPass(e.target.value);
        if(e.target.value === ""){
            newItem.pass="";
            return false;
        }else{
            newItem.pass=e.target.value;
        }
    }
    return(
        <>
        {newItem.isPassType=true}
        {newItem.attendance=""}
        {newItem.assignment=""}
        {newItem.mid=""}
        {newItem.final=""}
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>
            <select className="form-control2" id="select_pass" onChange={getPass}>
                <option value="">-</option>
                <option value="P">P</option>
                <option value="NP">NP</option>
            </select>
        </td>
        </>
    );
}

export default React.memo(GradeEditorForm2);