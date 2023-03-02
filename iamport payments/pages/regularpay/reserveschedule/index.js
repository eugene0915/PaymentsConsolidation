import React, { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';

const reserveschedule =()=>{
    const url = useRouter();

    const [amount, setAmount] = useState('')
    const [name, setName] = useState('')
    const [merchantUid, setMerchantUid] = useState('')
    const [productName, setProductName] = useState('')
    const [paymentDate, setPaymentDate]= useState('')


const getReserveSchedule=()=>{
    const params = new URLSearchParams(url.asPath)
    setAmount(params.get('/regularpay/reserveschedule?amount'))
    setName(params.get('buyer_name'))
    setMerchantUid(params.get('merchant_uid'))
    setProductName(params.get('name'))

    //convert unixTime to korean time(YYYY.MM.DD)
    const paymentdateUnix =params.get('schedule_at')
    const myYear = new Date(paymentdateUnix * 1000).getFullYear();
    const myMonth = new Date(paymentdateUnix * 1000).getMonth()+1;
    const myDate = new Date(paymentdateUnix * 1000).getDate();

    console.log(myMonth,"myMonth")
    setPaymentDate(myYear+"."+ myMonth +"."+myDate)
   
}

    useEffect(()=>{
        getReserveSchedule();
    },[])

return(<>
<h1> Reservation Regular Payment Information</h1>

<div>buyer name : {name}</div>
<div> merchant uid : {merchantUid}</div>

<div> product name : {productName}</div>
        <div> paid amount : {amount}</div>
<div> your payment occur date : {paymentDate}</div>
<br/>
<div> thank you for the reservation !</div>
<Link href={`/regularpay`}><button>return to previous page</button></Link>

</>)
};

export default reserveschedule;