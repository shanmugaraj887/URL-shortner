
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { fullLink } from './link';
import { toast } from 'react-toastify';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


let arr = []


function ListUrls({ urls, setUrls }) {
    const username = localStorage.getItem("username")
    const token = localStorage.getItem("token")




    // React.useEffect(()=>{
    //     const gettingdata = await fetch(`${fullLink}/urlshortener/${username}`, {
    //         method: "GET",
    //         headers: { "x-auth-token": token }
    //     })
    //         const data = await gettingdata.json()

    // },[])
    // const value = () => {
    //     const gettingdata = fetch(`${fullLink}/urlshortener/${username}`, {
    //         method: "GET",
    //         headers: { "x-auth-token": token }
    //     })
    //         .then(data => data.json())
    //         .then(data => setUrls(data))
    // }
    // React.useEffect(() => value(), [])

    function deleteurl(url) {
        let shorturl = {
            surl: url
        }
        const data = fetch(`${fullLink}/urlshortener/${username}`, {
            method: "DELETE",
            body: JSON.stringify(shorturl),
            headers: {
                "x-auth-token": token,
                "Content-type": 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                if (data.message == "success") {
                    const val = urls.filter(ele => {
                        return (ele.surl != url)
                    })
                    setUrls(val)

                    toast.success("deleted successfully")
                }
            })
    }
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>s.no</StyledTableCell>
                        <StyledTableCell >Real URLS</StyledTableCell>
                        <StyledTableCell >Shortened URLS</StyledTableCell>
                        <StyledTableCell >Delete</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        urls != [] ? (urls.map((res, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell scope="row">{index + 1}</StyledTableCell>
                                <StyledTableCell >
                                    {res.rurl}
                                </StyledTableCell>
                                <StyledTableCell >{res.surl}</StyledTableCell>
                                <td><Button style={{ margin: "8px" }} color="error" onClick={() => deleteurl(res.surl)} variant="contained" >DELETE URL</Button>
                                </td>
                            </StyledTableRow>
                        ))) : (
                            <StyledTableRow >
                                <StyledTableCell scope="row">0</StyledTableCell>
                                <StyledTableCell >
                                    no data
                                </StyledTableCell>
                                <StyledTableCell >no data</StyledTableCell>
                                <td>na</td>
                            </StyledTableRow>
                        )
                    }

                </TableBody>
            </Table>
        </TableContainer>
    );
}


export default ListUrls
