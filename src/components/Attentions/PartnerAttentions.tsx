import { useRouter } from "next/router";
import { Box, Button, Typography, Card, CardContent, CardActionArea, CardActions } from "@mui/material";
import { ButtonActivator } from "../ButtonActivator";
import { AttentionEditor } from "./AttentionEditor";
import { api } from "~/utils/api";
import dayjs from 'dayjs'
import { AttentionItem } from "./AttentionItem";

export default function PartnerAttentions () {
    const router = useRouter()

    const attentionCreation = api.attentions.createAttention.useMutation()
    const attentionList = api.attentions.attentionsOfPartner.useQuery({
        partnerId: router.query.id as string
    })

    if (attentionList.isLoading) {
        return (
            <Typography>Cargando atenciones...</Typography>
        )
    }

    if (attentionList.isError) {
        return (
            <Typography>{attentionList.error.message}</Typography>
        )
    }

    return (
        <>
            <Box sx={{display: 'flex', justifyContent: 'space-between', marginTop: '20px', alignItems: 'center'}}>
                <Typography variant="h6">Listado de atenciones</Typography>
                <ButtonActivator
                    Activator={({handleOpen}) => <Button variant="contained" onClick={() => {handleOpen()}}>Añadir</Button>}
                    ContentButton={({handleClose}) => (
                        <AttentionEditor
                            handleSubmit={(input) => {
                                attentionCreation.mutate({
                                    ...input,
                                    // @ts-ignore
                                    dateAttention: input.dateAttention,
                                    partnerId: router.query.id as string
                                })
                                handleClose()
                            }}
                        />
                    )}
                />
            </Box>
            <Box sx={{marginTop: '20px'}}>
                {attentionList.data.map((a) => <AttentionItem attention={a} key={a.id} />)}
            </Box>
        </>
    )
}