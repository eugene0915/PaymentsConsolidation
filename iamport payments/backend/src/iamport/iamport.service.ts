import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class IamportService {
    getHello(): string {
        return 'Hello iamport page';
    }

    // FOR GENERAL PAYMENT
    async getProductInfo(imp_uid: string) {

        // 1. get Token first, 
        const gettoken = await axios({
            url: 'https://api.iamport.kr/users/getToken',
            method: 'post',
            headers: { "Content-Type": "application/json" },
            data: {
                imp_key: "8335756274306587",
                imp_secret: "QJHtbC2r0xX9FbLWwyEyHLwUXXlr2idRPGitsc8e8JZxF7zip1j5gbx37PbD2eMioUysLwH4AMPpZOsz"
            }
        })
        const token = gettoken.data.response.access_token;
        console.log(token, "token");

        // 2. and if we get token, request buying information Api, using our token and imp_uid 

        const productInfo = await axios({
            url: `https://api.iamport.kr/payments/${imp_uid}?_token=${token}`,
            method: "post",
            headers: { "Content-Type": "application/json" },
        })

        return productInfo.data;
    }

    // FOR REGULAR PAYMENT
    async getRegularpay(customer_uid, merchant_uid, buyer_name) {
        // 1. get Token first,
        const gettoken = await axios({
            url: 'https://api.iamport.kr/users/getToken',
            method: 'post',
            headers: { "Content-Type": "application/json" },
            data: {
                imp_key: "8335756274306587",
                imp_secret: "QJHtbC2r0xX9FbLWwyEyHLwUXXlr2idRPGitsc8e8JZxF7zip1j5gbx37PbD2eMioUysLwH4AMPpZOsz"
            }
        })
        const token = gettoken.data.response.access_token;
        // 2. you are already get billing key, you can pay easily again
        const paymentResult = await axios({
            url: 'https://api.iamport.kr/subscribe/payments/again',
            method: "post",
            headers: { "Authorization": token }, // 인증 토큰을 Authorization header에 추가
            data: {
                customer_uid: customer_uid,
                merchant_uid: merchant_uid, // 새로 생성한 결제(재결제)용 주문 번호
                amount: 10,
                name: "January album for fans",
                buyer_name: buyer_name
            }
        })

        if(paymentResult.data.response == null){
            // if the user doesn't have billing key or user's customerUid is different from before,
            // payment result is null. there is no data about it
            return 'payment failed'
        }else{
            // payment successed
            return paymentResult.data;

        }

        // console.log(paymentResult.data.response.status, " REGULAR PAYMENT status");
      //  console.log(paymentResult.data.response, "paymentResult  REGULAR PAYMENT");

    }


    // FOR REGULAR PAY SCHEDULE 

    async getRegularPaySchedule(customer_uid, merchant_uid, buyer_name, reserve_date){

        // 1. get Token first,
        const gettoken = await axios({
            url: 'https://api.iamport.kr/users/getToken',
            method: 'post',
            headers: { "Content-Type": "application/json" },
            data: {
                imp_key: "8335756274306587",
                imp_secret: "QJHtbC2r0xX9FbLWwyEyHLwUXXlr2idRPGitsc8e8JZxF7zip1j5gbx37PbD2eMioUysLwH4AMPpZOsz"
            }
        })
        const token = gettoken.data.response.access_token;

        const paymentScheduleResult = await axios({
            url: 'https://api.iamport.kr/subscribe/payments/schedule',
            method: "post",
            headers: { "Authorization": token }, // 인증 토큰 Authorization header에 추가
            data: {
              customer_uid: customer_uid, // 카드(빌링키)와 1:1로 대응하는 값
              schedules: [
                {
                    merchant_uid: merchant_uid,
                    schedule_at:  parseInt(reserve_date) ,
                    currency: "KRW",
                    amount: 300,
                    name: "photo album",
                    buyer_name: buyer_name,
                    buyer_email: "주문자 Email주소",
                    buyer_tel: "주문자 전화번호",
                    buyer_addr: "주문자 주소",
                    buyer_postcode: "주문자 우편번호"
            }
                ]
            }
          });
        console.log(paymentScheduleResult, "paymentScheduleResult");
        console.log(paymentScheduleResult.data.response, "data가 null인지");
        
        if(paymentScheduleResult.data.response == null){
            // if the user doesn't have billing key or user's customerUid is different from before,
            // payment result is null. there is no data about it
            return 'payment failed'
        }else{
            // payment successed
            return paymentScheduleResult.config.data;

        }

       
     }
   
}
