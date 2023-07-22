import React, { PropsWithChildren, ReactNode } from 'react'
import { Button, Card, CardContent, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useState } from "react";

type ButtonActivatorProps = {
    ContentButton: React.FC<{handleClose: () => void}>,
    Activator: React.FC<{handleOpen: () => void}>
}

export const ButtonActivator: React.FC<ButtonActivatorProps> = ({Activator, ContentButton}) => {
    const [active, setActive] = useState(false)



    return (
        <>
            <Activator handleOpen={() => {setActive(true)}} />
            <Dialog open={active}>
                <DialogTitle>
                    <DialogContent>
                        <ContentButton handleClose={() => setActive(false)} />
                    </DialogContent>
                </DialogTitle>
            </Dialog>
        </>
    )
}