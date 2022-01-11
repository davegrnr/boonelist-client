import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import ProfileForm from "./ProfileForm";
import { UserProvider } from "../../testUtils";

it("matches snapshot", function () {
  const { asFragment } = render(
      <BrowserRouter>
        <UserProvider>
                <ProfileForm />
        </UserProvider>
      </BrowserRouter>

  );
  expect(asFragment()).toMatchSnapshot();
});
