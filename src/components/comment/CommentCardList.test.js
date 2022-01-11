import React from "react";
import { render } from "@testing-library/react";
import Comments from "./CommentCardList";

it("matches snapshot", function () {
  const { asFragment } = render(<Comments comments={[]}/>);
  expect(asFragment()).toMatchSnapshot();
});
