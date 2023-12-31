import React from "react";

import '../App.css'
import Card from '../components/Card'
import PageTitle from '../components/PageTitle'
import Nav from '../components/Nav'
import FAB from '../components/FAB'
import Footer from '../components/Footer'

export default function CardViewPage({cards, title}) {
    return(
        <>
            <PageTitle title={title}/>
            <div className="card-outer-conatiner">
                {cards}
            </div>
        </>
    )
}