import React, { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';

const paymentresult = () => {
    const [name, setName] = useState('')
    const [cardName, setCardName] = useState('')
    const [merchantUid, setMerchantUid] = useState('')
    const [customerUid, setCustomerUid] = useState('')
    const [productName, setProductName] = useState('')
    const [paid, setPaid] = useState('')

    const url = useRouter();

    const getPaidInfo = () => {
        const params = new URLSearchParams(url.asPath)
        setName(params.get('buyer_name'))
        setCardName(params.get('card_name'))
        setMerchantUid(params.get('merchant_uid'))
        setCustomerUid(params.get('customer_uid'))
        setProductName(params.get('name'))

        if (params.get('paid_amount') !== null) {
            setPaid(params.get('paid_amount'))

        } else {
            setPaid(params.get('/regularpay/paymentresult?amount'))
        }


    }

    useEffect(() => {
        getPaidInfo();
    }, [])
    return (<>
        <h1> regular payment result page</h1>
        <div>buyer name : {name}</div>
        <div>buyer uid(customer_uid): {customerUid}</div>
        <br />
        <div> card info : {cardName}</div>
        <div> merchant uid : {merchantUid}</div>
        <br />
        <div> product name : {productName}</div>
        <div> paid amount : {paid}</div>
        <br />
        <Link href={`/regularpay`}><button>return to previous page</button></Link>

    </>)
};

export default paymentresult;