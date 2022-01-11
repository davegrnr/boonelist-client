import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import CommentCard from "./CommentCard";
import { UserProvider } from "../../testUtils";
import { it } from "@jest/globals";

it("matches a snapshot", function () {
    let item = { commentText: "text", postedBy: "user" };
    const { asFragment } = render(
        <MemoryRouter initialEntries={[`sales/1`]}>
            <UserProvider>
            <CommentCard item={item}/>
            </UserProvider>
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });