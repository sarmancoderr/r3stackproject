/* eslint-disable @typescript-eslint/no-floating-promises */
import { Alert, Box, Button, CircularProgress, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/router"
import { AuthedLayout } from "~/Layouts/AuthedLayout"
import { api } from "~/utils/api"

export default AuthedLayout(function Partners() {
    const {data, isLoading, isError, error} = api.partners.allPartners.useQuery()

    if (isLoading) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <CircularProgress />
            </Box>
        )
    }

    if (isError) {
        return (
            <Alert severity="error">{error.shape?.code} {error.message}</Alert>
        )
    }

    return (
        <>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant="h6" component={'h2'}>Listado de socios</Typography>
                <Button LinkComponent={Link} href="/partners/add" variant="contained">Agregar socio</Button>
            </Box>
            <List>
                {data.map((p) => (
                    <ListItem key={p.id} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={`${p.name}`} secondary={p.surname} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </>
    )
})