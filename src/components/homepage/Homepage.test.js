import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import Homepage from "./Homepage";
import { UserProvider } from "../../testUtils";

it("matches snapshot", function () {
  const { asFragment } = render(
      <BrowserRouter>
        <UserProvider>
                <Homepage />
        </UserProvider>
      </BrowserRouter>

  );
  expect(asFragment()).toMatchSnapshot();
});
