```markdown
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


Inventory :-

1. https://localhost:4000/inventory/ (GET)
   - list all products

2. https://localhost:4000/inventory/ (POST)
   - create product
   - body example:
     {
        "product_name": "Cola Ice Pop",
        "category": "Ice Pop",
        "cost_price": "5.00",
        "selling_price": "10.00",
        "quantity_unit": "Piece",
        "description": "Refreshing Cola flavored ice pop"
     }

3. https://localhost:4000/inventory/:id (PUT)
   - update product quantity
   - body example: { "quantity_unit": 50 }

4. https://localhost:4000/inventory/:id (DELETE)
   - delete product

5. https://localhost:4000/inventory/:id (GET)
   - get product details by id

6. https://localhost:4000/inventory/category/:category (GET)
   - list products by category

7. https://localhost:4000/inventory/search/:name (GET)
   - search products by name (partial match)

8. https://localhost:4000/inventory/low-stock/:threshold (GET)
   - list products with `quantity_unit < threshold`

9. https://localhost:4000/inventory/sorted/price (GET)
   - products sorted by `selling_price` (ASC)

10. https://localhost:4000/inventory/sorted/name (GET)
    - products sorted by `product_name` (ASC)

11. https://localhost:4000/inventory/sorted/category (GET)
    - products sorted by `category` (ASC)

12. https://localhost:4000/inventory/sorted/quantity (GET)
    - products sorted by `quantity_unit` (ASC)

13. https://localhost:4000/inventory/stock-value (GET)
    - total stock value (SUM of `cost_price * quantity_unit`)

14. https://localhost:4000/inventory/potential-revenue (GET)
    - total potential revenue (SUM of `selling_price * quantity_unit`)

15. https://localhost:4000/inventory/potential-profit (GET)
    - potential profit (revenue − stock value)

16. https://localhost:4000/inventory/profit-margin (GET)
    - profit margin per product ((selling_price - cost_price) / selling_price * 100)


Employees :-

1. https://localhost:4000/employees/ (get)
get all employees for admin
2. https://localhost:4000/employees/ (post)
{
  "employee_name": "John Doe",
  "email": "john.doe@example.com",
  "phone_number": "+91 9876543210",
  "address": "123 Main Street, City, State, ZIP Code"
}
3. https://localhost:4000/employees/:id (put)
{
  "employee_name": "John Doe Updated",
  "email": "john.doe.updated@example.com",
  "phone_number": "+91 9876543211",
  "address": "456 Updated Street, City, State, ZIP Code"
}
4. https://localhost:4000/employees/:id (delete)


```
