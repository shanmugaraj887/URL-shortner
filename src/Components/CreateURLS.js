import React from 'react'
import { useFormik } from 'formik'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as Yup from "yup";
import { fullLink } from './link';
import { toast } from 'react-toastify';
import { useState } from 'react';
import ListUrls from './ListUrls';


const bookv = Yup.object({
    rurl: Yup.string()
        .matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Enter correct url!'
        )
        .required('Please enter website'),
})

function CreateURLS() {
    const [load, setLoad] = useState(false)
    const username = localStorage.getItem('username')
    const token = localStorage.getItem("token")
    const [urls, setUrls] = useState([])



    const gettingLink = () => {
        const gettingdata = fetch(`${fullLink}/urlshortener/${username}`, {
            method: "GET",
            headers: { "x-auth-token": token }
        })
            .then(data => data.json())
            .then(data => setUrls(data))
    }
    React.useEffect(() => gettingLink(), [])



    const formik = useFormik({
        initialValues: {
            rurl: ''
        }, validationSchema: bookv, onSubmit: async (values) => {
            setLoad(true)
            const url = {
                rurl: values.rurl
            }
            console.log(url)
            const creaturl = await fetch(`${fullLink}/urlshortener/${username}`, {
                method: "POST",
                body: JSON.stringify(url),
                headers: {
                    "x-auth-token": token,
                    "Content-type": "application/json"
                }
            })
            const res = await creaturl.json()
            console.log(res)
            if (res.message == "success") {
                setLoad(false)
                gettingLink()
                toast.success("short link successfully created")


            } else {
                setLoad(false)


                toast.error("short link creation failed")




            }


        }
    })




    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center", }}>
                <form onSubmit={formik.handleSubmit} style={{ boxShadow: "2px 2px 10px black", border: "0.9px solid grey", borderRadius: "7px", padding: "25px", marginTop: "30px", marginBottom: "0px" }}>
                    <TextField onBlur={formik.handleBlur} style={{ margin: "25px", width: "300px" }} id="standard-basic"
                        name="rurl" label="Please enter a valid url" onChange={formik.handleChange}
                        value={formik.values.rurl} variant="standard" />
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <div style={{ color: "red", fontSize: "15px", marginLeft: "10px" }}>
                            {formik.touched.rurl && formik.errors.rurl ? formik.errors.rurl : null}
                        </div>
                    </div>

                    <Button style={{ marginTop: "8px" }} type="submit" color="success" variant="contained">{load ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}Create short URL</Button>
                </form>

            </div>


            <div style={{ margin: "50px", boxShadow: "1px 1px 12px grey", }}>
                <ListUrls urls={urls} setUrls={setUrls} />
            </div>

        </div>
    )
}

export default CreateURLS