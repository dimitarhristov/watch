import { DBFFile } from "dbffile";
import { mapAccum } from "../../../client/node_modules/@types/ramda";

export const Read = <T>(dbfFile: string) => async (
  startPos: number = 0,
  maxCount: number = 100
) => {
  const dbf = await DBFFile.open(dbfFile);
  if (startPos < 0) startPos = dbf.recordCount + startPos;
  if (startPos < 0) startPos = 0;
  if (maxCount === 0) maxCount = dbf.recordCount - startPos;
  const records = await (await DBFFile.open(dbfFile)).readRecords<T>(
    maxCount,
    startPos
  );
  return records;
  /*console.log(dbf);
  console.log(`DBF file contains ${dbf.recordCount} records.`);
  console.log(`Field names: ${dbf.fields.map(f => f.name).join(", ")}`);
  const records = await dbf.readRecords(maxCount, startPos);
  return records;*/
};

export const Append = async <T>(dbfFile: string) => async (records: T[]) => {
  const dbf = await DBFFile.open(dbfFile);
  dbf.appendRecords(records);
};
