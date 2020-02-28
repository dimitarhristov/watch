import React from "react";
import * as R from "ramda";
import { ProcDefType } from "../../../../server/db/definitions";
import G from "../../config/globals";
import { ProcdefCard } from "./card";
import { isProcMonAlive, getProcMonItem } from "./functions";
import { ProcmonError } from "./procmonerror";

interface ProcsdefProps {
  serverId: string;
}
interface ProcsdefState {
  error: any;
  isLoaded: boolean;
  items: ProcDefType[];
}

export class Procsdef extends React.Component<ProcsdefProps, ProcsdefState> {
  constructor(props: ProcsdefProps) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("/dashboard/procsdef")
      .then(res => res.json())
      .then(
        result => {
          console.log(result);
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
    const ccc = R.groupBy(i => i.CSERVERID, items);
    console.log(ccc);
    const servers = R.keys(R.groupBy(i => i.CSERVERID, items));
    console.log(items);
    console.log(servers);
    const cards = servers.map(serverId => {
      return (
        <div>
          <div>{serverId}</div>
          <div>
            {isProcMonAlive(items, serverId.toString()) ? (
              items.map(item => (
                <ProcdefCard item={item} dateFormat={G.dateTimeFormat} />
              ))
            ) : (
              <ProcmonError
                item={getProcMonItem(items, serverId.toString())}
                dateFormat={G.dateTimeFormat}
              />
            )}
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
