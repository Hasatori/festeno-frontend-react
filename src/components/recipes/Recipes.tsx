import React from "react";
import {Route, useLocation} from "react-router-dom";
import "./Recipes.css";
import Create from "./create/Create";
import MineRecipes from "./minerecipes/MineRecipes";


export function Recipes() {
    const location = useLocation();
    console.log(location);
    return (
        <div>
            <Route exact path={["/recipes/mine-recipes", "/recipes"]} component={MineRecipes}/>
            <Route exact path={"/recipes/create"} component={Create}/>
        </div>
    )
}
