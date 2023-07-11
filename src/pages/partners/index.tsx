import { AuthedLayout } from "~/Layouts/AuthedLayout"

export default AuthedLayout(function Partners() {
    return (
        <>
            <header className="flex justify-between place-items-center">
                <h2 className="font-bold lg:text-3xl">Listado de socios</h2>
                <button className="bg-blue-500 text-white px-3 py-1 hover:bg-blue-800 transition-colors">Crear socio</button>
            </header>
            <p>Tabla de socios</p>
        </>
    )
})