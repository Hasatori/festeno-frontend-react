import React, {useState} from "react";

export default function NutrientRow(name:string) {
    const [enabled,setEnabled]=useState(true);
    const [nutrientVal,setNutrientVal]=useState(0);
    return (
        <div className='d-flex flex-row flex-grow-1 justify-content-between'>
            <div className='d-flex flex-column pb-4'>
                <div>Nutrient</div>
                <div onClick={()=>{setEnabled(!enabled)}}
                     className={enabled? ' hover-pointer-cursor nutrient-dot-active align-self-center' : ' hover-pointer-cursor nutrient-dot-disabled align-self-center'}/>
            </div>

            <div className='mx-2 flex-grow-1 align-self-center'>
                <input type="range" disabled={!enabled}
                       className={enabled ? 'custom-range-active' : 'custom-range-disabled'}

                       value={nutrientVal}
                       onChange={(event => setNutrientVal(Number(event.target.value)))}/>
            </div>
            <div className='align-self-center'>
                <div
                    className={enabled? 'nutrient-indicator-has-value' : 'nutrient-indicator-disabled'}>{nutrientVal}</div>
            </div>
        </div>
    )
}
