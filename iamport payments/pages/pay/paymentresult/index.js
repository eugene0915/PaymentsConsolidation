import React, { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import axios from 'axios'
import 'primeicons/primeicons.css';


const paymentResult = () => {

    const router = useRouter();
    const query = router.query;

    const { imp_uid } = query;

    useEffect(() => {

        const productInfoCheckApi = axios({
            url: `http://localhost:3000/api/iamport/product/${imp_uid}`,
            method: "get",
            headers: { "Content-Type": "application/json" },
        })

        productInfoCheckApi.then(function (res) {
            console.log(res.data.response, "결제정보 조회 결과")
            setPaidProdInfo(res.data.response);
        })

        console.log(query, "쿼리")

    }, [])

    const [paidProdInfo, setPaidProdInfo] = useState([]);

    const resultType = paidProdInfo.status === "paid" ? '성공' : '실패'
    const resultTypeEN = paidProdInfo.status === "paid" ? 'successed' : 'failed'
    const resultIcon = paidProdInfo.status === "paid" ? <i className="pi pi-check-circle" style={{ 'fontSize': '8em', paddingBottom: '30px' }}></i> :
        <i className="pi pi-exclamation-circle" style={{ 'fontSize': '8em', paddingBottom: '30px' }}></i>

    return (
        <>
            <div className="resultmapper">
                <div className="container">
                    {resultIcon}
                    <p>{`payment is ${resultTypeEN}`} {`결제에 ${resultType}하였습니다`}</p>
                    <ul>
                        <li>
                            <span>product name<br />(상품명)</span>
                            <span>{paidProdInfo.name}</span>
                        </li>
                        <li>
                            <span>total price<br />(총 결제 금액)</span>
                            <span>{paidProdInfo.amount} 원</span>
                        </li>
                        <li></li>
                        <li>
                            <span>name<br />(주문자 성함)</span>
                            <span>{paidProdInfo.buyer_name}</span>
                        </li>
                        <li>

                            <span>merchand uid<br />(주문번호)</span>
                            <span>{paidProdInfo.merchant_uid}</span>
                        </li>
                        {paidProdInfo.status === "paid" ? (
                            <li>
                                <span>iamport uid<br />(아임포트 번호)</span>
                                <span>{paidProdInfo.imp_uid}</span>
                            </li>
                        ) : (
                            <li>
                                <span>error message(에러 메시지)</span>
                                <span>결제에 실패했습니다. 다시 시도해주세요(payment failed, please try again)</span>
                            </li>
                        )}
                    </ul>
                    <button size="large" onClick={() => Router.push('/pay')}>
                        {/* <Icon type="arrow-left" /> */}
                        Go back to payment page and retry (돌아가기)
                    </button>
                </div>
            </div>
        </>
    )
};

export default paymentResult;