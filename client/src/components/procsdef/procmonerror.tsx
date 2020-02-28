import React from "react";
import { Jumbotron } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { ProcDefType } from "../../../../server/db/definitions";

interface PropType {
  item: ProcDefType;
  dateFormat: string;
}

export const ProcmonError = ({ item, dateFormat }: PropType) => {
  return (
    <Jumbotron>
      <h1 className="text-danger">
        <FontAwesomeIcon icon={faTimesCircle} />
        &nbsp; ProcMon is not running!
      </h1>
      <p>
        Please start ProcMon and then refresh this page. ProcMon monitors all
        the service applications.
      </p>
    </Jumbotron>
  );
};
