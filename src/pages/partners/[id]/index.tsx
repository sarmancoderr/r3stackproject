import { Toolbar, Typography, TableContainer, Table, TableBody, Paper, Menu, MenuItem, Button, Box, Card, CardHeader, CardActions, CardContent, Dialog, DialogTitle, DialogContent, DialogContentText } from "@mui/material"
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useRouter } from "next/router"
import { useState } from "react";
import { AuthedLayout } from "~/Layouts/AuthedLayout"
import { ButtonActivator } from "~/components/ButtonActivator";
import { api } from "~/utils/api"

type Inputs = {
    name: string,
    surname: string,
    dni: string,
}

export default AuthedLayout(function ShowPartner() {
    const router = useRouter()
    const {isLoading, isError, error, data} = api.partners.getPartner.useQuery({id: router.query.id as string})
    const removePartner = api.partners.removePartner.useMutation({
        onSuccess() {
            router.push('/partners')
        }
    })

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (isError) {
        return <p>{error.message}</p>
    }
    
    return (
        <>
            <Card>
                <CardHeader title={`${data.name} ${data.surname}`} />
                <CardContent>
                    <TableContainer sx={{boxShadow: 'none'}} component={Paper}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>DNI</TableCell>
                                    <TableCell>{data.dni}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
                <CardActions sx={{display: 'flex', justifyContent: 'space-around'}}>
                    <Button onClick={() => router.push(`/partners/${router.query.id}/edit`)} disableElevation variant={'contained'}>Editar</Button>
                    <ButtonActivator
                        Activator={({handleOpen}) => <Button variant="contained" color="error" disableElevation onClick={() => handleOpen()}>Eliminar</Button>}
                        ContentButton={() => (
                            <>
                                <Typography sx={{textAlign: 'center'}} variant="h6">¿Estas seguro que deseas eliminar el socio?</Typography>
                                <Button color="error" onClick={() => {
                                    removePartner.mutate({
                                        id: router.query.id as string
                                    })
                                }}>Eliminar</Button>
                            </>
                        )}
                        />
                </CardActions>
            </Card>
        </>
    )
})