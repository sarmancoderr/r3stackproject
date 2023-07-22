import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { Attention } from "@prisma/client";
import dayjs from 'dayjs';
import { ButtonActivator } from "../ButtonActivator";
import { api } from "~/utils/api";
import { AttentionEditor } from "./AttentionEditor";
import { useRouter } from "next/router";

const CLOSE_REMOVE_ATTENTION_MODAL_EVENT = 'closeRemoveAttentionModal'
const CLOSE_UPDATE_ATTENTION_MODAL_EVENT = 'closeUpdateAttentionModal'

export const AttentionItem: React.FC<{ attention: Attention }> = ({ attention }) => {
    const router = useRouter()
    const utils = api.useContext()
    const removeAttention = api.attentions.removeAttention.useMutation({
        onSuccess() {
            document.body.dispatchEvent(new CustomEvent(CLOSE_REMOVE_ATTENTION_MODAL_EVENT))
            utils.attentions.attentionsOfPartner.invalidate()
        }
    })
    const updateAttention = api.attentions.updateAttention.useMutation({
        onSuccess() {
            document.body.dispatchEvent(new CustomEvent(CLOSE_UPDATE_ATTENTION_MODAL_EVENT))
            utils.attentions.attentionsOfPartner.invalidate()
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
                    ContentButton={({ handleClose }) => {
                        document.body.addEventListener(CLOSE_UPDATE_ATTENTION_MODAL_EVENT, handleClose)
                        return (
                            <AttentionEditor
                                initialValues={attention}
                                handleSubmit={(input) => {
                                    updateAttention.mutate({
                                        ...input,
                                        dateAttention: dayjs(input.dateAttention).format('YYYY-MM-DD'),
                                        attentionId: attention.id
                                    })
                                }}
                            />
                        )
                    }}
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