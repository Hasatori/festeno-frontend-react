import React, {useEffect, useState} from "react";
import {CircleLoader} from "react-spinners";
import RecipesGrid from "../RecipesGrid";
import {connect} from "react-redux";
import {AppState} from "../../../redux/store/Store";
import {RecipeOverview} from "../../../redux/reducer/GeneralReducer";
import {MDBContainer} from "mdbreact";

export interface FavouriteRecipesProps {
    favouriteRecipes: Array<RecipeOverview>
    loading: boolean
}

function mapStateToProps(state: AppState, props: FavouriteRecipesProps) {
    return {
        favouriteRecipes: state.generalState.favouriteRecipes
    }
}


function FavouriteRecipes(props: FavouriteRecipesProps) {

    const [filteredFavouriteRecipes, setFilteredFavouriteRecipes] = useState(props.favouriteRecipes);
    const [filterValue, setFilterValue] = useState("");


    return (
        <div>
            <div className="d-flex flex-center mt-5 p-2"><h1>Yours favourite</h1></div>

            <div
                className={'d-flex flex-column pt-4 pl-2'}>
                {props.loading ?
                    <div>

                        <CircleLoader
                            css={`margin:auto;`}
                            size={75}
                            color={"#123abc"}
                            loading={props.loading}
                        />
                        <h2 className="text-center">Loading favourite recipes</h2>
                    </div>
                    : null}
                <MDBContainer className='mt-3 pl-5 '>
                    <div className='d-flex flex-row'>
                        <div className='d-flex align-self-center mr-1'>
                            <input
                                type="text"
                                placeholder='search by name'
                                className="form-control"
                                value={filterValue}
                                onChange={(event) => {
                                    setFilterValue(event.target.value);
                                    if (event.target.value.trim() === "") {
                                        setFilteredFavouriteRecipes(props.favouriteRecipes);
                                    } else {
                                        setFilteredFavouriteRecipes(props.favouriteRecipes.filter((rec) => {
                                            return rec.title.toLowerCase().includes(event.target.value.toLowerCase().trim());
                                        }))
                                    }
                                }}
                            /></div>
                    </div>
                </MDBContainer>
                <RecipesGrid recipes={filteredFavouriteRecipes} heading={""}/>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, null)(FavouriteRecipes);
