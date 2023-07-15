import React from "react";
import CustomAppBar from "./CustomAppBar";
import { Button, Card, CardContent, CardHeader, Container, Toolbar, Typography } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
export const AuthedLayout = (Page: React.FC<any>) => function AuthedLayout() {
    const ctx = useSession()
    console.log(ctx)

    if (ctx.status !== 'authenticated') {
        return (
            <Container sx={{marginTop: '20px'}}>
                <Card>
                    <CardHeader title="No estás autorizado a ver esta página" />
                    <CardContent>
                        <Button onClick={() => {signIn()}}>Iniciar sesión</Button>
                    </CardContent>
                </Card>
            </Container>
        )
    }

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