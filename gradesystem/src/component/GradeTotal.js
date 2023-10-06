import React from "react";

const GradeTotal = ({searchList, getResult}) => {
    let totalGrades = 0; // 학점(1학점 제외)
    let totalGradesFull = 0; // 학점(1학점 포함 촘 합계)

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
                {
                    // 전체 객체 리스트의 학점 합계(1학점 포함)
                    totalGradesFull = searchList.map((item)=>(item.grades)).reduce(function(prev2, curr2){return prev2 + curr2})
                }
                </span>
                {
                    totalGrades = realList.map((item)=>(item.grades)).reduce(function(prev, curr){return prev + curr})
                } 
                <span className="passCount">
                    P:{totalGradesFull - totalGrades}
                </span>
            </td>
            <td>
                {totalAttendance = realList.map((item)=>(item.attendance)).reduce(function(prev, curr){return prev + curr})}
            </td>
            <td>
                {totalAssignment = realList.map((item)=>(item.assignment)).reduce(function(prev, curr){return prev + curr})}
            </td>
            <td>
                {totalMid = realList.map((item)=>(item.mid)).reduce(function(prev, curr){return prev + curr})}
            </td>
            <td>
                {totalFinal = realList.map((item)=>(item.final)).reduce(function(prev, curr){return prev + curr})}
            </td>
            <td>
                {totalResult = totalAttendance + totalAssignment + totalMid + totalFinal}
            </td>
            <td>
                {totalAverage= (totalResult/realList.length).toFixed(2)}
            </td>
            <td className="gradeCell">
                <span className={getResult(totalAverage) === "F" ? "c_rd" : ""}>
                    {getResult(totalAverage)}
                </span>
            </td>
        </tr>
    );
}

export default React.memo(GradeTotal);