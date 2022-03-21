import React, {Dispatch, SetStateAction, useState} from "react";
import {MDBContainer, MDBTypography} from "mdbreact";
import signup from "../user/signup/Signup";

export interface PreferenceQuestionProps {
    options: Array<string>
    question: string
    selectedOption: string | null
    onSelectOption: (option: string | null) => void

}

export default function SingleOptionQuestion(props: PreferenceQuestionProps) {
    return (<MDBContainer className={"mx-auto p-5 mt-3"}>
        <div className='d-flex flex-column '>
            <div className='align-self-center'>
                <MDBTypography tag='h1' variant="h1-responsive">{props.question}</MDBTypography>
                <small>select just one option</small>
            </div>
            {props.options.map((option) => {
                return (
                    <SingleCheckBox
                        text={option}
                        disabled={props.selectedOption !== null && props.selectedOption !== option}
                        checked={props.selectedOption === option}
                        onChange={() => props.selectedOption === option ? props.onSelectOption(null) : props.onSelectOption(option)}/>
                )
            })}

        </div>

    </MDBContainer>)

}

interface SingleCheckBoxProps {
    text: string,
    disabled: boolean,
    checked: boolean,
    onChange: () => void
}

function SingleCheckBox(props: SingleCheckBoxProps) {
    return (
        <div className='d-flex flex-row'>
            <div className='align-self-center'>
                <input disabled={props.disabled}
                       checked={props.checked}
                       onChange={props.onChange}
                       type="checkbox"
                />
            </div>
            <div className='align-self-center ml-2'>
                {props.text}
            </div>
        </div>
    )

}