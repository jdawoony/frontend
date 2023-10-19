import {useState} from "react";
import React from "react";

const GradeEditorForm1 = ({newItem, updateNewItem, pattern}) => {
    const [attendanceVal, setAttendance] = useState(0);
    const [assignmentVal, setAssignment] = useState(0);
    const [midVal, setMid] = useState(0);
    const [finalVal, setFinal] = useState(0);

    const checkValue = (e, max, changeVal) => {
        let maxValue = max;
        let value = e.target.value;
        let changeFunc = changeVal;
        if(!pattern.test(e.target.value) && e.keyCode !== 8 && value !== ""){
            alert("숫자만 입력 가능합니다.");
            e.target.value = "";
            changeFunc(null);
        }else if(value < 0 && value !== ""){
            alert("잘못된 값을 입력하셨습니다. (1~20점까지 입력 가능");
            e.target.value = "";
            changeFunc(null);
        }else if(value > maxValue){
            alert("최대 "+max+"점까지 입력 가능합니다.");
            e.target.value = "";
            changeFunc(null);
        }else if(value === ""){
            changeFunc(null);
        }else{
            changeFunc(value);
        }
    }

    return(
        <>
        {newItem.isPassType=false}
        {newItem.pass=""}
        <td>
            <input type="text" className="form-control2 score" onChange={(e) => {checkValue(e, 20, setAttendance); newItem.attendance=Number(e.target.value); updateNewItem();}} placeholder="0"/>
        </td>
        <td>
            <input type="text" className="form-control2 score" onChange={(e) => {checkValue(e, 20, setAssignment); newItem.assignment=Number(e.target.value); updateNewItem();}} placeholder="0"/>
        </td>
        <td>
            <input type="text" className="form-control2 score" onChange={(e) => {checkValue(e, 30, setMid); newItem.mid=Number(e.target.value); updateNewItem();}} placeholder="0"/>
        </td>
        <td>
            <input type="text" className="form-control2 score" onChange={(e) => {checkValue(e, 30,setFinal); newItem.final=Number(e.target.value); updateNewItem();}} placeholder="0"/>
        </td>
        <td>
            {Number(attendanceVal) + Number(assignmentVal) + Number(midVal) + Number(finalVal)}
        </td>
        <td></td>
        <td></td>
        </>
    );
}

export default React.memo(GradeEditorForm1);