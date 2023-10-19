import React from "react";

const GradeTotal = ({searchList, getResult}) => {
    let totalGrades = 0; // 학점(1학점 제외)

    // 1학점을 제외한 객체 리스트 정보
    let realList = searchList.filter((item)=>item.grades !== 1); // 리스트
    let totalAttendance = 0; // 출석점수
    let totalAssignment = 0; // 과제점수
    let totalMid = 0; // 중간고사
    let totalFinal = 0; // 기말고사
    let totalResult = 0; // 총점
    let totalAverage = 0; // 평균
    

    return(
        <tr className="GradeTotal">
            <td colSpan="4">합계
            </td>
            <td>
                <span className="hide">
                {   realList.length === 0 ? totalGrades=0 :
                    totalGrades = realList.map((item)=>(item.grades)).reduce(function(prev, curr){return prev + curr})
                } 
                </span>
                {totalGrades}
                <span className="passCount">
                    P:{searchList.filter((item)=>(item.isPassType && (item.pass === "P"))).length}
                </span>
            </td>
            <td>
                {realList.length === 0 ? totalAttendance=0 : totalAttendance = realList.map((item)=>(item.attendance)).reduce(function(prev, curr){return prev + curr})}
            </td>
            <td>
                {realList.length === 0 ? totalAssignment=0 : totalAssignment = realList.map((item)=>(item.assignment)).reduce(function(prev, curr){return prev + curr})}
            </td>
            <td>
                {realList.length === 0 ? totalMid=0 :
                 totalMid = realList.map((item)=>(item.mid)).reduce(function(prev, curr){return prev + curr})}
            </td>
            <td>
                {realList.length === 0 ? totalFinal=0 :
                 totalFinal = realList.map((item)=>(item.final)).reduce(function(prev, curr){return prev + curr})}
            </td>
            <td>
                {realList.length === 0 ? totalResult=0 : 
                 totalResult = totalAttendance + totalAssignment + totalMid + totalFinal}
            </td>
            <td>
                {realList.length === 0 ? totalAverage=0 : 
                 totalAverage= (totalResult/realList.length).toFixed(2)}
            </td>
            <td className="gradeCell">
                {realList.length === 0 ? "" :
                <span className={getResult(totalAverage) === "F" ? "c_rd" : ""}>
                    {getResult(totalAverage)}
                </span>
                }
            </td>
        </tr>
    );
}

export default React.memo(GradeTotal);