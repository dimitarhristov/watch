export interface ProcDefType {
  PROCDEFID: string;
  PROCNAME: string;
  CMDLINE: string;
  PROCMIN: number;
  PROCCOUNT: number;
  TASKDESC: string;
  LASTCHECK: Date;
  CSERVERID: string;
}

export interface ProcStatType {
  PROCDEFID: number;
  PID: string;
  PNAME: string;
  CMDLINE: string;
  START: Date;
  STATUS: string;
  PALIVE: boolean;
  PELAPSED: number;
  PKILLED: boolean;
}

export interface EmaintAutoType {
  CAUTOID: string;
  CDESCRIP: string;
  DLASTRUN: Date;
  DNEXTRUN: Date;
  NEVERY: number;
  CINTERVAL: string;
  CCODE: string;
  CRUNID: string;
}

export interface EmaintAutoLogType {
  CUID: string;
  TIMESTAMP: string;
  CAUTOID: string;
  CAUTODESC: Date;
  CPROGRAM: string;
  NLINENO: boolean;
  NERRNO: number;
  CERRORMSG: boolean;
  CCODE: string;
  CDETAILS: string;
  CRUNID: string;
}

export interface X3AsyncWebRequestType {
  TITLE: string;
  USERNAME: string;
  SUBMITTED: Date;
  STARTED: Date;
  COMPLETED: Date;
  STATUS: string;
  LERROR: boolean;
}

export interface X3PublishChannelEventsType {
  TITLE: string;
  USERNAME: string;
  SUBMITTED: Date;
  STARTED: Date;
  COMPLETED: Date;
  STATUS: string;
  LERROR: boolean;
}
