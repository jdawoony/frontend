import GradeItem from "../component/GradeItem"
import GradeItemNoData from "../component/GradeItemNoData"
import GradeTotal from "../component/GradeTotal"
import GradeEditor from "../component/GradeEditor"
import {useState} from "react";
import React from "react";

const GradeList = ({selectedClasstype, totalList, searchList, resultCount, onDelete, onUpdate, onCreateGrade, onCancleGreate, hide, onCreate, checkedAll, refIdx}) => {
    const addedItem = {
        // 객체 초기화
        no: refIdx.current,
        classtype: "",
        subject: "",
        type: "",
        require: "", 
        grades: null,
        attendance: 0,
        assignment: 0,
        mid: 0,
        final: 0,
        isChecked: false,
    }
    const [newItem, setNewItem] = useState(addedItem); // 생성 객체

    // 객체 추가
    const onCreateItem = () => {
        if(newItem.subject === "" || newItem.type === ""  || newItem.require === "" || newItem.grades <= 0){
            alert("모든 항목이 입력되어야 합니다.");
            return false;
        }
        
        // 동일 과목명 존재여부 검사
        let count = 0; 
        let existInfo = 0; 
        totalList.filter( (item)=>item.subject.trim() === newItem.subject.trim() ? 
        count++: count );
        totalList.filter( (item)=>item.subject.trim() === newItem.subject.trim() ? 
        existInfo=item.classtype : "" );

        if(count > 0){ 
            alert('이미 수강한 과목은 추가할 수 없습니다.\n과목명을 확인해주세요. ('+existInfo + '학년 수강 과목 중복)');
        }else{
            // 추가 완료
            checkedAll(searchList); // 체크박스 토글 동작
            onCreate(newItem);
            resetFrom();
        }
    }
    const resetFrom = () => {
        // 초기화
        setNewItem(addedItem);
        onCreateGrade();
        onCancleGreate();
    }
    const setNewItemValue = () =>{ setNewItem(newItem); } // 객체 업데이트
    const onDeleteItem = () =>{ 
        let count = searchList.filter((item)=>(item.isChecked == true)).length;
        if(count <= 0 ){
            alert("삭제할 데이터를 선택해주세요");
        }else{
            if(window.confirm("정말 삭제하시겠습니까?")){
            // 삭제
                onDelete();
            }
        }
     } 

    // 학점 표기(A+ ~ F)
    const getResult = (value) => {
        if (value >= 95) {
            return "A+";
        } else if (value >= 90) {
            return "A0";
        } else if (value >= 85) {
            return "B+";
        } else if (value >= 80) {
            return "B0";
        } else if (value >= 75) {
            return "C+";
        } else if (value >= 70) {
            return "C0";
        } else if (value >= 65) {
            return "D+";
        } else if (value >= 60) {
            return "D0";
        } else {
            return "F";
        }
    }
    return(
        <div className="GradeList">
            <div className={selectedClasstype === ""?"hide":"show"}>
                <div className="topSection">
                    <h2>{selectedClasstype + "학년"}</h2>
                    <div className="btnWrp">
                        {hide ? "" : <input className="btn" type="button" value="추가" onClick={onCreateGrade} />}

                        {hide ? "" : <input className="btn" type="button" value="삭제" onClick={onDeleteItem} />}

                        {!hide ? "" : <input className="btn" type="button" value="취소" onClick={resetFrom} />}

                        {!hide ? "" : <input className="btn" type="button" value="저장" onClick={onCreateItem} />}
                    </div>
                </div>
            </div>
            <div className="gradeTableWrp">
                <table className="gradeTable">
                    <colgroup>
                        <col style={{ width: '4%' }} />
                        <col style={{ width: '7.5%' }} />
                        <col style={{ width: '7.5%' }} />
                        <col style={{ width: '20%' }} />
                        <col style={{ width: '8%' }} />
                        <col style={{ width: '8%' }} />
                        <col style={{ width: '8%' }} />
                        <col style={{ width: '8%' }} />
                        <col style={{ width: '8%' }} />
                        <col style={{ width: '7%' }} />
                        <col style={{ width: '7%' }} />
                        <col style={{ width: '7%' }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>
                                {/* <input type="checkbox" onClick={onChageCheckboxAll} /> */}
                            </th>
                            <th>이수</th>
                            <th>필수</th>
                            <th>과목명</th>
                            <th>학점</th>
                            <th>출석점수</th>
                            <th>과제점수</th>
                            <th>중간고사</th>
                            <th>기말고사</th>
                            <th>총점</th>
                            <th>평균</th>
                            <th>성적</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resultCount===0 ? <GradeItemNoData /> : searchList.map((item)=>(
                            <GradeItem key={item.no} {...item} onUpdate={onUpdate} getResult={getResult} />
                        ))}
                        {!hide ? "" :
                            <GradeEditor selectedClasstype={selectedClasstype} addedItem={addedItem} newItem={newItem} setNewItemValue={setNewItemValue} refIdx={refIdx} />
                        }
                    </tbody>
                    {resultCount===0 ? "":<tfoot><GradeTotal searchList={searchList} getResult={getResult}/></tfoot>}
                </table>
                
                {resultCount===0 ? "":<p className="info"><i className="ri-information-line"></i> P/NP 과목은 합계에서 제외하여 계산됩니다.</p>}
            </div>
        </div>
    );
}

export default React.memo(GradeList);