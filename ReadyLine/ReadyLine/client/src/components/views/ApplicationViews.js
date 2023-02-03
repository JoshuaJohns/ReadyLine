import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ShopList from "../homePage/ShopList";
import ReportsList from "../shopPage/ReportsList";
import VehicleList from "../vehiclePage/VehicleList";
import Login from "./Login";
import Register from "./Register";



export default function ApplicationViews({ isLoggedIn }) {
    return (
        <main>
            <Routes>
                <Route path="/">
                    <Route
                        index
                        element={isLoggedIn ? <ShopList /> : <Navigate to="/login" />}
                    />
                    <Route path="vehicle">
                        <Route index element={<VehicleList />} />

                    </Route>
                    <Route path="report">
                        <Route index element={<ReportsList />} />

                    </Route>

                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    {/* <Route path="post/add" element={<PostForm />} />
                    <Route path="Category" element={<CategoryList />} />
                    <Route path="Category/add" element={<AddCategoryForm />} /> */}

                    <Route path="*" element={<p>Whoops, nothing here...</p>} />
                </Route>
            </Routes>
        </main>
    );
}