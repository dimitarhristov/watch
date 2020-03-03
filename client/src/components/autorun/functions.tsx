import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faExclamationTriangle,
  faCheckCircle,
  faTimesCircle,
  faQuestionCircle,
  faBan
} from "@fortawesome/free-solid-svg-icons";

interface PageState {
  error: any;
  isLoaded: boolean;
}

export interface Record<T> extends PageState {
  item: T;
}

export interface List<T> extends PageState {
  items: T[];
}

export const getInterval = (nEvery: number, cInterval: string) => {
  switch (cInterval) {
    case "MIN":
      return nEvery + " min" + (nEvery > 1 ? "s" : "");
    case "HRS":
      return nEvery + " hour" + (nEvery > 1 ? "s" : "");
    case "DAYS":
      return nEvery + " day" + (nEvery > 1 ? "s" : "");
    case "MONTH":
      return nEvery + " month" + (nEvery > 1 ? "s" : "");
    default:
      return nEvery + " " + cInterval;
  }
};

export const getStatusIcon = (status: string) => {
  switch (status) {
    case "RUNNING":
      return <FontAwesomeIcon icon={faCog} spin size="lg" color="blue" />;
      break;
    case "PENDING":
      return (
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          color=" #FFBF00"
          title="Pending"
          size="lg"
        />
      );
      break;
    case "SUCCESS":
      return <FontAwesomeIcon icon={faCheckCircle} color="green" size="lg" />;
      break;
    case "ERROR":
      return <FontAwesomeIcon icon={faTimesCircle} color="red" size="lg" />;
      break;
    case "STALLED":
      return <FontAwesomeIcon icon={faBan} color="red" size="lg" />;
      break;
    case "UNKNOWN":
      return <FontAwesomeIcon icon={faQuestionCircle} color="grey" size="lg" />;
      break;
    default:
      return <FontAwesomeIcon icon={faQuestionCircle} size="lg" />;
      break;
  }
};
