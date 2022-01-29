import React, { useEffect, useState } from "react";
import './Store.css';

import trousers from "../assets/trousers.jfif";
import shirt from "../assets/shirts.jfif";
import jeans from "../assets/jeans.jfif";
import boxers from "../assets/boxers.jfif";
import jogger from "../assets/joggers.jfif";
import tshirt from "../assets/Tshirts.jfif";
import wash from "../assets/washing-machine.svg";
import iron from "../assets/ironing.svg";
import Fold1 from "../assets/btowel.svg";
import wash1 from '../assets/wash1.svg';
import Press1 from '../assets/press1.svg';
import fold from '../assets/fold.svg';
import Pack1 from '../assets/pack1.svg';
import liquid from "../assets/bleach.svg";
import Others from "../assets/others.jfif";
import home from "../assets/home-run (1).svg";
import addon from "../assets/more (1).svg";
import list from "../assets/list.svg";
import search from "../assets/search.svg";


import Tick from "../assets/tick.JPG";

import './Store.css'

const Store = () => {
    const bill = {
        "Washing": 20,
        "Pressing": 15, "Folding": 10, "Chemical-washing": 25
    }
    const [item, setitem] = useState({ name: "", quantity: 0, actions: [], price: 0 });
    const [action, setaction] = useState([])
    const [cost, setcost] = useState(0);
    const [expression, setexpression] = useState(["calculate", "calculate", "calculate", "calculate", "calculate", "calculate", "calculate", "calculate", "calculate", "calculate", "calculate", "calculate", "calculate", "calculate", "calculate"])
    const [product, setproduct] = useState([]);
    const [reset, setreset] = useState([false, false, false, false, false, false, false, false, false, false, false])
    const [value1, setValue] = useState({
        name1: ""
    })
    const [color, setcolor] = useState([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false])




    function change(e) {
        setaction([])
        setcost(0)
        setitem({ ...item, name: e.target.id, quantity: e.target.value })


    }
    function selectaction(e) {
        const arr = e.target.id.split(' ')
        const changecolor = [...color]
        changecolor[parseInt(arr[1]) - 1] = !changecolor[parseInt(arr[1]) - 1]
        setcolor(changecolor)




        const res = [...action]

        res.push(arr[0])



        setaction(res)
        let washcost = cost
        washcost = washcost + bill[arr[0]]
        setcost(washcost)


    }
    function calculate(e) {
        item.actions = action;
        setitem(item)
        const totalprice = item.quantity * cost

        item.price = totalprice
        setitem(item)

        const express = (item.quantity).toString() + "X" + (cost).toString() + " =  " + (item.quantity * cost).toString()
        expression[parseInt(e.target.id)] = express
        console.log(express)
        setexpression(expression)
        console.log(expression)

        const demoproduct = [...product]
        demoproduct.push(item)
        console.log("demo", demoproduct)
        setproduct(demoproduct)
        console.log(product)
        reset[parseInt(e.target.id)] = true
        setreset(reset)
        console.log(reset, parseInt(e.target.id))
        console.log("product", product)

    }
    function resetbutton(e) {
        const changecolor = [...color]
        changecolor[parseInt(e.target.id)] = false
        changecolor[parseInt(e.target.id) + 1] = false
        changecolor[parseInt(e.target.id) + 2] = false
        changecolor[parseInt(e.target.id) + 3] = false
        setcolor(changecolor)

        const demoproduct = [...product]
        demoproduct.pop(item)
        setproduct(demoproduct)
        item.quantity = 0
        expression[e.target.id] = "calculate";
        setexpression(expression)
        setitem(item)
        setcost(0)
        reset[parseInt(e.target.id)] = false
        setreset(reset)
        console.log(reset)
    }
    const PostData = async (e) => {
        let sum=0
        for(let i=0;i<product.length;i++){
            sum=sum+product[i].price
        }
        console.log(sum)
        try {
           
            const response = await fetch("/addOrder", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    order_id:"5",
                   
                    details:"deatails is good",
                    total_quantity:product.length,
                    total_price: sum,
                    status: "Ready to Pick up",
                
                   
                })
            })
            console.log(response.status)
            if (response.status === 200) {
                //history.push("/")

                console.log("sucessfully register")
            }
        }
        catch (e) {
            alert("failed", e)
        }
    }


    return (<>
        <div className="store-table-header">
            <div className="store-table-header-heading">
                <h1>Create Order</h1>
            </div>
            <div className="store-table-header-search-bar">
                <input type="text" placeholder="Search"></input>
            </div>
        </div>
        <div className="store-table-content">
            <div className="header-Store">
                <div className="h-details"><h3>Product</h3></div>
                <div className="q-details"><h3>Quantity</h3></div>
                <div className="w-details"><h3>Wash Type</h3></div>
                <div className="p-details"><h3>Price</h3></div>
                <div className="r-details"><h3>Reset</h3></div>

            </div>

            <div className="item-1 ">

                <div className="details">
                    <div className="img1"><img src={shirt} ></img></div>
                    <div className="data">
                        <h3>Shirts</h3>
                        <p>Lorem Ipsum is the </p>
                    </div>
                </div>
                <div className="quantity"><input type='number' min={0} id="Shirts" onChange={(e) => { change(e) }}  ></input></div>
                <div className="wash-type">
                    <div className="img2"><img src={color[0] ? wash1 : wash} id="Washing 1" value="15" onClick={(e) => { selectaction(e) }} /></div>
                    <div className="img2"><img src={color[1] ? Press1 : iron} value="20" id="Pressing 2" onClick={(e) => { selectaction(e) }} /></div>
                    <div className="img2"><img src={color[2] ? Fold1 : fold} value="25" id="Folding 3" onClick={(e) => { selectaction(e) }} /></div>
                    <div className="img2"><img src={color[3] ? Pack1 : liquid} value="30" id="Chemical-washing 4" onClick={(e) => { selectaction(e) }} /></div>
                </div>
                <div className="price"><button type="submit" class="btn btn-default" id="0" onClick={(e) => { calculate(e) }}>{expression[0]}</button></div>
                <div className="reset">{reset[0] ? <button type="submit" class="btn btn-default" id="0" onClick={(e) => { resetbutton(e) }}>reset</button> : null}</div>
            </div>
            <div className="item-1 item-2">

                <div className="details">
                    <div className="img1"><img src={tshirt} /></div>
                    <div className="data">
                        <h3> T-Shirts</h3>
                        <p>Lorem Ipsum is the </p>
                    </div>
                </div>
                <div className="quantity"><input type='number' id="T-Shirts" onChange={(e) => { change(e) }}  ></input></div>
                <div className="wash-type">
                    <div className="img2"><img src={color[4] ? wash1 : wash} id="Washing 5" value="15" onClick={(e) => { selectaction(e) }} /></div>
                    <div className="img2"><img src={color[5] ? Press1 : iron} value="20" id="Pressing 6" onClick={(e) => { selectaction(e) }} /></div>
                    <div className="img2"><img src={color[6] ? Fold1 : fold} value="25" id="Folding 7" onClick={(e) => { selectaction(e) }} /></div>
                    <div className="img2"><img src={color[7] ? Pack1 : liquid} value="30" id="Chemical-washing 8" onClick={(e) => { selectaction(e) }} /></div>
                </div>
                <div className="price"><button type="submit" class="btn btn-default" id="1" onClick={(e) => { calculate(e) }}>{expression[1]}</button></div>
                <div className="reset">{reset[1] ? <button type="submit" class="btn btn-default" id="1" onClick={(e) => { resetbutton(e) }}>reset</button> : null}</div>

            </div>
            <div className="item-1">

                <div className="details">
                    <div className="img1"><img src={trousers} /></div>
                    <div className="data">
                        <h3>Trousers</h3>
                        <p>Lorem Ipsum is the </p>
                    </div>
                </div>
                <div className="quantity"><input type='number' id="Trousers" onChange={(e) => { change(e) }}></input></div>
                <div className="wash-type">
                    <div className="img2"><img src={color[8] ? wash1 : wash} id="Washing 9" value="15" onClick={(e) => { selectaction(e) }} /></div>
                    <div className="img2"><img src={color[9] ? Press1 : iron} value="20" id="Pressing 10" onClick={(e) => { selectaction(e) }} /></div>
                    <div className="img2"><img src={color[10] ? Fold1 : fold} value="25" id="Folding 11" onClick={(e) => { selectaction(e) }} /></div>
                    <div className="img2"><img src={color[11] ? Pack1 : liquid} value="30" id="Chemical-washing 12" onClick={(e) => { selectaction(e) }} /></div>
                </div>
                <div className="price"><button type="submit" class="btn btn-default" id="2" onClick={(e) => { calculate(e) }}>{expression[2]}</button></div>
                <div className="reset">{reset[2] ? <button type="submit" class="btn btn-default" id="2" onClick={(e) => { resetbutton(e) }}>reset</button> : null}</div>

            </div>
            <div className="item-1 item-2">

                <div className="details">
                    <div className="img1"><img src={jeans} /></div>
                    <div className="data">
                        <h3>Jeans</h3>
                        <p>Lorem Ipsum is the </p>
                    </div>
                </div>
                <div className="quantity"><input type='number' id="Jeans" onChange={(e) => { change(e) }}></input></div>
                <div className="wash-type">
                    <div className="img2"><img src={color[12] ? wash1 : wash} id="Washing 13" value="15" onClick={(e) => { selectaction(e) }} /></div>
                    <div className="img2"><img src={color[13] ? Press1 : iron} value="20" id="Pressing 14" onClick={(e) => { selectaction(e) }} /></div>
                    <div className="img2"><img src={color[14] ? Fold1 : fold} value="25" id="Folding 15" onClick={(e) => { selectaction(e) }} /></div>
                    <div className="img2"><img src={color[15] ? Pack1 : liquid} value="30" id="Chemical-washing 16" onClick={(e) => { selectaction(e) }} /></div>
                </div>
                <div className="price"><button type="submit" class="btn btn-default" id="3" onClick={(e) => { calculate(e) }}>{expression[3]}</button></div>
                <div className="reset">{reset[3] ? <button type="submit" class="btn btn-default" id="3" onClick={(e) => { resetbutton(e) }}>reset</button> : null}</div>
            </div>
            <div className="item-1">

                <div className="details">
                    <div className="img1"><img src={shirt} /></div>
                    <div className="data">
                        <h3>Sari</h3>
                        <p>Lorem Ipsum is the </p>
                    </div>
                </div>
                <div className="quantity"><input type='number' id="Sari" onChange={(e) => { change(e) }}></input></div>
                <div className="wash-type">
                    <div className="img2"><img src={color[16] ? wash1 : wash} id="Washing 17" value="15" onClick={(e) => { selectaction(e) }} /></div>
                    <div className="img2"><img src={color[17] ? Press1 : iron} value="20" id="Pressing 18" onClick={(e) => { selectaction(e) }} /></div>
                    <div className="img2"><img src={color[18] ? Fold1 : fold} value="25" id="Folding 19" onClick={(e) => { selectaction(e) }} /></div>
                    <div className="img2"><img src={color[19] ? Pack1 : liquid} value="30" id="Chemical-washing 20" onClick={(e) => { selectaction(e) }} /></div>
                </div>
                <div className="price"><button type="submit" class="btn btn-default" id="4" onClick={(e) => { calculate(e) }}>{expression[4]}</button></div>
                <div className="reset">{reset[4] ? <button type="submit" class="btn btn-default" id="4" onClick={(e) => { resetbutton(e) }}>reset</button> : null}</div>

            </div>
            <div className="item-1 item-2">

                <div className="details">
                    <div className="img1"><img src={shirt} /></div>
                    <div className="data">
                        <h3>Boxers</h3>
                        <p>Lorem Ipsum is the </p>
                    </div>
                </div>
                <div className="quantity"><input type='number' id="Boxer" onChange={(e) => { change(e) }}></input></div>
                <div className="wash-type">
                    <div className="img2"><img src={color[20] ? wash1 : wash} id="Washing 21" value="15" onClick={(e) => { selectaction(e) }} /></div>
                    <div className="img2"><img src={color[21] ? Press1 : iron} value="20" id="Pressing 22" onClick={(e) => { selectaction(e) }} /></div>
                    <div className="img2"><img src={color[22] ? Fold1 : fold} value="25" id="Folding 23" onClick={(e) => { selectaction(e) }} /></div>
                    <div className="img2"><img src={color[23] ? Pack1 : liquid} value="30" id="Chemical-washing 24" onClick={(e) => { selectaction(e) }} /></div>
                </div>
                <div className="price"><button type="submit" class="btn btn-default" id="5" onClick={(e) => { calculate(e) }}>{expression[5]}</button></div>
                <div className="reset">{reset[5] ? <button type="submit" class="btn btn-default" id="5" onClick={(e) => { resetbutton(e) }}>reset</button> : null}</div>

            </div>
            <div className="item-1">

                <div className="details">
                    <div className="img1"><img src={shirt} /></div>
                    <div className="data">
                        <h3>Joggers</h3>
                        <p>Lorem Ipsum is the </p>
                    </div>
                </div>
                <div className="quantity"><input id="Joggers" type='number' onChange={(e) => { change(e) }}></input></div>
                <div className="wash-type">
                    <div className="img2"><img src={color[24] ? wash1 : wash} id="Washing 25" onClick={(e) => { selectaction(e) }} /></div>
                    <div className="img2"><img src={color[25] ? Press1 : iron} id="Pressing 26" onClick={(e) => { selectaction(e) }} /></div>
                    <div className="img2"><img src={color[26] ? Fold1 : fold} id="Folding 27" onClick={(e) => { selectaction(e) }} /></div>
                    <div className="img2"><img src={color[27] ? Pack1 : liquid} id="Chemical-washing 28" onClick={(e) => { selectaction(e) }} /></div>
                </div>

                <div className="price"><button type="submit" class="btn btn-default" id="6" onClick={(e) => { calculate(e) }}>{expression[6]}</button></div>
                <div className="reset">{reset[6] ? <button type="submit" class="btn btn-default" id="6" onClick={(e) => { resetbutton(e) }}>reset</button> : null}</div>
            </div>




        </div>
        <div Style="float:right; margin-right:125px; margin-top:-12px;">
            <button class="button button4" Style="transform:scale(0.8); font-size:14px;">Cancel</button>
            {(product.length > 0) ? <button class="button button5 " data-bs-toggle="modal" data-bs-target="#exampleModal3" Style="transform:scale(0.8); font-size:14px;">Procced</button> : null}
            <div className="modal fade" id="exampleModal3" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog summary-dialog" role="document">
                    <div className="modal-content summary-content">
                        <div className="modal-header" Style="background-color:#5861AE; color:white">
                            <h5 className="modal-title" id="exampleModalLabel">Summary</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="store" Style="    background-color: #F4F9FF;" >
                                <div className='storeloc'><a>Store Location</a><br />Jp Nagar</div>
                                <div className='storeadd'><a>Store Address</a><br />Near phone booth, 10th road</div>
                                <div className='storephone'><a>Phone</a><br />91 9999999999</div>
                            </div>
                            {/* <div className='statusbar'>status</div> */}
                            <div className='details1'>
                                <small className='orderdetails'>Order details</small>
                                {product.map((prod, index) =>
                                    <div className='solo-item' key={index}><div className='solo1'>{prod.name}</div>  <div className='solo2'>{prod.actions.map(action => <i>{action},</i>)}</div> <div className='solo3'>{prod.quantity} X {parseInt(prod.price / prod.quantity)} = <b Style="color:#5861AE">{prod.price}</b> </div> <hr></hr> </div>)}
                                <div className='subtotal'>Sub total: <b className='numbers'>{product.reduce((acc, curr) => acc + parseInt(curr.price), 0) - 90}</b></div>
                                <div className='charges' >Pickup charges: <b className='numbers'>90</b></div>
                                <div className='total' Style="padding-top: 13px;"><b className='final'>Total:   Rs {product.reduce((acc, curr) => acc + parseInt(curr.price), 0)}</b></div>
                            </div>
                            <h3>Address</h3>
                            <div className="all-address">

                                <div className='addressbar'><small className='orderdetails'></small>
                                    <div className='address1'>
                                        <b className='numbers'>Home</b><br />
                                        #223, 10th road, Jp Nagar,
                                        Bangalore
                                    </div>
                                </div>
                                <div className='addressbar'><small className='orderdetails'></small>
                                    <div className='address1'>
                                        <b className='numbers'>Home</b><br />
                                        #223, 10th road, Jp Nagar,
                                        Bangalore
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer footer">
                            <button type="button" className="btn " data-bs-toggle="modal" data-bs-target="#exampleModal4" Style="background-color:#5861AE; color:white; margin-right:10px" onClick={() => { PostData() }} >Confirm</button>
                            {/* <div class="modal fade" id="exampleModal4" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static">
                                        <div class="modal-dialog " Style="height: 100vh;">
                                          <div class="modal-content " Style="width:300px;height: 350px;margin-left: 80px;margin-top: 100px;border-radius: 15px;">
            
                                          <div class="modal-body">
                                            <img src={Tick} alt="Tick" Style="transform:scale(0.3);margin-top:-60px"></img>
                                            <h3 Style="color:#0A1F44;margin-top: -60px; text-align:center;">Your order is successfully.</h3>
                                            <p Style="color:#0A1F44;text-align:center;">You can track the delivery in the "Orders" section.</p>
                                            <button type="button" class="btn " Style="background-color:#5861AE; color:white;border-radius:30px;margin-left:60px;width:150px">Go to orders </button>
                                          </div>
                                          </div>
                                        </div>
                                      </div> */}
                        </div>
                    </div>
                </div>
            </div>

        </div>



    </>)

}

export default Store