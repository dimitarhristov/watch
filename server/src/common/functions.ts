import Moment from "moment";
import * as R from "ramda";
import { toCurrentTimeZone } from "../../../client/src/common/functions";
import {
  ReadAutoX4ReportsDbf,
  ReadEmaintautoDbf,
  ReadX3AsyncWebRequestDbf,
  ReadAutoschedDbf,
  ReadX3PublishChannelEventsDbf,
  ReadEmaintautoLogDbf,
  ReadProcStatDbf
} from "../../db";

import { getAsyncStatus } from "../api/components/async/functions";
import { getAutorunStatus } from "../api/components/autorun/functions";

const isOlderThan = (date: Date, seconds: number) =>
  Moment(toCurrentTimeZone(date))
    .add(seconds, "s")
    .toDate()
    .valueOf() <
  Moment(Date.now())
    .toDate()
    .valueOf();

const isFutureDate = (date: Date) =>
  Moment(toCurrentTimeZone(date))
    .toDate()
    .valueOf() >
  Moment(Date.now())
    .toDate()
    .valueOf();

export const NOW = new Date();

export const isOneMinAgo = (date: Date) => !date || isOlderThan(date, 60);
export const isFiveMinAgo = (date: Date) => !date || isOlderThan(date, 300);
export const isPastDate = (date: Date) => !date || isOlderThan(date, 1);

export const getReportStat = async () => {
  const allReports = await ReadAutoX4ReportsDbf(0, 100000);
  const logs = await ReadEmaintautoLogDbf(-1000, 1000);
  const procs = await ReadProcStatDbf();

  return R.countBy(r => {
    return getAutorunStatus(r, logs, procs);
  }, allReports);
};

export const getEmaintautoStat = async () => {
  const allAutos = await ReadEmaintautoDbf(0, 100000);
  const logs = await ReadEmaintautoLogDbf(-1000, 1000);
  const procs = await ReadProcStatDbf();
  return R.countBy(r => {
    return getAutorunStatus(r, logs, procs);
  }, allAutos);
};

export const getAutoschedStat = async () => {
  const allAutos = await ReadAutoschedDbf(0, 100000);
  const logs = await ReadEmaintautoLogDbf(-1000, 1000);
  const procs = await ReadProcStatDbf();
  return R.countBy(r => {
    return getAutorunStatus(r, logs, procs);
  }, allAutos);
};

export const countPendingAsync = async () => {
  const allAsync = await ReadX3AsyncWebRequestDbf(-100, 100); // get last 100 async processes

  return R.countBy(r => {
    if (getAsyncStatus(r) === "PENDING") return "P";
    else return "S";
  }, allAsync).P;
};

export const countPendingPublishChannelEvents = async () => {
  const allEvents = await ReadX3PublishChannelEventsDbf(-100, 100); // get last 100 async processes

  return R.countBy(r => {
    if (getAsyncStatus(r) === "PENDING") return "P";
    else return "S";
  }, allEvents).P;
};
