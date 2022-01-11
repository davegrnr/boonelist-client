import React from "react";
import { render } from "@testing-library/react";
import NewCommentForm from "./NewCommentForm";
import { UserProvider } from "../../testUtils";

it("matches snapshot", function () {
  const { asFragment } = render(
      <UserProvider>
            <NewCommentForm />
      </UserProvider>

  );
  expect(asFragment()).toMatchSnapshot();
});
