import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useFormik } from 'formik'
import { PGS, METHODS_FOR_INICIS, } from './payment/constant'
import Router from 'next/router';
import queryString from 'query-string';


const pay = () => {

    const [formData, setFormData] = useState({});

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

    const formik = useFormik({

        initialValues: {
            pg: 'html5_inicis',
            pay_method: 'card',
            merchant_uid: `mid_${new Date().getTime()}`,
            name: '',
            amount: '',
            buyer_name: '',
            buyer_tel: '',
            buyer_email: '',
            buyer_addr: '',
            buyer_postalcode: ''

        },
        onSubmit: (data) => {
            setFormData(data);
            console.log('formik.values', data)

            formik.resetForm();
            onClickPayment(data);
        }
    },)

    const onClickPayment = (data) => {
        const { IMP } = window;
        IMP.init([['imp34605608']]); // 결제 데이터 정의
        const data1 = data;
        IMP.request_pay(data1, callback);
    }

    const callback = (response) => {
        const { success, error_msg, imp_uid, merchant_uid } = response;
        if (response.success) {

            const query = queryString.stringify(response);
            Router.push(`/pay/paymentresult?${query}`);

        } else {
            alert(`결제 실패 : ${error_msg}`);

        }
    }

    return (<>
        <div className="wrapper">
            <div className="header">iamport Payment test (아임포트 결제 테스트)</div>
            <form className="formcontainer" onSubmit={formik.handleSubmit}>


                <div className="field">
                    <span>
                        <label htmlFor="pg">
                            <span className="red">*</span>
                            pg corporation <br />(pg사)</label>
                        <select className="justify-content" name="pg" id="pg" value={formData.pgs} onChange={formik.handleChange}>
                            {PGS.map((li) => {
                                return (<option value={li.value} key={li.label}>{li.label}</option>)
                            })}
                        </select>
                        <div>The selected PG at the top, "웹 표준 이니시스" is our main way to payment. </div>
                    </span>

                </div>
                <div className="field">
                    <span>
                        <label htmlFor="pay_method">
                            <span className="red">*</span>
                            pay method <br />(결제 방법)</label>
                        <select name="pay_method" id="pay_method" value={formData.pay_method} onChange={formik.handleChange}>
                            {METHODS_FOR_INICIS.map((li) => {
                                return (<option value={li.value} key={li.label}>{li.label}</option>)
                            })}
                        </select>
                        <div>The selected payment way at the top, "신용카드(card)" is our main way to payment. </div>

                    </span>
                </div>
                <div className="field">
                    <span className="p-float-label">
                        <label htmlFor='name'>
                            <span className="red">*</span>
                            product name <br />(상품명)</label>

                        <InputText id="name" name="name" value={formik.values.name} onChange={formik.handleChange}></InputText>
                    </span>
                    <div>when you test, you can type in it any words</div>

                </div>
                <div className="field">
                    <span className="p-float-label">
                        <label htmlFor='amount'>
                            <span className="red">*</span>
                            product price <br />(상품 가격)</label>
                        <InputText id="amount" name="amount" value={formik.values.amount} onChange={formik.handleChange}></InputText>
                    </span>
                    <div>for test, product price should be at least 100</div>
                </div>
                <div className="field">
                    <span className="p-float-label">
                        <label htmlFor='buyer_name'>name(이름)</label>
                        <InputText id="buyer_name" name="buyer_name" value={formik.values.buyer_name} onChange={formik.handleChange}></InputText>
                    </span>
                </div>
                <div className="field">
                    <span className="p-float-label">
                        <label htmlFor='buyer_tel'>phone number <br />(전화번호)</label>
                        <InputText id="buyer_tel" name="buyer_tel" value={formik.values.buyer_tel} onChange={formik.handleChange}></InputText>
                    </span>
                </div>
                <div className="field">
                    <span className="p-float-label">
                        <label htmlFor='buyer_email'>email(이메일)</label>
                        <InputText id="buyer_email" name="buyer_email" value={formik.values.buyer_email} onChange={formik.handleChange}></InputText>
                    </span>
                </div>
                <div className="field">
                    <span className="p-float-label">
                        <label htmlFor='buyer_addr'>address(주소)</label>
                        <InputText id="buyer_addr" name="buyer_addr" value={formik.values.buyer_addr} onChange={formik.handleChange}></InputText>
                    </span>
                </div>
                <div className="field">
                    <span className="p-float-label">
                        <label htmlFor='buyer_postalcode'>postal code <br />(우편번호)</label>
                        <InputText id="buyer_postalcode" name="buyer_postalcode" value={formik.values.buyer_postalcode} onChange={formik.handleChange}></InputText>
                    </span>
                </div>

                <div>The information next to the <span className="red">*</span> must be written down
                    <br />
                </div>

                <Button type="submit" label="payment(결제하기)" className="mt-2" />
            </form>
        </div>

    </>)

};

export default pay;