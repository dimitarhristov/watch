import express = require("express");
import url = require("url");

const router = express.Router();
import {
  ReadProcdefDbf,
  ReadX3AsyncWebRequestDbf,
  ReadEmaintautoDbf,
  ReadAutoschedDbf,
  ReadEmaintautoLogDbf,
  ReadProcStatDbf,
  ReadX3PublishChannelEventsDbf,
  ReadAutoX4ReportsDbf
} from "../db";
import { EmaintAutoType } from "../db/definitions";
import { getAutorunStatus } from "../src/api/components/autorun/functions";
import { getAsyncStatus } from "../src/api/components/async/functions";
import {
  serversList,
  isProcmonResponding
} from "../src/api/components/procdef/functions";
import {
  getAutoschedStat,
  countPendingAsync,
  countPendingPublishChannelEvents,
  getReportStat,
  getEmaintautoStat
} from "../src/common/functions";
import { ProcessInfo } from "../src/common/types";

// url.parse(req.url,true).query returns { foo: 'bad', baz: 'foo' }.
// url.parse(req.url,true).host returns 'localhost:8080'.
// url.parse(req.url,true).pathname returns '/app.js'.
// url.parse(req.url,true).search returns '?foo=bad&baz=foo'.

// GET process definitions, with ability to search by server ID

router.get("/dashboard", async (req, res) => {
  try {
    // card - ProcMon status
    // card - Async status
    // card - EmaintAuto status
    // card - Autosched status
    // card - Backup Status
    // card - Reports status
    // card - Publish Channels status
    const cards: ProcessInfo[] = [];

    const procdefList = await ReadProcdefDbf(0, 1000);

    // ProcMon - check if running on all APP servers
    const appServers = serversList(procdefList);

    appServers.map(serverId => {
      const procmon = procdefList.find(
        p => p.PROCNAME === "PROCMON" && p.CSERVERID === serverId
      );
      const isResponding = isProcmonResponding(procmon);
      cards.push({
        PNAME: `Proc Mon (${serverId})`,
        ERRORS: isResponding ? 0 : 1,
        PENDING: 0,
        DETAILSURL: `/procmon/${serverId}`
      });
    });

    // card - Report Scheduler
    const reportStats = await getReportStat();
    cards.push({
      PENDING: reportStats.PENDING,
      ERRORS: reportStats.ERROR,
      PNAME: `Report Scheduler`,
      DETAILSURL: `/autorun/reports`
    });

    // card - Auto Scheduler
    const schedulerStats = await getAutoschedStat();
    cards.push({
      PENDING: schedulerStats.PENDING,
      ERRORS: schedulerStats.ERROR,
      PNAME: `Auto Scheduler`,
      DETAILSURL: `/autorun/autosched`
    });

    // card - Clean up Tasks
    const emaintautoStats = await getEmaintautoStat();
    cards.push({
      PENDING: emaintautoStats.PENDING,
      ERRORS: emaintautoStats.ERROR,
      PNAME: `Clean up Tasks`,
      DETAILSURL: `/autorun/emaintauto`
    });

    // card - Back up Tasks
    cards.push({
      PENDING: 0, // TO DO
      PNAME: `Back up Tasks`,
      DETAILSURL: `/autorun/backup`
    });

    // card - Async Tasks
    cards.push({
      PENDING: await countPendingAsync(),
      PNAME: `Async Tasks`,
      DETAILSURL: `/async`
    });

    // card - Publish Channel Events
    cards.push({
      PENDING: await countPendingPublishChannelEvents(),
      PNAME: `Pub/Sub Events`,
      DETAILSURL: `/pubsub`
    });

    res.status(200).json(cards);
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});

router.get("/procmon", async (req, res) => {
  try {
    const recs = await ReadProcdefDbf(0, 1000);
    const serverId = url.parse(req.url, true).query["cserverid"];

    const output = !!serverId
      ? recs.filter(r => r.CSERVERID === serverId || r.CSERVERID.length == 0)
      : recs;

    res.status(200).json(output);
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});

router.get("/procmon/:id", async (req, res) => {
  try {
    const recs = await ReadProcdefDbf(0, 1000);
    const serverId = url.parse(req.url, true).query["cserverid"];

    const id = req.params.id;

    const recs2 = !!id ? recs.filter(r => r.PROCDEFID === id) : recs;

    const output = !!serverId
      ? recs2.filter(r => r.CSERVERID === serverId || r.CSERVERID.length == 0)
      : recs2;

    res.status(200).json(output);
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});

// GET all Processes running on all APP servers or selected APP server
router.get("/procstat", async (req, res) => {
  try {
    const recs = await ReadProcdefDbf(0, 1000);

    const serverId = url.parse(req.url, true).query["cserverid"];

    const output = !!serverId
      ? recs.filter(r => r.CSERVERID === serverId || r.CSERVERID.length == 0)
      : recs;

    res.status(200).json(output);
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});

// GET selected processes by ProdDefId
router.get("/procstat/:procdefid", async (req, res) => {
  try {
    const recs = await ReadProcdefDbf(0, 1000);

    const procdefid = req.params.procdefid;

    const output = !!procdefid
      ? recs.filter(r => r.PROCDEFID === procdefid)
      : recs;

    res.status(200).json(output);
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});

router.get("/async", async (req, res) => {
  try {
    const recs = await ReadX3AsyncWebRequestDbf(-200, 200); // last 200 async processes

    recs.map(r => (r.STATUS = getAsyncStatus(r)));

    res.status(200).json(recs);
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});

router.get("/pubsub", async (req, res) => {
  try {
    const recs = await ReadX3PublishChannelEventsDbf(-200, 200); // last 200 async processes

    recs.map(r => (r.STATUS = getAsyncStatus(r)));

    res.status(200).json(recs);
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});

router.get("/autorun/:table", async (req, res) => {
  try {
    const table = req.params.table;
    let fn: (startPos?: number, maxCount?: number) => Promise<EmaintAutoType[]>;
    switch (table.toLowerCase()) {
      case "autosched":
        fn = ReadAutoschedDbf;
        break;
      case "emaintauto":
        fn = ReadEmaintautoDbf;
        break;
      case "reports":
        fn = ReadAutoX4ReportsDbf;
        break;
      case "log":
        fn = ReadAutoX4ReportsDbf;
        break;
    }
    const recs = await fn(0, 0);

    const logs = await ReadEmaintautoLogDbf(-1000, 1000);
    const procs = await ReadProcStatDbf();
    recs.map(r => (r.STATUS = getAutorunStatus(r, logs, procs)));

    res.status(200).json(recs);
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});

router.get("/autorun/:table/:id", async (req, res) => {
  try {
    const table = req.params.table;
    const id = req.params.id;
    let fn: (startPos?: number, maxCount?: number) => Promise<EmaintAutoType[]>;
    switch (table.toLowerCase()) {
      case "autosched":
        fn = ReadAutoschedDbf;
        break;
      case "emaintauto":
        fn = ReadEmaintautoDbf;
        break;
      case "reports":
        fn = ReadAutoX4ReportsDbf;
        break;
    }
    const recs = await fn();

    const output = recs.find(r => r.CAUTOID === id);

    const logs = await ReadEmaintautoLogDbf(-1000, 1000);
    const procs = await ReadProcStatDbf();
    output.STATUS = getAutorunStatus(output, logs, procs);

    res.status(200).json(output);
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});

router.get("/emaintautolog", async (req, res) => {
  try {
    const logs = await ReadEmaintautoLogDbf(-1000, 1000);

    res.status(200).json(logs);
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});

export default router;
