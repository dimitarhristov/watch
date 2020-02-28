import * as config from "../config/config";

export const WCONNECT = () => config.default.development.pathToWconnect;

export function DBFPATH(dbfName: string) {
  return WCONNECT() + dbfName;
}
