import axios from "axios";
import Router from "next/router";
import queryString from "query-string";
import { useEffect, useState } from "react";

const regularpay = () => {
    const [customerUid, setCustomerUid] = useState('');
    const [merchantUid, setMerchantUid] = useState('');
    const [buyerName, setBuyerName] = useState('');

    const [customerUid2, setCustomerUid2] = useState('');
    const [merchantUid2, setMerchantUid2] = useState('');
    const [buyerName2, setBuyerName2] = useState('');

    const [customerUidReserv, setCustomerUidReserv] = useState('');
    const [merchantUidReserv, setMerchantUidReserv] = useState('');
    const [buyerNameReserv, setBuyerNameReserv] = useState('');
    const [date, setDate] = useState('')

    useEffect(() => {
        const jquery = document.createElement("script");
        jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
        const iamport = document.createElement("script");
        iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
        document.head.appendChild(jquery);
        document.head.appendChild(iamport);
        return () => {
            document.head.removeChild(jquery); document.head.removeChild(iamport);
        }
    }, []);

    const getBkey = () => {
        const { IMP } = window;
        IMP.init([['imp34605608']]);
        IMP.request_pay({
            pg: "html5_inicis.INIBillTst", // when your regualr payment test done, and get approval from iamport payments, you can change this into name of your store you decided. the name of "html5_inicis.INIBillTst" is temporaly for test
            pay_method: 'card', // only card supported, there is no other option.
            merchant_uid: `${merchantUid}`,
            // merchant_uid should be change whenever issued new regular payment. for example, user A purchase this product for regular payment, we need to give them unique merchant_uid
            // and if another user B wants to purchase this product, we need to give B different unique merchant_uid
          
            name: 'January album for fans',
            amount: 10, // tatal payment amount. (when test, No price displayed on mobile)
            customer_uid: customerUid, // Mandatory input. i guess this uid might take from each user's account information, their unique uid
            buyer_email: 'iamport@siot.do',
            buyer_name: buyerName,
            buyer_tel: '02-1234-1234',
            m_redirect_url: 'http://localhost:3000/regularpay/paymentresult' // 예: https://www.my-service.com/payments/complete/mobile
        }, function (rsp) {
            if (rsp.success) {
                alert('billing key issued, and your regular payment successed');
                console.log(rsp, "rsp")
                // in this stage, first monthly regular payment successed,and can get the product they bought.
                // and they get billing key that they can't see. 
                // once user get billing key,can use next month again, dont' need to enroll their card information start from scratch 

                const query = queryString.stringify(rsp);
                Router.push(`/regularpay/paymentresult?${query}`)

            } else {
                alert('Failed to issue billing key, try again');
            }
        })
    };


    const getPaymentAgain = () => {
        const paymentAgainApi = axios({
            url: `http://localhost:3000/api/iamport/regularpay?&customer_uid=${customerUid2}&merchant_uid=${merchantUid2}&buyer_name=${buyerName2}`,
            method: "get",
            headers: { "Content-Type": "application/json" },
        })

        paymentAgainApi.then(function (res) {
            console.log(res.data, "payment again, res data")

            if(res.data === 'payment failed'){
                console.log('failed site')
                Router.push('/regularpay/failed')

            }else{
                const query = queryString.stringify(res.data.response);
                console.log(query, "q")
                Router.push(`/regularpay/paymentresult?${query}`)
            }
            
        })
    };

    const getReserveSchedule =()=>{

      //convert time format to unixTime   
        const convertTime = Math.floor(new Date(`${date}`).getTime() / 1000).toString();


        const reserveScheduleApi = axios({
            url: `http://localhost:3000/api/iamport/schedule?&customer_uid=${customerUidReserv}&merchant_uid=${merchantUidReserv}&buyer_name=${buyerNameReserv}&reserve_date=${convertTime}`,
            method: "get",
            headers: { "Content-Type": "application/json" },
        })

        reserveScheduleApi.then(function(res){
           
            if(res.data === 'payment failed'){
                Router.push('/regularpay/failed')

            }else{
                const query = queryString.stringify(res.data.schedules[0]);
                Router.push(`/regularpay/reserveschedule?${query}`)
            }
           

        })
    };

    

    return (<>
        <h1> this is regular payment page</h1>
        <h3>step1 fill in the blank</h3>
        <div> product name : January album for fans </div>
        <div> product merchant_uid :<input onChange={(e) => { setMerchantUid(e.target.value) }} value={merchantUid} /></div>
        <div> your name(buyer name) : <input onChange={(e) => { setBuyerName(e.target.value) }} value={buyerName} /></div>
        <div style={{color:"red"}}> your customer Uid :  <input onChange={(e) => { setCustomerUid(e.target.value) }} value={customerUid} /></div>
        <p>* when developer test regualr payment, should rememeber which <span style={{color:"red"}}>customer Uid </span>did use.</p>
        <div>
            <h3>step2 click ↓</h3>
            <button onClick={getBkey}>get billing key and start payment</button>
        </div>
        <br />
       
        <h3>step3 fill in the blank</h3>
        <div>On the assumption that you already received billing key</div>
        <div> product name : January album for fans </div>
        <div> product merchant_uid (this should be different uid comepare with step1) :<input onChange={(e) => { setMerchantUid2(e.target.value) }} value={merchantUid2} /></div>
        <div> your name(buyer name) : <input onChange={(e) => { setBuyerName2(e.target.value) }} value={buyerName2} /></div>
        <div style={{color:"red"}}> your customer Uid (it should be same uid when you filled in step 1) :  <input onChange={(e) => { setCustomerUid2(e.target.value) }} value={customerUid2} /></div>
        
        <h3>step4 click ↓</h3>
        <button onClick={getPaymentAgain}>regular payment</button>

        <br />

        <h3>step5, in this stage, we can reserve for monthly regular payment</h3>
        <div>For example, user likes CreatorA's product, so user wants to make a reservation for next month's payment.</div>
        <div> user can select the date of payment, if user select 2023 Febrary 1st, the payment occurs at Feb 1st.</div>
        <div> product name : January album for fans </div>
        <div> product merchant_uid (this should be different uid comepare with step 1,3) :<input onChange={(e) => { setMerchantUidReserv(e.target.value) }} value={merchantUidReserv} /></div>
        <div> your name(buyer name) : <input onChange={(e) => { setBuyerNameReserv(e.target.value) }} value={buyerNameReserv} /></div>
        <div style={{color:"red"}}> your customer Uid (it should be same uid when you filled in step 1,3) :  <input onChange={(e) => { setCustomerUidReserv(e.target.value) }} value={customerUidReserv} /></div>
        <div>reservation date :<input onChange={(e)=>{setDate(e.target.value)}} value={date} placeholder="YYYY.MM.DD"/> </div>

        <h3>step6 click ↓</h3>
        <button onClick={getReserveSchedule}>regular payment Reservation</button>

    </>)
};

export default regularpay;