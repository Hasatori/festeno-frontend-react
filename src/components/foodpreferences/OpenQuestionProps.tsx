import React, {Dispatch, SetStateAction, useState} from "react";
import {MDBContainer, MDBIcon, MDBTypography} from "mdbreact";
import signup from "../user/signup/Signup";

export interface OpenQuestionProps {
    readonly answers: Array<string>
    addAnswer: (answer: string) => void
    removeAnswer:(answer: string) => void
    question: string
}

export default function OpenQuestion(props: OpenQuestionProps) {
    const [currentAnswer, setCurrentAnswer] = useState("");

    return (<MDBContainer className={"mx-auto p-5 mt-3"}>
        <div className='d-flex flex-column '>
            <div className='mb-2'>
                <MDBTypography tag='h1' variant="h1-responsive">{props.question}</MDBTypography>
            </div>
            <input
                type="text"
                value={currentAnswer} onChange={(event) => setCurrentAnswer(event.target.value)}
                required
            />
            <div>
                <button className="btn btn-primary p-1"
                        type="submit"
                        onClick={() => {
                            props.addAnswer(currentAnswer);
                            setCurrentAnswer("")
                        }}
                >add
                </button>
            </div>
            <ul>
                {props.answers.map((answer) => {
                    return (<li>{answer}<div onClick={()=>props.removeAnswer(answer)}>x</div></li>)
                })}
            </ul>
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