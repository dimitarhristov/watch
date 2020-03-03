import React from "react";

import { Switch, Route } from "react-router";

import { NotFound } from "../components/not-found";
import { Procmon } from "../components/procmon";
import { AutorunTable } from "../components/autorun/table";
import { AutorunDetails } from "../components/autorun/details";
import { Dashboard } from "../components/dashboard";

export default function Router() {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/procmon" component={Procmon} />
      <Route exact path="/autorun/:table/:id" component={AutorunDetails} />
      <Route exact path="/autorun/:table" component={AutorunTable} />
      <Route exact path="/async" component={NotFound} />
      <Route exact path="/pubsub" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}
