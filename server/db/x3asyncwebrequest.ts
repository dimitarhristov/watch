import { DBFFile } from "dbffile";

export async function Read() {
  const dbf = await DBFFile.open(
    "c:\\emaint\\dev\\x3_dev\\wconnect\\x3AsyncWebRequest.DBF"
  );
  console.log(dbf);
  console.log(`DBF file contains ${dbf.recordCount} records.`);
  console.log(`Field names: ${dbf.fields.map(f => f.name).join(", ")}`);
  const records = await dbf.readRecords(100, dbf.recordCount - 20);
  return records;
}

export interface ProcStatType {
  PID: string;
  PNAME: string;
  CMDLINE: string;
  START: Date;
  STATUS: string;
  PALIVE: boolean;
  PELAPSED: number;
  PKILLED: boolean;
}

export async function Append<ProcStatType>(records: ProcStatType[]) {
  const dbf = await DBFFile.open("C:\\eMaint\\ProcMon\\ProcMon\\procstat.dbf");
  dbf.appendRecords(records);
}
