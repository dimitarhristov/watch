import React from "react";

import { Switch, Route } from "react-router";

import { ProcList } from "../components/proc-list";
import { NotFound } from "../components/not-found";

export default function Router() {
  return (
    <Switch>
      <Route path="/aaa" component={ProcList} />
      <Route component={NotFound} />
    </Switch>
  );
}
