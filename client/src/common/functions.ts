import React from "react";
import Moment from "moment";
import G from "../config/globals";

export const clientZoneOffset = Moment.parseZone(new Date()).utcOffset();
export const toCurrentTimeZone = (date: Date) =>
  Moment(date).add(-G.serverZoneOffset + clientZoneOffset, "minutes");
