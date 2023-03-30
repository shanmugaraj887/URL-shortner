import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';
import { fullLink } from './link';
const bookV = Yup.object({
    newpassword: Yup.string().min(3, "Please enter a valid password").required("Please enter the new Password")
})
function PasswordChange() {
    const [load, setLoad] = useState(false)
    const navigate = useNavigate()
    const { username } = useParams()
    const formik = useFormik({

        initialValues: {
            newpassword: "",

        }, validationSchema: bookV, onSubmit: async (values) => {
            setLoad(true)
            const newPass = {
                newpassword: values.newpassword,

            }
            const token = localStorage.getItem("token")
            let data = await fetch(`${fullLink}/password-change/${username}`, {
                method: 'PUT',
                body: JSON.stringify(newPass),
                headers: {
                    "re-auth-token": token,
                    "Content-type": "application/json"
                }
            })
            let result = await data.json()
            console.log(result)
            if (result.message == "success") {
                localStorage.removeItem("token")
                toast.success("password successfully changed", {
                    position: toast.POSITION.TOP_RIGHT
                })
                navigate("/")
            } else {
                setLoad(false)
            }

        }
    })
    return (
        <div >
            <h2>New Password</h2>
            <div style={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center", alignContent: "flex-end" }}>
                <form style={{ padding: "40px", width: "400px", borderRadius: "7px", boxShadow: "2px 2px 20px black" }} onSubmit={formik.handleSubmit}>
                    <TextField onBlur={formik.onBlur} style={{ margin: "15px", width: "300px" }} id="standard-basic"
                        name="newpassword" label="Enter new password" onChange={formik.handleChange}
                        value={formik.values.newpassword} variant="standard" />
                    <div style={{ color: "red", fontSize: "15px", marginLeft: "10px" }}>
                        {formik.touched.newpassword && formik.errors.newpassword ? formik.errors.newpassword : null}

                    </div>
                    <Button style={{ marginTop: "8px" }} type="submit" color="primary" variant="contained">{load ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}submit</Button>
                </form>
            </div>

        </div>
    )
}

export default PasswordChange