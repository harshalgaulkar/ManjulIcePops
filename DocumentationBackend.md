USERS:- 
1. https://localhost:4000/user/ (get)
get all users for admin
2. https://localhost:4000/user/login (post)
{ 
  "email": "har@gmail.com",
  "password": "Har@1234"
}
3. https://localhost:4000/user/ (post)
{ 
  "customer_name": "Harshal Gaulkar",
  "email": "har@gmail.com",
  "password": "Har@1234",
  "phone_number": "+91 9356452473",
  "address": "Deshmukh Wadi Burande Lay out wardha",
  "city": "Wardha",
  "state": "Maharashtra",
  "zip_code": "442001"
}
4. https://localhost:4000/user/ (put)
{   
    "uid": "5",
    "phone_number": "+91 7517554740"
}
5. https://localhost:4000/user/:id (delete)

Products :-

1. https://localhost:4000/products/ (get)
get all products for customers as well as admin
2. https://localhost:4000/products/ (post)
    {
        "product_name": "Cola Ice Pop",
        "category": "Ice Pop",
        "cost_price": "5.00",
        "selling_price": "10.00",
        "quantity_unit": "Piece",
        "description": "Refreshing Cola flavored ice pop"
   }
3. https://localhost:4000/products/:id (put)
    {
        "product_name": "Cola Ice Pop",
        "category": "Ice Pop",
        "cost_price": "5.00",
        "selling_price": "18.00",
        "quantity_unit": "Piece",
        "description": "Refreshing Cola flavored ice pop"
    }
4. https://localhost:4000/products/:id (delete)

5. https://localhost:4000/products/count (get)
get total count of products in inventory for admin

6. https://localhost:4000/products/search (get)
search products by name customers as well as admin

7. https://localhost:4000/products/lowstock (get) which is less than 10 for admin

8. https://localhost:4000/products/mostsold (get) get top 5 most sold products for admin
