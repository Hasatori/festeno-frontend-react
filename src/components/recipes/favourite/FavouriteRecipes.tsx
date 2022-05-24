import React, {useEffect} from "react";
import {CircleLoader} from "react-spinners";
import RecipesGrid from "../RecipesGrid";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {loadFavouriteRecipes} from "../../../redux/actiontype/GeneralActionTypes";
import {AppState} from "../../../redux/store/Store";
import {RecipeOverview} from "../../../redux/reducer/GeneralReducer";

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
                <RecipesGrid recipes={props.favouriteRecipes} heading={""}/>

            </div>
        </div>
    )
}

export default connect(mapStateToProps,null)(FavouriteRecipes);
