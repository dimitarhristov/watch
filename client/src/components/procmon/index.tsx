import React from "react";
import * as R from "ramda";
import { ProcDefType } from "../../../../server/db/definitions";
import G from "../../config/globals";
import { ProcdefCard } from "./card";

interface ProcsdefProps {
  serverId: string;
}
interface ProcsdefState {
  error: any;
  isLoaded: boolean;
  items: ProcDefType[];
}

export class Procmon extends React.Component<ProcsdefProps, ProcsdefState> {
  constructor(props: ProcsdefProps) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("/api/procmon")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  componentWillUnmount() {
    // clean up
  }

  cardsElements = (items: ProcDefType[]) => {
    const servers = R.keys(R.groupBy(i => i.CSERVERID, items));
    const cards = servers.map(serverId => {
      return (
        <div>
          <div>{serverId}</div>
          <div>
            {items.map(item => (
              <ProcdefCard item={item} dateFormat={G.dateTimeFormat} />
            ))}
          </div>
        </div>
      );
    });
    return cards;
  };

  render() {
    const { error, isLoaded, items } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    }
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return this.cardsElements(items);
    }
  }
}
