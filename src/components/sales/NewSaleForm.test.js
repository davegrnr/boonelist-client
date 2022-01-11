import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import NewSaleForm from "./NewSaleForm";
import { UserProvider } from "../../testUtils";

jest.mock('./NewSaleForm', () => () => <div>Mock New Sale Form</div>)

it("matches snapshot", function () {
    const { asFragment } = render(
        <BrowserRouter>
            <UserProvider>
                    <NewSaleForm />
            </UserProvider>
        </BrowserRouter>

    );
expect(asFragment()).toMatchSnapshot();
});
