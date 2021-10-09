import React from "react";
import {Route, useLocation} from "react-router-dom";
import "./Recipes.css";
import Create from "./create/Create";
import MineRecipes from "./minerecipes/MineRecipes";
import Recipe from "./recipes/Recipe";
import {Routes} from "../../util/Constants";


export function Recipes() {
    const location = useLocation();
    return (
        <div>
            <Route exact path={[Routes.MY_RECIPES, Routes.RECIPES]} component={MineRecipes}/>
            <Route exact path={Routes.CREATE_RECIPE} component={Create}/>
            <Route exact path={`${Routes.RECIPE}/:id`} component={Recipe}/>
        </div>
    )
}
