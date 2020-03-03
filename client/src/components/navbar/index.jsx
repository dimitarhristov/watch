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
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">
        <img
          alt="eMaint"
          src="https://x46.emaint.com/graphics/emaint-favco-57x57.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{" "}
        eMaint Services Dashboard
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Servers" id="basic-nav-dropdown">
            <NavDropdown.Item href="/procmon">
              US - All Servers
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/procmon?cserverid=APP1">
              US - APP 1
            </NavDropdown.Item>
            <NavDropdown.Item href="/procmon?cserverid=APP2">
              US - APP 2
            </NavDropdown.Item>
            <NavDropdown.Item href="/procmon?cserverid=APP3">
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
