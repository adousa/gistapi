import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { Provider } from "react-redux";

import App from "../App";
import configureStore from "../state/store";

// gistPublicDataExample contains testing response from server
import gistPublicDataExample from "./gistPublicData.json";

// searchResponseExample contains testing response when searching for a user
import searchResponseExample from "./searchResponse.json";

const server = setupServer(
  rest.get("https://api.github.com/gists/public", (req, res, ctx) => {
    return res(ctx.json(gistPublicDataExample));
  }),
  rest.get("https://api.github.com/users/saeed/gists", (req, res, ctx) => {
    return res(ctx.json(searchResponseExample));
  }),
  rest.get("https://api.github.com/users/saeederror/gists", (req, res, ctx) => {
    return res(ctx.status(500));
  })
);

test("Load gist public data on startup", async () => {
  server.listen();
  const appComponent = render(
    <Provider store={configureStore()}>
      <App />
    </Provider>
  );
  await waitFor(() => screen.getByText("Created on Skills Network Labs"));
  const gistItems = appComponent.getAllByRole("gist-item");
  expect(gistItems.length).toEqual(3);
  expect(appComponent.getByText("Created on Skills Network Labs")).toBeTruthy();
});

test("Searching by username", async () => {
  server.listen();
  const appComponent = render(
    <Provider store={configureStore()}>
      <App />
    </Provider>
  );
  await waitFor(() => screen.getByText("Created on Skills Network Labs"));
  const input = screen.getByPlaceholderText("Search Gists for the username");
  fireEvent.change(input, { target: { value: "saeed" } });

  // increased the timeout because of the debounce feature added to the sagas
  await waitFor(() => screen.getByText("Created by saeed"), { timeout: 1200 });

  expect(appComponent.getByText("Created by saeed")).toBeTruthy();
});

test("Handling username search errors", async () => {
  server.listen();
  const appComponent = render(
    <Provider store={configureStore()}>
      <App />
    </Provider>
  );
  await waitFor(() => screen.getByText("Created on Skills Network Labs"));
  const input = screen.getByPlaceholderText("Search Gists for the username");
  fireEvent.change(input, { target: { value: "saeederror" } });

  // increased the timeout because of the debounce feature added to the sagas
  await waitFor(() => screen.getByText("Sorry, we couldn't find any result"), {
    timeout: 1200,
  });

  expect(
    appComponent.getByText("Sorry, we couldn't find any result")
  ).toBeTruthy();
});
