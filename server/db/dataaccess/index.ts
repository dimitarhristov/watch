import { DBFFile } from "dbffile";

export const Read = <T>(dbfFile: string) => async (
  startPos: number = 0,
  maxCount: number = 100
) => {
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
