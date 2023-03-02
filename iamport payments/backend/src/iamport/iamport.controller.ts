import { Controller, Get, Param, Query } from '@nestjs/common';
import { IamportService } from './iamport.service';

@Controller('iamport')
export class IamportController {
    constructor(private readonly iamportService: IamportService) { }
    @Get()
    getHello() {
        return this.iamportService.getHello();
    }

    // check payment result from iamport API 
    // using payment uid(=imp_uid), to check whether it is real paid or not
    // also you can check in here which Api that was used ==> https://api.iamport.kr/#/ 
    @Get('/product/:imp_uid')
    getProductInfo(@Param('imp_uid') imp_uid: string) {
        return this.iamportService.getProductInfo(imp_uid);
    }

    @Get('/regularpay')
    getRegularPay(@Query('customer_uid') customer_uid: string, @Query('merchant_uid') merchant_uid: string, @Query('buyer_name') buyer_name: string,) {
        return this.iamportService.getRegularpay(customer_uid, merchant_uid, buyer_name);
    }

    @Get('/schedule')
    getRegularPaySchedule(@Query('customer_uid') customer_uid: string, @Query('merchant_uid') merchant_uid: string, @Query('buyer_name') buyer_name: string, @Query('reserve_date') reserve_date: string){
        return this.iamportService.getRegularPaySchedule(customer_uid, merchant_uid, buyer_name, reserve_date)
    }
}
