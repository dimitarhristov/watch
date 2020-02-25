import express = require("express");
const router = express.Router();

import { Append as AppendProcStat, Read, ProcStatType } from "../db/procstat";
import { Read as ReadX3AsyncWebRequest } from "../db/x3asyncwebrequest";

/* router.get("/procs", async (req, res) => {
  try {
    const recs = await AppendProcStat<ProcStatType>([
      {
        PID: "999999",
        PNAME: "AUTORUN.EXE",
        CMDLINE: 'D:\\wconnect\\autorun.exe "AUTO_XXBACKUP.ini"',
        START: new Date("2020-02-20T11:20:23.000Z"),
        STATUS: "UNDEFINED",
        PALIVE: true,
        PELAPSED: 319453,
        PKILLED: false
      }
    ]);
    res.status(200).json(recs);
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
}); */

router.get("/procs", async (req, res) => {
  try {
    const recs = await Read();
    res.status(200).json(recs);
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});

router.get("/async", async (req, res) => {
  try {
    const recs = await ReadX3AsyncWebRequest();
    res.status(200).json(recs);
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});

export default router;
