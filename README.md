this project contain 2 files frontend and backend 
to run this project follow these steps
# How to Run
1. first go to frontend folder and run ```npm i```
2. second go to backend folder and run ```npm i```
3. create env file in backend  and add this code in it
   ```
   JWT_SECRET_KEY = sparksoljwtcode
   MONGO_URI = YOUR_URI
   
   ```
5. create env file in frontend and add this
```
REACT_APP_API_URL = http://localhost:5000
```
6. to run the frontend run ```npm run dev```
7. to run the backend run ```nodemon```
