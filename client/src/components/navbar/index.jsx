import React from "react";
import {
  Navbar,
  NavDropdown,
  Form,
  Nav,
  FormControl,
  Button
} from "react-bootstrap";

export default function MyNavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/procsdef">Dashboard</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Servers" id="basic-nav-dropdown">
            <NavDropdown.Item href="/procsdef">
              US - All Servers
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/procsdef?cserverid=APP1">
              US - APP 1
            </NavDropdown.Item>
            <NavDropdown.Item href="/procsdef?cserverid=APP2">
              US - APP 2
            </NavDropdown.Item>
            <NavDropdown.Item href="/procsdef?cserverid=APP3">
              US - APP 3
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}
