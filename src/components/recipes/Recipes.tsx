import React from "react";
import {Route, useLocation} from "react-router-dom";
import "./Recipes.css";
import Create from "./create/Create";
import MineRecipes from "./minerecipes/MineRecipes";
import Recipe from "./recipes/Recipe";


export function Recipes() {
    const location = useLocation();
    return (
        <div>
            <Route exact path={["/recipes/mine-recipes", "/recipes"]} component={MineRecipes}/>
            <Route exact path={"/recipes/create"} component={Create}/>
            <Route exact path={"/recipes/recipe/:id"} component={Recipe}/>
        </div>
    )
}
