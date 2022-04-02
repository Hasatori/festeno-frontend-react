import React, {Dispatch, SetStateAction, useState} from "react";
import {MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBRow, MDBTypography} from "mdbreact";
import signup from "../user/signup/Signup";
import rice_img from "../../assets/images/preferences/ingredients/rice.jpg"
import './FoodPreferences.css'
import {getFormControlClass} from "../../util/APIUtils";

export interface OpenQuestionProps {
    readonly answers: Array<string>
    readonly suggestedOptions: Array<string>
    addAnswer: (answer: string) => void
    removeAnswer: (answer: string) => void
    question: string
}

export default function OpenQuestion(props: OpenQuestionProps) {
    const [currentAnswer, setCurrentAnswer] = useState("");
    const [error, setError] = useState("");

    return (<MDBContainer className={"mx-auto p-5 mt-3"}>
        <div className='d-flex flex-column '>
            <div className='mb-2'>
                <MDBTypography tag='h1' variant="h1-responsive">{props.question}</MDBTypography>
            </div>
            <MDBRow>
                <MDBCol size={'4'}>
                    <div className='d-flex flex-column'>
                        <div className='d-flex flex-row'>
                            <div className='d-flex align-self-center mr-1'>
                                <div className="my-0">
                                    <input
                                        type="text"
                                        placeholder='type in ingredient'
                                        className={error !== '' ? 'form-control is-invalid' : 'form-control'}
                                        value={currentAnswer}
                                        onChange={(event) => setCurrentAnswer(event.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='d-flex align-self-center'>
                                <MDBBtn
                                    className="background-color-primary color-background rounded z-depth-1 w-100 bold"
                                    type="button"
                                    onClick={() => {
                                        if (currentAnswer.trim() === "") {
                                            setError("Fill value")
                                        } else if (props.answers.map((answer) => answer.toLowerCase().trim()).includes(currentAnswer.toLowerCase().trim())) {
                                            setError("Already added");
                                        } else {
                                            props.addAnswer(currentAnswer);
                                            setCurrentAnswer("");
                                            setError("");
                                        }
                                    }}>Add
                                </MDBBtn>
                            </div>
                        </div>
                        {error !== "" ? <div className="d-flex text-left error-color">{error}</div> : null}
                        <div className='mt-2'>
                            <ul className="list-group">
                                {props.answers.map((answer) => {
                                    return (
                                        <li className="list-group-item">
                                            <div className='d-flex flex-row d-flex justify-content-between'>
                                                <div className='d-flex'>{answer}</div>
                                                <div className="d-flex hover-pointer-cursor"
                                                     onClick={() => props.removeAnswer(answer)}>x
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </MDBCol>
                <MDBCol size={'8'}>
                    <div>Here is some inspiration</div>
                    <MDBRow>
                        {props.suggestedOptions.map(
                            (ingredient) => {
                                return (
                                    <MDBCol sm={'6'} md={'4'} lg={'3'}>
                                        <MDBBtn
                                            className="background-color-primary color-background rounded z-depth-1 w-100 bold"
                                            type="button"
                                            disabled={props.answers.map((answer) => answer.toLowerCase().trim()).includes(ingredient.toLowerCase().trim())}
                                            onClick={() => {
                                                props.addAnswer(ingredient);
                                            }}>{ingredient}
                                        </MDBBtn>
                                    </MDBCol>
                                )
                            }
                        )}
                    </MDBRow>
                </MDBCol>
            </MDBRow>

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