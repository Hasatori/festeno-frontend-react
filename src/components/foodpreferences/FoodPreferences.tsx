import {MDBContainer, MDBTypography} from "mdbreact";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {connect} from "react-redux";
import SingleChoiceQuestion from "./SingleChoiceQuestion";
import OpenQuestion from "./OpenQuestionProps";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import API from "../../util/APIUtils";
import i18next from "i18next";
import {failureActionCreator, LOAD_RECIPE_TAGS} from "../../redux/actiontype/GeneralActionTypes";

enum FoodPreferenceType {
    FAVOURITE_FOOD= "FAVOURITE_FOOD", HATED_FOOD = "HATED_FOOD", FAVOURITE_CUISINE = "FAVOURITE_CUISINE", DIET_SUB_TYPE = "DIET_SUB_TYPE"
}

interface FoodPreference {
    value: string,
    foodPreferenceType: FoodPreferenceType
}

interface FoodPreferencesRequest {

    dietType: string,
    foodPreferences: Array<FoodPreference>

}

function FoodPreferences() {

    const [step, setStep] = useState<number>(1);
    const [dietType, setDietType] = useState<string | null>(null);
    const [dietSubTypes, setDietSubTypes] = useState<Array<string>>(["Low fat"]);
    const [hatedFoods, setHatedFoods] = useState<Array<string>>([]);
    const [lovedFoods, setLovedFoods] = useState<Array<string>>([]);
    const [preferredCuisines, setPreferredCuisines] = useState<Array<string>>([])
    const [canGoNext, setCanGoNext] = useState(false);
    const questions = [
        <SingleChoiceQuestion question={`${step}. Please select preferred diet.`}
                              options={["Vegan", "Vegetarian", "Omnivore"]}
                              selectedOption={dietType}
                              onSelectOption={(option => {
                                  setDietType(option);
                                  setCanGoNext(option !== null)
                              })}
        />,
        <MultipleChoiceQuestion question={`${step}. Please select preferred diet.`}
                                selectedOptions={dietSubTypes}
                                options={["Low fat", "Low carb", "High protein"]}
                                removeOption={(option => {
                                    setDietSubTypes((oldSubtypes) => {
                                        return oldSubtypes.filter(subtype => {
                                            return subtype !== option
                                        })
                                    })
                                })}
                                addOption={(option => {
                                    setDietSubTypes((oldSubtypes) => {
                                        return {...oldSubtypes, option}
                                    })
                                })}
        />,
        <OpenQuestion
            answers={lovedFoods}
            addAnswer={(answer => setLovedFoods(oldArray => [...oldArray, answer]))}
            removeAnswer={(answer => setLovedFoods(oldArray => oldArray.filter(value => value !== answer)))}
            question={`${step}. What food ingredients do you truly love?`}
        />,
        <OpenQuestion
            answers={hatedFoods}
            addAnswer={(answer => setHatedFoods(oldArray => [...oldArray, answer]))}
            removeAnswer={(answer => setHatedFoods(oldArray => oldArray.filter(value => value !== answer)))}
            question={`${step}. What food ingredients do you hate?`}
        />,
        <OpenQuestion
            answers={preferredCuisines}
            addAnswer={(answer => setPreferredCuisines(oldArray => [...oldArray, answer]))}
            removeAnswer={(answer => setPreferredCuisines(oldArray => oldArray.filter(value => value !== answer)))}
            question={`${step}. Do you prefer any specific cuisine?`}
        />
    ]

    useEffect(() => {
        const question = questions[step - 1];
        if (question.type === MultipleChoiceQuestion || question.type === OpenQuestion) {
            setCanGoNext(true);
        } else {
            setCanGoNext(false);
        }
    }, [step])

    function submit() {
        console.log()
        if (dietType != null) {
            const foodPreferences: FoodPreference[] = []
            const dietSub: FoodPreference[] = dietSubTypes.map((dietSubType) => {
                return {value: dietSubType, foodPreferenceType: FoodPreferenceType.DIET_SUB_TYPE}
            });
            foodPreferences.push(...dietSub);
            const favouriteFoodsReq: FoodPreference[] = lovedFoods.map((lovedFood) => {
                return {value: lovedFood, foodPreferenceType: FoodPreferenceType.FAVOURITE_FOOD};
            });
            foodPreferences.push(...favouriteFoodsReq);
            const hatedFoodsReq: FoodPreference[] = hatedFoods.map((hatedFood) => {
                return {value: hatedFood, foodPreferenceType: FoodPreferenceType.HATED_FOOD}
            });
            foodPreferences.push(...hatedFoodsReq);
            const favouriteCuisineReq:FoodPreference[] = preferredCuisines.map((value => {return {
                value: value,
                foodPreferenceType: FoodPreferenceType.FAVOURITE_CUISINE
            }}));
            foodPreferences.push(...favouriteCuisineReq);
            const request: FoodPreferencesRequest = {
                dietType: dietType,
                foodPreferences: foodPreferences,
            }
            API({
                url: process.env.REACT_APP_REST_API_URL + "/save-preferences",
                data: request,
                method: 'POST',
            }).then((response) => {
                console.log(response)
            }).catch(error => {
                console.log(error);
            });
        }
    }

    return (
        <MDBContainer className={"mx-auto p-5 mt-3"}>
            {questions[step - 1]}
            {step !== questions.length ?
                <StepsControl
                    onNext={() => {
                        setStep(step + 1)
                    }}
                    nextEnabled={canGoNext}
                    previousEnabled={step !== 1}
                    onPrevious={() => {
                        setStep(step - 1)
                    }}
                />
                :
                <SubmitControl
                    onPrevious={() => {
                        setStep(step - 1)
                    }}
                    canSubmit={canGoNext}
                    onSubmit={submit}
                />
            }

        </MDBContainer>
    )
}

interface StepsControlProps {
    onPrevious: () => void
    onNext: () => void
    previousEnabled: boolean
    nextEnabled: boolean
}

function StepsControl(props: StepsControlProps) {
    return (
        <div className='d-flex flex-row mx-auto'>
            <div className='align-self-center mr-3'>
                <button className="btn btn-block btn-primary" type="button"
                        onClick={() => {
                            props.onPrevious();
                        }}
                        disabled={!props.previousEnabled}>previous
                </button>
            </div>
            <div className='align-self-center'>
                <button className="btn btn-block btn-primary" type="button"
                        onClick={() => {
                            props.onNext();
                        }}
                        disabled={!props.nextEnabled}
                >Next
                </button>
            </div>
        </div>
    )
}

interface SubmitProperties {
    onPrevious: () => void
    canSubmit: boolean
    onSubmit: () => void
}

function SubmitControl(props: SubmitProperties) {
    return (
        <div className='d-flex flex-row mx-auto'>
            <div className='align-self-center mr-3'>
                <button className="btn btn-block btn-primary" type="button"
                        onClick={() => {
                            props.onPrevious();
                        }}>previous
                </button>
            </div>
            <div className='align-self-center'>
                <button className="btn btn-block btn-primary" type="button"
                        onClick={() => {
                            props.onSubmit();
                        }}
                        disabled={!props.canSubmit}
                >Submit
                </button>
            </div>
        </div>
    )
}

export default connect()(FoodPreferences)
