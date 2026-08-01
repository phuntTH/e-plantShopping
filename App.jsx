import React, { useState } from "react";
import "./App.css";

import AboutUs from "./components/AboutUs";
import ProductList from "./components/ProductList";

function App() {

    const [showProductList, setShowProductList] = useState(false);

    const handleGetStarted = () => {
        setShowProductList(true);
    };

    if (showProductList) {
        return <ProductList />;
    }

    return (

        <div className="app">

            <AboutUs onGetStarted={handleGetStarted} />

        </div>

    );

}

export default App;
