/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { AuthedLayout } from "~/Layouts/AuthedLayout"
import { useForm, type SubmitHandler } from "react-hook-form"
import { api } from "~/utils/api"
import { useRouter } from "next/router"
import { Alert, Backdrop, Box, Button, CircularProgress, Grid, TextField, Typography } from "@mui/material"
import Head from "next/head"

type Inputs = {
    name: string,
    surname: string,
    dni: string,
}

export default AuthedLayout(function AddPartner() {
    const router = useRouter()

    const {mutate, isLoading, isError, error} = api.partners.addPartner.useMutation({
        onSuccess() {
            router.push('/partners')
        }
    })

    const {
        register,
        handleSubmit,
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log('MUTANDO', data)
        mutate({
            ...data
        })
    }

    return (
        <>
            <Head>
                <title>Añadir socio | Registros</title>
            </Head>
            {isError && <Alert severity="error">{error.message}</Alert>}
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography variant="h6" component={'h2'}>Añadir socio</Typography>
            </Box>
            <Box sx={{flexGrow: 1}} component={'form'} onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={24}>
                        <TextField fullWidth {...register('name')} label="Nombre" />
                    </Grid>
                    <Grid item xs={24}>
                        <TextField fullWidth {...register('surname')} label="Apellidos" />
                    </Grid>
                    <Grid item xs={24}>
                        <TextField fullWidth {...register('dni')} label="DNI" />
                    </Grid>
                    <Grid item xs={24}>
                        <Box sx={{justifyContent: 'flex-end', display: 'flex'}}>
                            <Button type="submit" variant="contained">Guardar socio</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
})