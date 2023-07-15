import { Toolbar, Typography, TableContainer, Table, TableBody, Paper, Menu, MenuItem, Button, Box, Card, CardHeader, CardActions, CardContent } from "@mui/material"
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useRouter } from "next/router"
import { useState } from "react";
import { AuthedLayout } from "~/Layouts/AuthedLayout"
import { api } from "~/utils/api"

type Inputs = {
    name: string,
    surname: string,
    dni: string,
}

export default AuthedLayout(function ShowPartner() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [partnerMenu, setPartnerMenu] = useState(false)
    const router = useRouter()
    console.log(router.query)
    const {isLoading, isError, error, data} = api.partners.getPartner.useQuery({id: router.query.id as string})

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
                    <Button disableElevation variant={'contained'}>Editar</Button>
                    <Button color={'error'} disableElevation variant={'contained'}>Eliminar</Button>
                </CardActions>
            </Card>
        </>
    )
})