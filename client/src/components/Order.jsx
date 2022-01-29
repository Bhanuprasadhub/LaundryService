import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Noorder from './noorder';
import Rehna from './CreateOrder';
import './MainOrder.css'
import warning from '../assets/warning.jpg';
import icon from '../assets/viewicon.png'
//import "./order.css";
const Order = () => {
    const history = useNavigate()
    const [dataji, setData] = useState([{ address: "rajan" }])
    const [status1, setStatus] = useState([])
    const [ids, setids] = useState()
    const callHome = async () => {
        try {

            const res = await fetch("/getOrder", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"

                },
                credentials: "include"
            })

            const data = await res.json()

            setData(data)
            let arr = []
            for (let i = 0; i < dataji.length; i++) {
                arr.push(data[i].status)
            }
            setStatus(arr)
            console.log(res.status);
            if (!res.status === 200) {
                const error = new Error(res.error)
                throw error
            } else if (res.status === 401) {
                history("/")

            }

        } catch (err) {
            console.log(err, "he bhai he ")



        }
    }
    const updateOrder = async () => {
        let resio
        try {

            const rasio = await fetch("/uppdateorder", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "status": "Cancelled",
                    "id": ids


                })
            })







            if (rasio.status === 200) {
                console.log("yha bhi aayas")
                callHome()

                console.log("sucessfully register")
            }

        } catch (err) {

        }

    }
    console.log(dataji)


    useEffect(() => {
        callHome()

    }, [])

    const [currindex, setcurrindex] = useState(0)
    const [cancelid, setcancelid] = useState('')



    function statusset(i, s) {

        status1[i] = 'Cancelled'
        setStatus(status1)

        setids(s)
    }
    return (
        <div>
            {
                (dataji.length === 0) ? <Noorder />

                    : <>
                        <div className='table-order-main-header'>
                            <div className='table-main-header-data'><h3>Oders | <span>{dataji.length}</span></h3></div>
                            <div className='table-main-header-search'><NavLink to="/homeji/store"><button>Create</button></NavLink><input type='text' placeholder='Search'></input></div>

                        </div>
                        <div className='orders-table-header'>
                            <div ><h4>Order id</h4></div>
                            <div><h4>Order date &time</h4></div>
                            <div><h4>Store Location</h4></div>
                            <div><h4>City</h4></div>
                            <div><h4>Store Phone</h4></div>
                            <div><h4>Total items</h4></div>
                            <div><h4>Price</h4></div>
                            <div><h4>Status</h4></div>
                            <div><h4>Cancel</h4></div>
                            <div ><h4>View</h4></div>

                        </div>
                        <>
                            {
                                dataji.map((ele, index) => {
                                    return (
                                        <>
                                            <div className={(index % 2 === 0) ? "table-rows" : "table-rows-2"}>
                                                <div className='row1'><p>OROOO{index+1}</p></div>
                                                <div className='row2'><p>12-12-2021,10:15</p></div>
                                                <div className='row3'><p>JP Nagar</p></div>
                                                <div className='row4'><p>Pune</p></div>
                                                <div className='row5'><p>9458011140</p></div>
                                                <div className='row6'><p>{ele.total_quantity}</p></div>
                                                <div className='row7'><p>{ele.total_price}</p></div>
                                                <div className='row8'><p>{(ele.status === 'Cancelled') ? <i className='red'>Cancelled</i> : ele.status}</p></div>
                                                <div className='row9' >{ele.status !== 'Cancelled' ? <p className="danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { statusset(index, ele._id) }} data-id={cancelid} >Cancel</p> : null}
                                                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                        <div className="modal-dialog modal-dialog-centered">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h5 className="modal-title" id="exampleModalLabel">Alert</h5>
                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                </div>
                                                                <div className="modal-body">
                                                                    <div className='warning'><img src={warning} alt="caution" width="50" height="50" /></div>
                                                                    <div className="message">Are you sure want to cancel the order No : <b></b></div>
                                                                </div>
                                                                <div className="modal-footer">
                                                                    <button type="button" className="proceedbtn" data-bs-dismiss="modal" onClick={updateOrder}>proceed</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='row10'><p data-bs-toggle="modal" data-bs-target="#exampleModal2">{ele.status !== 'Cancelled' ? <img src={icon} /> : null}</p>
                                                    <div className="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                        <div className="modal-dialog summary-dialog" role="document">
                                                            <div className="modal-content summary-content">
                                                                <div className="modal-header">
                                                                    <h5 className="modal-title" id="exampleModalLabel">Summary</h5>
                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                                                        <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <div className="modal-body modal-body1">
                                                                    <div className="store">
                                                                        <div className='storeloc'><a>Store Location</a><br />Jp Nagar</div>
                                                                        <div className='storeadd'><a>Store Address</a><br />Near phone booth, 10th road</div>
                                                                        <div className='storephone'><a>Phone</a><br />91 9999999999</div>
                                                                    </div>
                                                                    {/* <div className='statusbar'>orders[currindex].status</div> */}
                                                                    <div className='details1'>
                                                                        <div><small className='orderdetails'>Orders Details</small></div>
                                                                        <div className='details-div'>
                                                                            <div className='h11'><h1>Shirts</h1></div>
                                                                            <div className='h11'><h1>Washing,Ironing</h1></div>
                                                                            <div className='h11'><h1>5 X 20 =</h1></div>
                                                                            <div className='h11 h12'><h1>100</h1></div>

                                                                        </div>
                                                                        <div className='details-div'>
                                                                            <div className='h11'><h1>Jeans</h1></div>
                                                                            <div className='h11'><h1>Washing,Ironing</h1></div>
                                                                            <div className='h11'><h1>5 X 30 =</h1></div>
                                                                            <div className='h11 h12'><h1>150</h1></div>

                                                                        </div>
                                                                        <div className='details-div'>
                                                                            <div className='h11'><h1>Joggersd</h1></div>
                                                                            <div className='h11'><h1>Chemical Wash</h1></div>
                                                                            <div className='h11'><h1>2 X 100 =</h1></div>
                                                                            <div className='h11 h12'><h1>200</h1></div>

                                                                        </div>
                                                                        <div className='whi2'>
                                                                            <div>Sub total:</div>
                                                                            <div>450</div>
                                                                        </div>
                                                                        <div className='whi2'>
                                                                            <div>Pickup Charges:</div>
                                                                            <div>90</div>
                                                                        </div>
                                                                        <div className='blue'>
                                                                            <div>Pickup Charges:</div>
                                                                            <div>90</div>
                                                                        </div>


                                                                    </div>
                                                                    <div className='addressbar'><small className='orderdetails'>Address</small>
                                                                        <div className='address11'>
                                                                            <b className='numbers'>Home</b><br />
                                                                            #223, 10th road, Jp Nagar,
                                                                            Bangalore
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                <div className="modal-footer footer">
                                                                    {"ready to pick up" === "ready to pickup" ? (<button type="button" id="" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>) : null}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                        </>

                                    )

                                })
                            }
                        </>
                    </>
            }


        </div >

    )


}

export default Order
