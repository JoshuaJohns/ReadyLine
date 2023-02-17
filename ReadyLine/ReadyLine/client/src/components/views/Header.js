import React, { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from "reactstrap";
import { logout } from "../../models/authManager";
import "./Views.css"


export default function Header({ isLoggedIn }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);


    return (
        <div>
            <Navbar className="navbar" light expand="md">
                <img className="Logo" src="/images/Ready-Line.Logo.PNG" alt="image"></img>
                <NavbarBrand className="navBrand" tag={RRNavLink} to="/">
                    Ready Line
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        {/* When isLoggedIn === true, we will render the Home link */}
                        {isLoggedIn && (
                            <>
                                <NavItem >
                                    <NavLink className="navLink" tag={RRNavLink} to="/">
                                        Home
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink className="navLink" tag={RRNavLink} to="vehicle">
                                        Vehicles
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="navLink" tag={RRNavLink} to="report">
                                        Shop
                                    </NavLink>
                                </NavItem>


                            </>
                        )}
                    </Nav>




                    <Nav navbar>
                        {isLoggedIn && (
                            <>
                                <NavItem className="navLink" >
                                    <NavLink
                                        aria-current="page"
                                        tag={RRNavLink} to="/login"
                                        className="nav-link"
                                        style={{ cursor: "pointer" }}
                                        onClick={logout}


                                    >
                                        Logout
                                    </NavLink>
                                </NavItem>
                            </>
                        )}
                        {!isLoggedIn && (
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/login">
                                        Login
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/register">
                                        Register
                                    </NavLink>
                                </NavItem>
                            </>
                        )}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}
