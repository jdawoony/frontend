import './App.css';
import Header from "./component/Header";
import GradeList from "./component/GradeList";
import {useState, useRef} from "react";

const mockData = [
   // 식별번호(no), 학번(id), 학년(class), 과목명(subject), 이수(type), 필수(require), 학점(grades), 출석점수(attendance), 과제점수(assignment), 중간고사(mid), 기말고사(final), 체크박스 선택여부(isChecked)
  {
    no: 0,
    classtype: "1",
    subject: "자기소개서 작성",
    type: "교양",
    require: "선택",
    grades: 1,
    attendance: 10,
    assignment: 20,
    mid: 18,
    final: 20,
    isChecked: false,
  },
  {
    no: 1,
    classtype: "1",
    subject: "서버프로그래밍1",
    type: "전공",
    require: "필수",
    grades: 3,
    attendance: 0,
    assignment: 0,
    mid: 0,
    final: 0,
    isChecked: false,
  },
  {
    no: 2,
    classtype: "1",
    subject: "소프트웨어공학1",
    type: "전공",
    require: "선택",
    grades: 3,
    attendance: 20,
    assignment: 20,
    mid: 30,
    final: 30,
    isChecked: false,
  },
  {
    no: 3,
    classtype: "2",
    subject: "영어",
    type: "교양",
    require: "선택",
    grades: 2,
    attendance: 20,
    assignment: 20,
    mid: 28,
    final: 28,
    isChecked: false,
  },
  {
    no: 4,
    classtype: "2",
    subject: "서버프로그래밍2",
    type: "전공",
    require: "필수",
    grades: 3,
    attendance: 15,
    assignment: 18,
    mid: 25,
    final: 26,
    isChecked: false,
  },
  {
    no: 5,
    classtype: "2",
    subject: "소프트웨어공학2",
    type: "전공",
    require: "선택",
    grades: 3,
    attendance: 20,
    assignment: 20,
    mid: 30,
    final: 30,
    isChecked: false,
  },
]

function App() {
  const [totalList, setTotalList] = useState(mockData); // 객체 토탈 리스트
  const [selectedClasstype, setClasstype] = useState(""); // 선택된 학년
  const [hide, setHide] = useState(false);
  const refGrade = useRef(); // 학년 참조

   // 리스트 Sorting
  const sortList = (list) => {    
    // 과목명
    setTotalList(list.sort((a, b)=>{ return a.require.toLowerCase() < b.subject.toLowerCase() ? -1 : 1; }))
    
    // 필수
    setTotalList(list.sort((a, b)=>{ return a.require.toLowerCase() < b.require.toLowerCase() ? -1 : 1; }))

    // 이수
    setTotalList(list.sort((a, b)=>{ return a.type.toLowerCase() < b.type.toLowerCase() ? -1 : 1; }))

    return list;
  };

  // 학년 선택시 리스트 Read
  const searchGreadeChage = (e) =>{
    setTotalList(sortList(totalList.filter((item)=>!item.isChecked)))
    setClasstype(e.target.value);
    setHide(false);
  }

  // 검색된 리스트 Return
  const getSearchResult = () =>{
    return totalList.filter((item)=>item.classtype === selectedClasstype);
  }
  
  const refIdx = useRef(6); // no. 식별번호 값
  const onCreate = (gradeInfo) => {
    setTotalList(sortList([gradeInfo, ...totalList]));
    refIdx.current++; 
  }

  // 추가/삭제/저장/취소 버튼에 따른 show/hide 동작
  const onCreateGrade = () =>{ setHide(true); }
  const onCancleGreate = () =>{ setHide(false); }

  // 체크박스 토글
  const onUpdate = (targetNo) => {
    setTotalList(totalList.map((item)=>item.no === targetNo ? {...item, isChecked: !item.isChecked} : item));
  }

  // 삭제
  const onDelete = () => {
    setTotalList(totalList.filter((item)=>!item.isChecked));
  }

  // 모두 선택 
  const checkedAll = (list) =>{
    list.map((item)=> onUpdate(item.no))
  }
  return (
    <div className="App">
      <Header />
      <div className="GradeSearch">
        <div>
            <label htmlFor="search_grede">학년</label>
            <select ref={refGrade} className="form-control" id="search_grede" onChange={searchGreadeChage}>
                <option value="">선택</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
        </div>
      </div>
      <GradeList selectedClasstype={selectedClasstype} totalList={totalList} resultCount={getSearchResult().length} searchList={getSearchResult()} onDelete={onDelete} onUpdate={onUpdate} onCreateGrade={onCreateGrade} onCancleGreate={onCancleGreate} hide={hide} onCreate={onCreate} checkedAll={checkedAll} refIdx={refIdx} />
    </div>
  );
}

export default App;
