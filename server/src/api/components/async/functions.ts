import { X3AsyncWebRequestType, AsyncStatus } from "../../../../db/definitions";
import { isFiveMinAgo, NOW } from "../../../common/functions";

export function getAsyncStatus(item: X3AsyncWebRequestType): AsyncStatus {
  if (!!item.COMPLETED && !item.LERROR) return "COMPLETED";
  if (!!item.COMPLETED && item.LERROR) return "ERROR";
  if (!!item.STARTED && item.STARTED < NOW) return "STARTED";
  if (!!item.STARTED && isFiveMinAgo(item.STARTED)) return "STALLED";
  if (!!item.SUBMITTED && item.SUBMITTED) return "PENDING";
  return "UNKNOWN";
}
