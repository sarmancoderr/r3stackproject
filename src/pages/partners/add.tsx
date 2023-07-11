/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { AuthedLayout } from "~/Layouts/AuthedLayout"
import { useForm, type SubmitHandler } from "react-hook-form"
import { api } from "~/utils/api"
import { useRouter } from "next/router"

type Inputs = {
    name: string,
    surname: string,
    dni: string,
}

export default AuthedLayout(function AddPartner() {
    const router = useRouter()

    const {mutate, isLoading} = api.partners.addPartner.useMutation({
        onSuccess() {
            router.push('/partners')
        }
    })

    const {
        register,
        handleSubmit,
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        mutate({
            ...data
        })
    }

    return (
        <>
            <header className="flex justify-between place-items-center">
                <h2 className="font-bold lg:text-3xl">Añadir socio</h2>
            </header>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="my-2">
                    <input {...register('name')} placeholder="Nombre" />
                </div>
                <div className="my-2">
                    <input {...register('surname')} placeholder="Apellidos" />
                </div>
                <div className="my-2">
                    <input {...register('dni')} placeholder="DNI" />
                </div>
                <div className="my-2 p-4 flex flex-row justify-end">
                    <button disabled={isLoading} type="submit" className="primary" value={"Crear socio"}>Crear socio </button>
                </div>
            </form>
        </>
    )
})