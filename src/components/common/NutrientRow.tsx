import React, {useState} from "react";
import "./NutrientRow.css";
import {MDBCol, MDBRow} from "mdbreact";


export interface NutrientRowProps {
    nutrientName: string
}


export default function NutrientRow(props: NutrientRowProps) {
    const [enabled, setEnabled] = useState(true);
    const [nutrientVal, setNutrientVal] = useState(0);
    return (
        <MDBRow>
            <MDBCol size={"1"} className={"my-auto"}>
                <div className='d-flex flex-column pb-4 '>
                    <div className="align-self-center mb-2">{props.nutrientName}</div>
                    <div onClick={() => {
                        setEnabled(!enabled)
                    }}
                         className={enabled ? ' hover-pointer-cursor nutrient-dot-active align-self-center' : ' hover-pointer-cursor nutrient-dot-disabled align-self-center'}/>
                </div>
            </MDBCol>
            <MDBCol size={"10"} className={"my-auto"}>
                    <input type="range" disabled={!enabled}
                           className={enabled ? 'custom-range-active' : 'custom-range-disabled'}

                           value={nutrientVal}
                           onChange={(event => setNutrientVal(Number(event.target.value)))}/>

            </MDBCol>
            <MDBCol size={"1"} className={"my-auto "}>
                <div
                    className={enabled ? 'nutrient-indicator-has-value mx-auto' : 'nutrient-indicator-disabled text-center mx-auto'}>{nutrientVal}
                </div>
            </MDBCol>
        </MDBRow>
    )
}
