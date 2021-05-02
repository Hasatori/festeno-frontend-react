import React, {useState} from "react";
import "./DietPlan";
import {MDBCol, MDBRow} from "mdbreact";

import book from "../../assets/images/common/book.svg";

const periodTypes = ["Weeks", "Days"]

export function DietPlan() {
    const [month, setMonth] = useState(months[0].number);
    const [periodType, setPeriodType] = useState("Days");
    const [day, setDay] = useState(1);
    const [week, setWeek] = useState(1);
    const mealTimes = ["Breakfast", "Snack", "Lunch", "Snack", "Dinner"];
    return (
        <div className="p-4 d-flex flex-column">
            <div className='d-flex flex-row justify-content-between'>
                <div className="d-flex flex-row">
                    <div className="h1-responsive mr-3">Diet plan</div>
                    <div className="align-self-center">
                        <select className="browser-default custom-select" onChange={(event => {
                            setMonth(Number(event.target.value))
                        })}>
                            {months.map((month) => {
                                return (
                                    <option value={month.number}>{month.name}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className="d-flex">
                    <button className='action-button'>Generate new</button>
                </div>
            </div>
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
                {new Array(new Date(month, 2021, 0).getDate()).fill('').map((item, index) => {
                        ++index;
                        let weekDay = new Date(month, 2021, index).getDay();
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
                                const weekNumber = Math.ceil(index/7);
                                return <div className={weekNumber === week ? "period-big-button-active d-flex flex-column ml-2" : "period-big-button d-flex flex-column ml-2"}
                                            onClick={(event) => setWeek(weekNumber)}
                                >
                                    <div>{weekNumber}.week</div>
                                    <div> {index - 6}.{month} - {index}.{month}</div>
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
                                    <MDBCol size="1" className="align-self-center">
                                        <img src={book} width={35}/>
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
                : periodType === "Weeks" ? <div>Weeks</div> : ""}

        </div>
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

const months = [
    {
        "abbreviation": "Jan",
        "name": "January",
        "number": 1
    },
    {
        "abbreviation": "Feb",
        "name": "February",
        "number": 2
    },
    {
        "abbreviation": "Mar",
        "name": "March",
        "number": 3
    },
    {
        "abbreviation": "Apr",
        "name": "April",
        "number": 4
    },
    {
        "abbreviation": "May",
        "name": "May",
        "number": 5
    },
    {
        "abbreviation": "Jun",
        "name": "June",
        "number": 6
    },
    {
        "abbreviation": "Jul",
        "name": "July",
        "number": 7
    },
    {
        "abbreviation": "Aug",
        "name": "August",
        "number": 8
    },
    {
        "abbreviation": "Sep",
        "name": "September",
        "number": 9
    },
    {
        "abbreviation": "Oct",
        "name": "October",
        "number": 10
    },
    {
        "abbreviation": "Nov",
        "name": "November",
        "number": 11
    },
    {
        "abbreviation": "Dec",
        "name": "December",
        "number": 12
    }
]
