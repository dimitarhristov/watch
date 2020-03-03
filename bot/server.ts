import axios from "axios";
import { ProcDefType } from "../server/db/definitions";
import {
  isProcMonAlive,
  getProcMonItems
} from "../client/src/components/procmon/functions";
import { post, buildSlackMessage } from "./integrations/slack/index";

// what to test?

/*
1. Is ProcMon running?
2. Are there service processes not started yet?
3. Scheduled autorun processes that have not started yet
4.
5.
*/

const IsProcMonRunning = function() {
  axios
    .get("http://localhost:9999/api/procmon")
    .then((response: any) => {
      const data: ProcDefType[] = response.data;
      const procmon = getProcMonItems(data);
      let serverIsWhereProcmonIsNotRunning = "";
      procmon.map(p => {
        const serverId = p.CSERVERID;

        if (!isProcMonAlive(data, serverId)) {
          serverIsWhereProcmonIsNotRunning += serverId + "";
        }
      });

      if (serverIsWhereProcmonIsNotRunning.length > 0) {
        const msg = buildSlackMessage(
          "ProcMon",
          true,
          "ProcMon is not running on " + serverIsWhereProcmonIsNotRunning,
          undefined,
          "High",
          serverIsWhereProcmonIsNotRunning
        );
        post(msg);

        console.log(
          `ProcMon is not runnin on ${serverIsWhereProcmonIsNotRunning}`
        );
      }
    })
    .catch((error: any) => {
      console.log(error);
    });
};

setInterval(IsProcMonRunning, 10000);
