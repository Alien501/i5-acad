import React, { useEffect, useState } from "react";

import '../css/Addcat.css'

export default function AddNewcat() {
    const [newCat, setNewCat] = useState('')
    const [cards, setCard] = useState(null)

    useEffect(() => {
        async function getCat() {
            const response = await fetch('http://localhost:3000/api/blogs/addc')
            const result = await response.json()
            console.log(result);
            if(response.ok){
                setCard(result.map(curr => <div className="cat-card">
                <div className="cat-card-name">
                    {curr.cat_name}
                </div>
                <button onClick={dele} name={curr.cat_name}>Delete</button>
            </div>))
            }
        }

        getCat()
    }, [])

    function onChange(event) {
        setNewCat(event.target.value)
    }

    async function dele(event) {
        console.log(event.target);

        const response = await fetch(`http://localhost:3000/api/blogs/delc/${event.target.name}`,
        {
            method: 'DELETE'
        }   
        )
        if(response.ok){
            alert('Deleted Successfully!')
        }else{
            alert('Not deleted!')
        }
    }

    async function onAddClick(event) {
        event.preventDefault();

        try{
            const response = await fetch('http://localhost:3000/api/blogs/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({cat: newCat})
            });
            if (response.ok){
                alert('Submitted Successfully!')
            }else{
                alert('Not Submitted')
            }
        }catch{
            alert('Something went wrong!')
        }
    }

    return(
        <div className="add-new-cat">
            <input type="text" placeholder="Enter new category" value={newCat} onChange={onChange}/>
            <button className="add-new-cat-btn" onClick={onAddClick}>Add New Cat</button>
            <div className="cat-container">
                {cards}
            </div>
        </div>
    )
}