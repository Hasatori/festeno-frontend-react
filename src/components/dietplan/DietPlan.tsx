import React, {useEffect, useState} from "react";
import "./DietPlan.css";
import {MDBCol, MDBContainer, MDBIcon, MDBRow} from "mdbreact";

import book from "../../assets/images/common/book_active.svg";
import {Link} from "react-router-dom";
import {useMediaQuery} from "react-responsive";

const periodTypes = ["Weeks", "Days"]

export function DietPlan() {
    const today = new Date();
    const [month, setMonth] = useState(today.getMonth());
    const [periodType, setPeriodType] = useState("Days");
    const [day, setDay] = useState(today.getDate());
    const [week, setWeek] = useState(1);
    const [monthDaysCount, setMonthDaysCount] = useState((new Date(today.getFullYear(), month+1, 0).getDate()));
    console.log(monthDaysCount)
    const isMobileScreen = useMediaQuery({query: '(max-width: 500px)'});
    const isTinyScreen = useMediaQuery({query: '(min-width: 500px) and (max-width: 800px)'});
    const isSmallScreen = useMediaQuery({query: '(min-width: 800px) and (max-width: 900px)'});
    const mealTimes = ["Breakfast", "Snack", "Lunch", "Snack", "Dinner"];
    const isMediumScreen = useMediaQuery({query: '(min-width: 900px) and (max-width: 1000px)'});
    const isBigScreen = useMediaQuery({query: '(min-width: 1100px)'});
    return (
        <MDBContainer className={isSmallScreen?"mt-5":" mt-3"}>
            <MDBRow>
                <MDBCol size='12' className='mt-2'>
                    <div className="h1-responsive mr-3 text-center">Diet plan</div>
                </MDBCol>
              {/*  <MDBCol md={"4"} lg={"3"} xl={"3"}  className='mt-2'> Month  <select className="browser-default custom-select float-left" onChange={(event => {
                    setMonth(Number(event.target.value))
                })}>
                    {months.map((m) => {
                        return (
                            <option value={m.number} selected={m.number===month}>{m.name}</option>
                        )
                    })}
                </select></MDBCol>*/}
  {/*              <MDBCol md={"4"} lg={"3"} xl={"3"}  className='mt-2'>
                    <div>
                   Period <select className="browser-default custom-select mr-5" onChange={(event => {
                        setPeriodType(event.target.value)
                    })}>
                        {periodTypes.map((pT) => {
                            return <option selected={pT === periodType} value={pT}>{pT}</option>
                        })}
                    </select>
                </div></MDBCol>
*/}

        {/*        <MDBCol md={"4"} lg={"6"} xl={"6"}  className='mt-2'>
                    <button className='action-button float-right'>Generate new</button>
                </MDBCol>*/}
            </MDBRow>
            <div className="d-flex flex-row mt-5 period-wrapper justify-content-center">
                {new Array(monthDaysCount).fill('').map((item, index) => {
                        ++index;
                        let weekDay = new Date(today.getFullYear(), month, index).getDay();
                        if (periodType === "Days" && Math.abs(index - day) < (isMobileScreen?1:isTinyScreen?2:isSmallScreen?4:isMediumScreen?5:isBigScreen?6:5)) {
                            return (<div
                                className={index === day ? "period-big-button-active d-flex flex-column ml-2" : "period-big-button d-flex flex-column ml-2"}
                                onClick={(event) => setDay(index)}>
                                <div
                                    className="text-center">{getDayOfWeekAbr(weekDay)}</div>
                                <div className="text-center">{index}</div>
                            </div>)
                        }
                        if (periodType === "Days" && Math.abs(index - day) === (isMobileScreen?1:isTinyScreen?2:isSmallScreen?4:isMediumScreen?5:isBigScreen?6:5)){
                            return (<div
                                className={index === day ? "period-big-button-active d-flex flex-row" : "period-big-button d-flex flex-row ml-2"}
                                onClick={(event) => setDay(index)}>
                                <MDBIcon className='align-self-center' icon={index - day < 0?"arrow-left":"arrow-right"}/>
                            </div>)
                        }
                        if (periodType === "Weeks") {
                            if (index % 7 === 0) {
                                const weekNumber = Math.ceil(index / 7);
                                return <div
                                    className={weekNumber === week ? "period-big-button-active d-flex flex-column ml-2" : "period-big-button d-flex flex-column ml-2"}
                                    onClick={(event) => setWeek(weekNumber)}
                                >
                                    <div>{weekNumber}.week</div>
                                    <div> {index - 6}.{month + 1} - {index}.{month + 1}</div>
                                </div>
                            } else if (index === monthDaysCount) {
                                const weekNumber = Math.ceil(index / 7);
                                return <div
                                    className={weekNumber === week ? "period-big-button-active d-flex flex-column ml-2" : "period-big-button d-flex flex-column ml-2"}
                                    onClick={(event) => setWeek(weekNumber)}
                                >
                                    <div>{weekNumber}.week</div>
                                    <div> 29.{month + 1} - {monthDaysCount}.{month + 1}</div>
                                </div>
                            }

                        }
                    }
                )}
            </div>
            {periodType === "Days" ?
                <div className="mt-3 d-flex flex-column ">
                    {mealTimes.map((mealTime, index) => {
                        return (
                            <>
                                <MDBRow className="d-flex flex-row meal-time-item">
                                    <MDBCol size="1" className="meal-time-tick-box"/>
                                    <MDBCol size="1" className="align-self-center">{mealTime}</MDBCol>
                                    <MDBCol size="9" className="align-self-center text-center">Pečený sloní
                                        chobot</MDBCol>
                                    <MDBCol size="1" className="align-self-center text-right">
                                        <img src={book} className="background-color-background p-2 rounded" width={35}/>
                                    </MDBCol>
                                </MDBRow>
                                {index !== mealTimes.length - 1 ?
                                    <div className="meal-time-divider">
                                    </div>
                                    : ""}

                            </>
                        )
                    })}

                </div>
                : periodType === "Weeks" ? <MDBRow className="mt-5">
                    {
                        new Array(7).fill('').map((val, index) => {
                            const day = week * 7 - 6 + index;
                            let date = new Date(2021, month, day);
                            let weekDay = date.getDay();
                            if (day <= monthDaysCount) {
                                return (
                                    <MDBCol size={"3"}>
                                        <div className="period-big-button" onClick={() => {
                                            setDay(day);
                                            setPeriodType("Days");
                                        }}>{day}.{month + 1} {getDayOfWeek(weekDay)}</div>
                                    </MDBCol>
                                )
                            }
                        })
                    }

                </MDBRow> : ""}

        </MDBContainer>
    )
}

function getDayOfWeekAbr(dayOfWeekNumber: number) {
    let day;
    switch (dayOfWeekNumber) {
        case 0:
            day = "Su";
            break;
        case 1:
            day = "Mo";
            break;
        case 2:
            day = "Tu";
            break;
        case 3:
            day = "We";
            break;
        case 4:
            day = "Th";
            break;
        case 5:
            day = "Fr";
            break;
        case 6:
            day = "Sa";
    }
    return day;
}


function getDayOfWeek(dayOfWeekNumber: number) {
    let day;
    switch (dayOfWeekNumber) {
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
    }
    return day;
}

const months = [
    {
        "abbreviation": "Jan",
        "name": "January",
        "number": 0
    },
    {
        "abbreviation": "Feb",
        "name": "February",
        "number": 1
    },
    {
        "abbreviation": "Mar",
        "name": "March",
        "number": 2
    },
    {
        "abbreviation": "Apr",
        "name": "April",
        "number": 3
    },
    {
        "abbreviation": "May",
        "name": "May",
        "number": 4
    },
    {
        "abbreviation": "Jun",
        "name": "June",
        "number": 5
    },
    {
        "abbreviation": "Jul",
        "name": "July",
        "number": 6
    },
    {
        "abbreviation": "Aug",
        "name": "August",
        "number": 7
    },
    {
        "abbreviation": "Sep",
        "name": "September",
        "number": 8
    },
    {
        "abbreviation": "Oct",
        "name": "October",
        "number": 9
    },
    {
        "abbreviation": "Nov",
        "name": "November",
        "number": 10
    },
    {
        "abbreviation": "Dec",
        "name": "December",
        "number": 11
    }
]
