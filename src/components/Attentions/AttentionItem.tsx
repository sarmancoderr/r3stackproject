import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { Attention } from "@prisma/client";
import dayjs from 'dayjs';
import { ButtonActivator } from "../ButtonActivator";
import { api } from "~/utils/api";

const CLOSE_REMOVE_ATTENTION_MODAL_EVENT = 'closeRemoveAttentionModal'

export const AttentionItem: React.FC<{ attention: Attention }> = ({ attention }) => {
    const removeAttention = api.attentions.removeAttention.useMutation({
        onSuccess() {
            document.body.dispatchEvent(new CustomEvent(CLOSE_REMOVE_ATTENTION_MODAL_EVENT))
        }
    })

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
                    ContentButton={({ handleClose }) => {
                        document.body.addEventListener(CLOSE_REMOVE_ATTENTION_MODAL_EVENT, handleClose)
                        return (
                            <>
                                <Typography sx={{textAlign: "center"}}>¿De verdad que quieres eliminar la atencion?</Typography>
                                <Button sx={{marginRight: '10px'}} variant='contained' color="error" disableElevation
                                    onClick={() => removeAttention.mutate({attentionId: attention.id})}>
                                    Eliminar
                                </Button>

                                <Button variant='contained' disableElevation
                                    onClick={handleClose}>
                                    Cancelar
                                </Button>
                            </>
                        )
                    }}
                />
            </CardActions>
        </Card>
    )
}