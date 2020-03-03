import React from "react";
import Moment from "react-moment";
import Table from "react-bootstrap/Table";
import { EmaintAutoType } from "../../../../server/db/definitions";
import G from "../../config/globals";
import { properCase } from "../../common/functions";
import { Record, getStatusIcon, getInterval } from "./functions";

interface AutorunDetailsProps {
  match: {
    params: {
      table: string;
      id: string;
    };
  };
}

export class AutorunDetails extends React.Component<
  AutorunDetailsProps,
  Record<EmaintAutoType>
> {
  constructor(props: AutorunDetailsProps) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      item: null
    };
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;

    fetch(`/api/autorun/${params.table}/${params.id}`)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            item: result
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

  render() {
    const { error, isLoaded, item } = this.state;
    const {
      match: { params }
    } = this.props;

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <React.Fragment>
          <Table striped bordered hover responsive>
            <colgroup>
              <col width="300px"></col>
              <col width="*"></col>
            </colgroup>
            <tr>
              <td>Status</td>
              <td>
                {getStatusIcon(item.STATUS)} {properCase(item.STATUS)}
              </td>
            </tr>
            <tr>
              <td>Process ID</td>
              <td>{item.CAUTOID}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{item.CDESCRIP}</td>
            </tr>
            <tr>
              <td>Last Run</td>
              <td>
                <Moment format={G.dateTimeFormat}>{item.DLASTRUN}</Moment>
              </td>
            </tr>
            <tr>
              <td>Next Run</td>
              <td>
                <Moment format={G.dateTimeFormat}>{item.DNEXTRUN}</Moment>
              </td>
            </tr>
            <tr>
              <td>Run Interval</td>
              <td>{getInterval(item.NEVERY, item.CINTERVAL)}</td>
            </tr>
            <tr>
              <td>Command Line</td>
              <td>{item.CCODE}</td>
            </tr>
          </Table>
        </React.Fragment>
      );
    }
  }
}
