import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../components/homepage/Homepage"
import ServicesList from "../components/services/ServicesList";
import SalesList from "../components/sales/SalesList";
import NewSaleForm from "../components/sales/NewSaleForm";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import ProfileForm from "../components/profile/ProfileForm";
import SalesDetail from "../components/sales/SalesDetail";
import ServicesDetail from "../components/services/ServicesDetail";
import NewServiceForm from "../components/services/NewServiceForm";
import PrivateRoute from './PrivateRoute'

/**Site routes
 * 
 * Some routes are only visitable by logged in users.
 * Wrapped in <PrivateRoute> which uses an auth component.
 * 
 * Non-existent routes redirect to homepage
 */

function Routes({signup, login}) {
    return (
        <div className="pt-5">
            <Switch>

                <Route exact path="/">
                    <Homepage />
                </Route>

                <Route exact path="/signup">
                    <SignupForm signup={signup} />
                </Route>

                <Route exact path="/login">
                    <LoginForm login={login} />
                </Route>

                <PrivateRoute exact path="/profile">
                    <ProfileForm />
                </PrivateRoute>

                <PrivateRoute exact path="/services">
                    <ServicesList />
                </PrivateRoute>

                <PrivateRoute exact path="/services/new">
                    <NewServiceForm />
                </PrivateRoute>

                <PrivateRoute exact path="/services/:id">
                    <ServicesDetail />
                </PrivateRoute>

                <PrivateRoute exact path="/sales">
                    <SalesList />
                </PrivateRoute>

                <PrivateRoute exact path="/sales/new">
                    <NewSaleForm />
                </PrivateRoute>

                <PrivateRoute exact path="/sales/:id">
                    <SalesDetail />
                </PrivateRoute>

                <Redirect to="/" />

            </Switch>

        </div>
    )
}

export default Routes;