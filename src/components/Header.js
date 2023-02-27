import React from "react";
import { NavbarBrand } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  return(
    <Navbar className="bg-slate-600 font-bold pl-4">
        <NavbarBrand href="/" className="text-yellow-600"><h2>Burrito Boys</h2></NavbarBrand>
        <Nav>
          <Nav.Link href="/" className="text-stone-100"><h5>Home</h5></Nav.Link>
          <Nav.Link href="/add-spot" className="text-stone-100"><h5>Add Spot</h5></Nav.Link>
          <Nav.Link href="/sign-in" className="text-stone-100"><h5>Sign In</h5></Nav.Link>
        </Nav>
      </Navbar>
  );
}

export default Header;