import React, {Dispatch, SetStateAction, useState} from "react";
import {MDBContainer, MDBTypography} from "mdbreact";
import signup from "../user/signup/Signup";

export interface PreferenceQuestionProps {
    selected: Array<string>
    options: Array<string>
    question: string
    addOption: (option: string) => void
    removeOption: (option: string) => void
}

export interface Option {
    value:string,
    selected:boolean
}

export default function MultipleChoiceQuestion(props: PreferenceQuestionProps) {

    function onChange(option: string) {
        props.selected.filter(value => value === option).length === 1 ?
            props.removeOption(option) :
            props.addOption(option)
    }

    function checked(option: string | null){
       return props.selected.filter(value => value === option).length === 1;
    }

    return (<div className='d-flex flex-column'>
        <div className=''>
            <MDBTypography tag='h1' variant="h1-responsive">{props.question}</MDBTypography>
            <small>select zero to many options</small>
        </div>
        {props.options.map((option) => {
            return (
                <div className=''>
                    <SingleCheckBox
                        text={option}
                        checked={checked(option)}
                        onChange={() => {onChange(option)
                        }}/>
                </div>
            )
        })}
    </div>)

}

interface SingleCheckBoxProps {
    text: string,
    checked: boolean,
    onChange: () => void
}

function SingleCheckBox(props: SingleCheckBoxProps) {
    return (
        <div className='d-flex flex-row'>
            <div className='align-self-center'>
                <input
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