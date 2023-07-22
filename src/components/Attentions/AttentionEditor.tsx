import { Button, Card, CardContent, Grid, TextField } from "@mui/material";
import { Attention } from "@prisma/client";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { DatePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from "dayjs";

type InputAttention = Omit<Attention, 'id'>

type AttentionEditorProps = {
    handleSubmit: (input: InputAttention) => void,
    initialValues?: InputAttention,
}

export const AttentionEditor: React.FC<AttentionEditorProps> = ({handleSubmit, initialValues}) => {
    const {handleSubmit: handleSubmitForm, register, setValue} = useForm<InputAttention>()

    const submitHandler: SubmitHandler<InputAttention> = (inputs) => {
        handleSubmit(inputs)
    }

    useEffect(() => {
        if (initialValues) {
            setValue('comment', initialValues.comment)
            setValue('dateAttention', initialValues.dateAttention)
        }
    }, [initialValues])

    return (
        <form onSubmit={handleSubmitForm(submitHandler)}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <DatePicker format="DD/M/YYYY" defaultValue={dayjs(initialValues?.dateAttention)} onChange={(val: any) => setValue('dateAttention', val.format('YYYY/MM/DD'))} />
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth label="Comentario de atención" multiline {...register('comment')} />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" type="submit">Enviar</Button>
                </Grid>
            </Grid>
        </form>
    )
}