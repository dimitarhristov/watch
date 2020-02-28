import express = require("express");
import url = require("url");

const router = express.Router();
import {
  ReadProcdefDbf,
  ReadX3AsyncWebRequestDbf,
  ReadEmaintautoDbf,
  ReadAutoschedDbf
} from "../db";
import { EmaintAutoType } from "../db/definitions";

// url.parse(req.url,true).query returns { foo: 'bad', baz: 'foo' }.
// url.parse(req.url,true).host returns 'localhost:8080'.
// url.parse(req.url,true).pathname returns '/app.js'.
// url.parse(req.url,true).search returns '?foo=bad&baz=foo'.

// GET process definitions, with ability to search by server ID
router.get("/procsdef", async (req, res) => {
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

router.get("/procsdef/:id", async (req, res) => {
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
    const recs = await ReadX3AsyncWebRequestDbf();
    res.status(200).json(recs.filter(r => !!r.COMPLETED));
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
        fn = ReadEmaintautoDbf;
        break;
      case "emaintauto":
        fn = ReadAutoschedDbf;
        break;
    }
    const recs = await fn();

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
    console.log("reached");
    const table = req.params.table;
    const id = req.params.id;
    let fn: (startPos?: number, maxCount?: number) => Promise<EmaintAutoType[]>;
    switch (table.toLowerCase()) {
      case "autosched":
        fn = ReadEmaintautoDbf;
        break;
      case "emaintauto":
        fn = ReadAutoschedDbf;
        break;
    }
    const recs = await fn();

    const output = !!id ? recs.find(r => r.CAUTOID === id) : recs;

    res.status(200).json(output);
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});

export default router;
