import React, { useEffect, useState } from "react";
import { Editor } from '@tinymce/tinymce-react';

import '../css/CreateBlog.css'
import { json, useParams } from "react-router-dom";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function CreateBlog() {
    const {id} = useParams()
    const [formData, setFormData] = useState({
        POST_THUMB: '',
        POST_TITLE: '',
        POST_CONTENT: '',
        POST_CAT: '',
        THUMB_STATUS: 501
    })
    const [cat, setCat] = useState(null)


    useEffect(() => {
        async function getBlog() {
            const response = await fetch(`http://localhost:3000/api/blogs/${id}`)
            const result = await response.json()

            setFormData(prev => {
                return result[0]
            })
        }

        async function getCat() {
            const response = await fetch('http://localhost:3000/api/blogs/addc')
            const result = await response.json()
            console.log(result);
            if(response.ok){
                setCat(result.map(curr => <option value={curr.cat_name}>{curr.cat_name}</option>))
            }
        }

        getCat()
        getBlog()
    }, [id])

    async function submitForm(event){
        event.preventDefault()

        const response = await fetch(`http://localhost:3000/api/blogs/${id}`,
        {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }        
        )
        console.log(response);
    }

    async function submitThumb(event){
        event.preventDefault()

        const thumbData = new FormData()
        thumbData.append('thumb', formData.POST_THUMB)
    
        const response = await fetch('http://localhost:3000/api/blogs/upload', {
            method: 'POST',
            headers: {
            },
            body: thumbData,
        });

        if (response.ok) {
            const responseData = await response.json()

            const resStat = responseData.status
            const thumbUrl = responseData.thumb_url

            setFormData(prevData => ({
                ...prevData,
                POST_THUMB: thumbUrl,
                THUMB_STATUS: resStat
            }));
        }
    }

    function onThumbChange(event) {
        setFormData(prevData => {
            return {
                ...prevData,
                POST_THUMB: event.target.files[0]
            }
        })
        console.log(formData.POST_THUMB);
    }

    function handleChange(event){
            setFormData(
                prevdata => {
                    return {
                        ...prevdata,
                        [event.target.name]: event.target.value
                    }
                }
            )
    }

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setFormData(prev => {
            return {
                ...prev,
                POST_CONTENT: data
            }
        })
    };

    
    function onSelectchanged(event) {
        console.log(event.target.value);
        setFormData(prev => {
            return {
                ...prev,
                POST_CAT: event.target.value
            }
        })
    }


    return(
        <div className="create-blog">
            <input type="file" name="POST_THUMB" className="ip-file" accept="image/*" onChange={onThumbChange} required/>
            <button onClick={submitThumb}>Upload Thumbnail</button>
            <p className="thumb-stat">{formData.THUMB_STATUS === 501? 'Not Uploaded': 'Uploaded Successfully'}</p>
            <form onSubmit={submitForm}>
                <div className="form-detail-container">
                    <input type="text" name="POST_TITLE" className="ip-text" placeholder="Enter title" onChange={handleChange} value={formData.POST_TITLE} required/>
                    
                    <select onChange={(e) => onSelectchanged(e)}>
                        <option disabled>Select class</option>
                        {cat}
                    </select>
                    
                    <CKEditor
                            editor={ ClassicEditor }
                            data="<p>Hello from CKEditor&nbsp;5!</p>"
                            onReady={ editor => {
                            console.log( 'Editor is ready to use!', editor );
                            } }
                            onChange={handleEditorChange}
                    />
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
}