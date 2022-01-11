import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import SalesCard from "./SalesCard";
import { UserProvider } from "../../testUtils";
import { useAlert } from "react-alert";

jest.mock('./SalesCard', () => () => <div>Mock Sales Card</div>)

it("matches snapshot", function () {
    const { asFragment } = render(
        <BrowserRouter>
            <UserProvider>
                    <SalesCard useAlert={useAlert}/>
            </UserProvider>
        </BrowserRouter>

    );
expect(asFragment()).toMatchSnapshot();
});
