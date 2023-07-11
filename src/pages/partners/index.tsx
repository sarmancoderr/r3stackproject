/* eslint-disable @typescript-eslint/no-floating-promises */
import { useRouter } from "next/router"
import { AuthedLayout } from "~/Layouts/AuthedLayout"
import { api } from "~/utils/api"

export default AuthedLayout(function Partners() {
    const {data, isSuccess} = api.partners.allPartners.useQuery()
    const router = useRouter()

    return (
        <>
            <header className="flex justify-between place-items-center">
                <h2 className="text-xl font-bold lg:text-3xl">Listado de socios</h2>
                <button onClick={() => {router.push('/partners/add')}} className="primary">Crear socio</button>
            </header>
            {isSuccess && (<ul>
                {data.map(p => (
                    <li key={p.id}>{p.name} {p.surname}</li>
                ))}
            </ul>)}
        </>
    )
})