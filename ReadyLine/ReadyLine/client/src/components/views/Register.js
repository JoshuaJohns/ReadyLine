import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { register } from "../../models/authManager";
import { addUser } from "../../models/userManager";

export default function Register() {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();

    const [email, setEmail] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [jobTitle, setJobTitle] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const registerClick = (e) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            alert("Passwords don't match. Try Agin.");
        } else {
            const userProfile = {
                firstName,
                lastName,

                imageUrl,
                email,
                jobTitle

            };
            register(userProfile, password)

                .then(() => navigate("/"));
        }
    };

    return (
        <Form onSubmit={registerClick} className="Register_component">
            <div className="Register_spacing"><p className="New_User">New User Registry</p></div>
            <fieldset className="Register_fieldset">
                <FormGroup>
                    <Label htmlFor="firstName" className="firstName">First Name</Label>
                    <Input
                        id="firstName"
                        type="text"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="lastName" className="Register_fields">Last Name</Label>
                    <Input
                        id="lastName"
                        type="text"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="email" className="Register_fields">Email</Label>
                    <Input
                        id="email"
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="jobTitle" className="Register_fields">Job Title</Label>
                    <Input
                        id="jobTitle"
                        type="text"
                        onChange={(e) => setJobTitle(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="imageUrl" className="Register_fields">Profile Image URL</Label>
                    <Input
                        id="imageUrl"
                        type="text"
                        onChange={(e) => setImageUrl(e.target.value)}
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
                    <Label for="confirmPassword" className="Register_fields">Confirm Password</Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Button >Register</Button>
                </FormGroup>
            </fieldset>
        </Form>
    );
}
