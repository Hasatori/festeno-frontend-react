import React from "react";
import {Route, useLocation} from "react-router-dom";
import "./Recipes.css";
import Create from "./create/Create";
import MineRecipes from "./minerecipes/MineRecipes";
import Recipe from "./recipes/Recipe";
import {Routes} from "../../util/Constants";
import {PrivateRoute} from "../user/PrivateRoute";
import Account from "../user/account/Account";
import {AppProps} from "../../index";


export function Recipes(appProps:AppProps) {
    const location = useLocation();
    return (
        <div>
            <PrivateRoute
                path={[Routes.MY_RECIPES, Routes.RECIPES]}
                {...{
                    authenticated: appProps.authenticated,
                    authenticationPath: Routes.LOGIN,
                    redirectPathOnAuthentication: Routes.MY_RECIPES
                }} exact={true}
                render={(props) => <MineRecipes/>}/>

            <PrivateRoute
                path={[Routes.CREATE_RECIPE]}
                {...{
                    authenticated: appProps.authenticated,
                    authenticationPath: Routes.LOGIN,
                    redirectPathOnAuthentication: Routes.CREATE_RECIPE
                }} exact={true}
                render={(props) => <Create/>}/>
        </div>
    )
}
