import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProcDefType } from "../../../../server/db/definitions";
import { isAlive, cardColor, cardIcon } from "./functions";

interface PropType {
  item: ProcDefType;
  dateFormat: string;
}

export const ProcdefCard = ({ item, dateFormat }: PropType) => {
  return (
    <Card style={{ width: "18rem" }} className="float-left m-1">
      <Card.Body>
        <Card.Title>
          <FontAwesomeIcon
            icon={cardIcon(item)}
            color={cardColor(item)}
            size="lg"
          />
          &nbsp;
          {item.TASKDESC}
        </Card.Title>
        <Card.Text>{item.PROCNAME}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>
          <b>
            {item.PROCCOUNT} / {item.PROCMIN}
          </b>
          &nbsp; running tasks
        </ListGroupItem>
        <ListGroupItem>
          Last check:
          <Moment format={dateFormat}>{item.LASTCHECK}</Moment> Is Alive?
          {isAlive(item.LASTCHECK, 60) ? "Yes" : "No"}
        </ListGroupItem>
      </ListGroup>
      <Card.Body>
        <Card.Link href={"procdef/" + item.PROCDEFID}>Details</Card.Link>
      </Card.Body>
    </Card>
  );
};
