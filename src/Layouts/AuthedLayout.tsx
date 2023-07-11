import React from "react";

export const AuthedLayout = (Page: React.FC<any>) => () => {
    return (
        <>
            <header className="flex p-2 w-screen justify-between place-items-center bg-white">
                <h2 className="font-bold lg:text-3xl">Listado de socios</h2>
            </header>
            <main className="p-5">
                <Page />
            </main>
        </>
    )
}