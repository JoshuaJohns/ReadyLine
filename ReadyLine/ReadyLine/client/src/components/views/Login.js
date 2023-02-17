import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../models/authManager";
import "./Views.css"

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const loginSubmit = (e) => {
        e.preventDefault();
        login(email, password)
            .then(() => navigate("/"))
            .catch(() => alert("Invalid email or password"));
    };

    return (
        <div className="login-container">

            <div></div>
            <div className="login">
                <Form onSubmit={loginSubmit} >
                    <fieldset>
                        <FormGroup>
                            <Label for="email" className="Register_fields">Email</Label>
                            <Input
                                id="email"
                                type="text"
                                autoFocus
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password" className="Register_fields">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Button className="login_button">Login</Button>
                        </FormGroup>
                        <em>
                            Not registered? <Link to="/register">Register</Link>
                        </em>
                    </fieldset>
                </Form>
            </div>
            <div></div>
        </div>
    );
}