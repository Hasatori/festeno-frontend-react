import {MDBContainer, MDBTypography} from "mdbreact";
import React, {Dispatch, SetStateAction, useState} from "react";
import {connect} from "react-redux";
import SingleOptionQuestion from "./SingleOptionQuestion";
import OpenQuestion from "./OpenQuestionProps";

function FoodPreferences() {

    const [step, setStep] = useState<number>(1);
    const [dietType, setDietType] = useState<string | null>(null);
    const [hatedFoods, setHatedFoods] = useState<Array<string>>([]);
    const [lovedFoods, setLovedFoods] = useState<Array<string>>([]);
    const [preferredCuisines, setPreferredCuisines] = useState<Array<string>>([]);
    const [careAboutMacros, setCareAboutMacros] = useState<boolean | null>(null);
    const [loseOrGain, setLoseOrGain] = useState<string | null>(null);
    switch (step) {
        case 1:
            return (
                <MDBContainer className={"mx-auto p-5 mt-3"}>
                    <SingleOptionQuestion question={`${step}. Are you on any special type of diet ?`}
                                          options={["Vegan", "Vegetarian", "None"]}
                                          selectedOption={dietType}
                                          onSelectOption={setDietType}
                    />
                    <StepsControl step={step} setStep={setStep} canGoNext={dietType !== null}/>
                </MDBContainer>
            )
        case 2:
            return (
                <MDBContainer className={"mx-auto p-5 mt-3"}>
                    <OpenQuestion
                        answers={hatedFoods}
                        addAnswer={(answer => setHatedFoods(oldArray => [...oldArray, answer]))}
                        removeAnswer={(answer => setHatedFoods(oldArray => oldArray.filter(value => value !== answer)))}
                        question={`${step}. What are the foods you can not stand?`}
                    />
                    <StepsControl step={step} setStep={setStep} canGoNext={true}/>
                </MDBContainer>
            )
        case 3:
            return (
                <MDBContainer className={"mx-auto p-5 mt-3"}>
                    <OpenQuestion
                        answers={lovedFoods}
                        addAnswer={(answer => setLovedFoods(oldArray => [...oldArray, answer]))}
                        removeAnswer={(answer => setLovedFoods(oldArray => oldArray.filter(value => value !== answer)))}
                        question={`${step}. What are the foods you absolutely love?`}
                    />
                    <StepsControl step={step} setStep={setStep} canGoNext={true}/>
                </MDBContainer>
            )
        case 4:
            return (
                <MDBContainer className={"mx-auto p-5 mt-3"}>
                    <OpenQuestion
                        answers={preferredCuisines}
                        addAnswer={(answer => setPreferredCuisines(oldArray => [...oldArray, answer]))}
                        removeAnswer={(answer => setPreferredCuisines(oldArray => oldArray.filter(value => value !== answer)))}
                        question={`${step}. Do you prefer any specific cuisine?`}
                    />
                    <StepsControl step={step} setStep={setStep} canGoNext={true}/>
                </MDBContainer>
            )
        case 5:
            return (
                <MDBContainer className={"mx-auto p-5 mt-3"}>
                    <SingleOptionQuestion
                        onSelectOption={(option => setCareAboutMacros(option === null ? null : option === 'Yes'))}
                        options={["Yes", "No"]}
                        question={`${step}. Do you care about macros?`}
                        selectedOption={careAboutMacros === null ? null : careAboutMacros ? "Yes" : "No"}
                    />
                    <StepsControl step={step} setStep={setStep} canGoNext={careAboutMacros !== null}/>
                </MDBContainer>
            )
        case 6:
            return (
                <MDBContainer className={"mx-auto p-5 mt-3"}>
                    <SingleOptionQuestion
                        question={`${step}. Are you trying to lose weight, gain weight or anything like that?`}
                        options={["Lose", "Gain", "None"]}
                        selectedOption={loseOrGain}
                        onSelectOption={setLoseOrGain}
                    />
                    <StepsControl step={step} setStep={setStep} canGoNext={false}/>
                    <button disabled={loseOrGain === null}>submit</button>
                </MDBContainer>
            )
        default:
            return (
                <>

                </>)
    }
}

interface StepsControlProps {
    readonly step: number,
    setStep: Dispatch<SetStateAction<number>>
    canGoNext: boolean
}

function StepsControl(props: StepsControlProps) {
    return (
        <div className='d-flex flex-row'>
            <div className='align-self-center'>

                <button className="btn btn-block btn-primary" type="button"
                        onClick={() => {
                            props.setStep(props.step - 1)
                        }}
                        disabled={props.step === 1}>previous
                </button>

            </div>
            <div className='align-self-center'>
                <button className="btn btn-block btn-primary" type="button"
                        onClick={() => {
                            props.setStep(props.step + 1)
                        }}
                        disabled={!props.canGoNext}
                >Next
                </button>
            </div>
        </div>
    )
}


export default connect()(FoodPreferences)
