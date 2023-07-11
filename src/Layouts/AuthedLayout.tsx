import React from "react";

export const AuthedLayout = (Page: React.FC<any>) => function AuthedLayout() {
    return (
        <>
            <header className="flex p-2 w-screen justify-between place-items-center bg-white">
                <h2 className="font-bold lg:text-3xl">Registros</h2>
            </header>
            <main className="p-5">
                <Page />
            </main>
        </>
    )
}