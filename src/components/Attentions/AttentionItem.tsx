import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { Attention } from "@prisma/client";
import dayjs from 'dayjs';
import { ButtonActivator } from "../ButtonActivator";

export const AttentionItem: React.FC<{ attention: Attention }> = ({ attention }) => {
    return (
        <Card>
            <CardContent>
                <Typography variant={'h5'}>{dayjs(attention.dateAttention).format('DD/MM/YYYY')}</Typography>
                <Typography>{attention.comment}</Typography>
            </CardContent>
            <CardActions>
                <ButtonActivator
                    Activator={({ handleOpen }) => <Button onClick={handleOpen} disableElevation variant="contained">Editar</Button>}
                    ContentButton={({ handleClose }) => (
                        <>
                            <Typography>Contenido del modal</Typography>
                            <Button onClick={handleClose}>Cerrar</Button>
                        </>
                    )}
                />
                <ButtonActivator
                    Activator={({ handleOpen }) => <Button onClick={handleOpen} disableElevation variant="contained" color="error">Eliminar</Button>}
                    ContentButton={({ handleClose }) => (
                        <>
                            <Typography>Contenido del modal</Typography>
                            <Button onClick={handleClose}>Cerrar</Button>
                        </>
                    )}
                />
            </CardActions>
        </Card>
    )
}