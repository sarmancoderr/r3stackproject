/* eslint-disable @typescript-eslint/no-floating-promises */
import { Box, Button, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/router"
import { AuthedLayout } from "~/Layouts/AuthedLayout"
import { api } from "~/utils/api"

export default AuthedLayout(function Partners() {
    const {data, isSuccess} = api.partners.allPartners.useQuery()

    return (
        <>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant="h6" component={'h2'}>Listado de socios</Typography>
                <Button LinkComponent={Link} href="/partners/add" variant="contained">Agregar socio</Button>
            </Box>
            <List>
                {data?.map((p) => (
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