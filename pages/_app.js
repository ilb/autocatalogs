import React from "react";
export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <title>Справочник автомобилей</title>
            <Component {...pageProps} />
        </>
    );
}