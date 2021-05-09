import React, {useEffect, useState} from "react";
import "./DietPlan.css";
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";

import book from "../../assets/images/common/book_active.svg";
import {Link} from "react-router-dom";
import {useMediaQuery} from "react-responsive";

const periodTypes = ["Weeks", "Days"]

export function DietPlan() {
    const [month, setMonth] = useState(months[0].number);
    const [periodType, setPeriodType] = useState("Days");
    const [day, setDay] = useState(1);
    const [week, setWeek] = useState(1);
    const [montDaysCount, setMonthDaysCount] = useState((new Date(2021, month, 0).getDate()));
    const isSmallScreen = useMediaQuery({query: '(max-width: 700px)'});
    useEffect(() => {
        console.log(month);
        setMonthDaysCount((new Date(2021, month, 0).getDate()));
    }, [month])
    const mealTimes = ["Breakfast", "Snack", "Lunch", "Snack", "Dinner"];
    return (
        <MDBContainer className={isSmallScreen?"mt-5":" mt-3"}>
            <MDBRow>
                <MDBCol md={"4"} lg={"3"} xl={"3"} className='mt-2'>
                    <div className="h1-responsive mr-3">Diet plan</div>
                </MDBCol>
                <MDBCol md={"4"} lg={"3"} xl={"3"}  className='mt-2'>   <select className="browser-default custom-select float-left" onChange={(event => {
                    setMonth(Number(event.target.value))
                })}>
                    {months.map((month) => {
                        return (
                            <option value={month.number}>{month.name}</option>
                        )
                    })}
                </select></MDBCol>
                <MDBCol md={"4"} lg={"6"} xl={"6"}  className='mt-2'>
                    <button className='action-button float-right'>Generate new</button>
                </MDBCol>
            </MDBRow>
            <div className="d-flex flex-row mt-5 period-wrapper">
                <div>
                    <select className="browser-default custom-select mr-5" onChange={(event => {
                        setPeriodType(event.target.value)
                    })}>
                        {periodTypes.map((pT) => {
                            return <option selected={pT === periodType} value={pT}>{pT}</option>
                        })}
                    </select>
                </div>
                {new Array(montDaysCount).fill('').map((item, index) => {
                        ++index;
                        let weekDay = new Date(2021, month, index).getDay();
                        if (periodType === "Days") {
                            return (<div
                                className={index === day ? "period-big-button-active d-flex flex-column ml-2" : "period-big-button d-flex flex-column ml-2"}
                                onClick={(event) => setDay(index)}>
                                <div
                                    className="text-center">{getDayOfWeekAbr(weekDay)}</div>
                                <div className="text-center">{index}</div>
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
                            } else if (index === montDaysCount) {
                                const weekNumber = Math.ceil(index / 7);
                                return <div
                                    className={weekNumber === week ? "period-big-button-active d-flex flex-column ml-2" : "period-big-button d-flex flex-column ml-2"}
                                    onClick={(event) => setWeek(weekNumber)}
                                >
                                    <div>{weekNumber}.week</div>
                                    <div> 29.{month + 1} - {montDaysCount}.{month + 1}</div>
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
                            if (day <= montDaysCount) {
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
