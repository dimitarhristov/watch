import Moment from "moment";
import {
  faCheckCircle,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
import { ProcDefType } from "../../../../server/db/definitions";
import { toCurrentTimeZone } from "../../common/functions";

export const isAlive = (lastCheck: Date, validityFor: number = 60) =>
  Moment(toCurrentTimeZone(lastCheck))
    .add(validityFor, "s")
    .toDate()
    .valueOf() >
  Moment(Date.now())
    .toDate()
    .valueOf();

export const getProcMonItems = (items: ProcDefType[]) =>
  items.filter(r => r.PROCNAME === "PROCMON");

export const getProcMonItem = (items: ProcDefType[], serverId: string) =>
  items.find(r => r.PROCNAME === "PROCMON" && r.CSERVERID === serverId);

export const isProcMonAlive = (items: ProcDefType[], serverId: string) =>
  isAlive(getProcMonItem(items, serverId).LASTCHECK);

export const isProcMon = (item: ProcDefType) =>
  item && item.PROCNAME === "PROCMON";

export const cardIcon = (item: ProcDefType) =>
  isAlive(item.LASTCHECK) ? faCheckCircle : faTimesCircle;

export const cardColor = (item: ProcDefType) =>
  isAlive(item.LASTCHECK) ? "green" : "red";
