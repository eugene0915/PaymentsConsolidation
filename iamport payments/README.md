## iamport nest(backend) + next(front) 
This file is made up of nest js and next js

[nest(backend)]
1. open your terminal, cd backend => npm run start:dev 
2. localhost:3001 is your backend server

[next(front)]
1. open your terminal, cd stalet_iamport => npm run dev
2. localhost:3000 is your front server
3. while backend server is running, i can reach to and use the backend data from through port 3000 front.
    for example http://localhost:3001/iamport , http://localhost:3000/api/iamport 
   
    if you compare those two url, it shows same page
   
    we can reach out backend port 3001 through front port 3000
   
    so we can use api easily without cors error.


## iamport payment
 when you enter http://localhost:3000/ there are two ways of payment.

 one is general payment method, and another is a regular payment method.

 general payment is like when you enter the store, and buy some stuff. enter the store and give the card infomation and buy.

 regular payment is like subscription, like youtube premium or nexflix. you can make a reservation for payment automatically.

 detailed infomation about payment is written down on the code annotaion.