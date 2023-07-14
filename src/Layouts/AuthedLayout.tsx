import React from "react";
import CustomAppBar from "./CustomAppBar";
import { Box, Container, Toolbar } from "@mui/material";

export const AuthedLayout = (Page: React.FC<any>) => function AuthedLayout() {
    return (
        <>
            <CustomAppBar />
            <Container sx={{marginTop: '20px'}}>
                <Toolbar />
                <Page />
            </Container>
        </>
    )
}