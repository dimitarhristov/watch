import React from "react";

import { Switch, Route } from "react-router";

import { NotFound } from "../components/not-found";
import { Procsdef } from "../components/procsdef";
import { AutorunTable } from "../components/autorun/table";
import { AutorunDetails } from "../components/autorun/details";

export default function Router() {
  return (
    <Switch>
      <Route path="/procsdef" component={Procsdef} />
      <Route exact path="/autorun/:table/:id" component={AutorunDetails} />
      <Route exact path="/autorun/:table" component={AutorunTable} />
      <Route component={NotFound} />
    </Switch>
  );
}
