
import {useState} from "react";

const GradeEditor = ({selectedClasstype, newItem, setNewItemValue, refIdx}) => {    
    const [, setType] = useState("");
    const [, setRequire] = useState("");
    const [, setSubject] = useState("");
    const [, setGrades] = useState(0);
    const [attendanceVal, setAttendance] = useState(0);
    const [assignmentVal, setAssignment] = useState(0);
    const [midVal, setMid] = useState(0);
    const [finalVal, setFinal] = useState(0);
    const pattern = /^[0-9]+$/; // 숫자만 입력(정규화)

    const onChageType = (e) => {
        setType(e.target.value); 
        newItem.type=e.target.value; 
        updateNewItem();
    }
    const onChageRequire = (e) => {
        setRequire(e.target.value); 
        newItem.require=e.target.value; 
        updateNewItem();}

    const onChangeGrades = (e) => {
        let value = e.target.value;
        if(!pattern.test(e.target.value) && e.keyCode !== 8 && value !== ""){
            alert("숫자만 입력 가능합니다.");
            e.target.value = "";
            setGrades(null);
        }else if(value <= 0 && value !== ""){
            alert("잘못된 값을 입력하셨습니다.(1학점부터 최대 3학점까지 입력 가능");
            e.target.value = "";
            setGrades(null);
        }else if(value > 3){
            alert("학점은 최대 3학점까지 입력 가능합니다.");
            e.target.value = "";
            setGrades(null);
        }else{
            setGrades(value);
        }
    }
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

    const updateNewItem = () => {
        setNewItemValue();
    }
    return(
        <>
            <td>
                <span className="hide">
                    {newItem.no=refIdx.current}
                    {newItem.classtype=selectedClasstype}
                </span>
            </td>
            <td>
                <select className="form-control2" onChange={onChageType}>
                    <option value={""}>-</option>
                    <option value={"교양"}>교양</option>
                    <option value={"전공"}>전공</option>
                </select>
            </td>
            <td>
                <select className="form-control2" onChange={onChageRequire}>
                    <option value={""}>-</option>
                    <option value={"선택"}>선택</option>
                    <option value={"필수"}>필수</option>
                </select>
            </td>
            <td>
                <input type="text" className="form-control2 text-left" onChange={(e) => {setSubject(e.target.value.trim().toLocaleUpperCase()); newItem.subject=e.target.value.trim().toLocaleUpperCase(); updateNewItem();}} placeholder="과목명 입력"/>
            </td>
            <td>
                <input type="text" className="form-control2 text-left score" onChange={(e) => {onChangeGrades(e); newItem.grades=Number(e.target.value); updateNewItem();}}/>
            </td>
            <td>
                <input type="text" className="form-control2 text-left score" onChange={(e) => {checkValue(e, 20, setAttendance); newItem.attendance=Number(e.target.value); updateNewItem();}} placeholder="0"/>
            </td>
            <td>
                <input type="text" className="form-control2 text-left score" onChange={(e) => {checkValue(e, 20, setAssignment); newItem.assignment=Number(e.target.value); updateNewItem();}} placeholder="0"/>
            </td>
            <td>
                <input type="text" className="form-control2 text-left score" onChange={(e) => {checkValue(e, 30, setMid); newItem.mid=Number(e.target.value); updateNewItem();}} placeholder="0"/>
            </td>
            <td>
                <input type="text" className="form-control2 text-left score" onChange={(e) => {checkValue(e, 30,setFinal); newItem.final=Number(e.target.value); updateNewItem();}} placeholder="0"/>
            </td>
            <td>
                {Number(attendanceVal) + Number(assignmentVal) + Number(midVal) + Number(finalVal)}
            </td>
            <td></td>
            <td></td>
        </>
    );
}

export default GradeEditor;