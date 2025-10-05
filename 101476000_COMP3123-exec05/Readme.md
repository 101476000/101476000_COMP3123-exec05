# Express.js Basics with Routing

#### Section A: Practical Coding Tasks

**1. Creating an Express.js Route for Home Page**

Created a route `/home` in `index.js` that serves the `home.html` file containing:

```html
<h1>Welcome to ExpressJs Tutorial</h1>
```

When accessing `http://localhost:8081/home`, the page displays correctly in Postman and browser.

---

**2. Serving JSON Data from a User File**

Modified the `/profile` route to return the entire `user.json` file as JSON.  
Response example:

```json
{
  "name": "Carlos Figuera",
  "username": "carlos",
  "email": "101476000@georgebrown.ca",
  "address": { "city": "Mississauga", "zipcode": "L5A 3X5" },
  "phone": "1-647-736-8031",
  "website": "georgebrown.ca",
  "company": { "name": "George Brown" },
  "password": "carlos@123"
}
```

Tested successfully in Postman with a GET request to `/api/v1/user/profile`.

---

**3. Implementing User Authentication**

The `/login` route was modified to read from `user.json` and verify the username and password.

- **Valid credentials response:**
  ```json
  {
    "status": true,
    "message": "User Is valid"
  }
  ```

- **Invalid username:**
  ```json
  {
    "status": false,
    "message": "User Name is invalid"
  }
  ```

- **Invalid password:**
  ```json
  {
    "status": false,
    "message": "Password is invalid"
  }
  ```

Tested successfully in Postman using:
```json
{ "username": "carlos", "password": "carlos@123" }
```

---

**4. Creating a Logout Route**

The `/logout` route was updated to accept a username parameter and return an HTML message.  
For example, accessing:

`GET http://localhost:8081/api/v1/user/logout/Carlos`  

returns:

```html
<b>Carlos successfully logged out.</b>
```

---

**5. Add error handling middleware to handle below error**

Added middleware at the end of `index.js`:

```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});
```

This middleware catches all server-side errors and returns a 500 response.

---

#### Section B: Short Answer Questions

**6. Explain the Purpose of `express.Router()` in the Code Above.**

`express.Router()` is used to modularize the routes in Express.js applications.  
It allows you to create multiple route handlers in separate files (for example, `users.js`) and then mount them in the main app file using:

```js
app.use('/api/v1/user', userRouter);
```

This approach improves **organization**, **code readability**, and **scalability** in large applications.

---

**7. Error Handling in Express.js**

Error handling in Express.js can be implemented by wrapping route logic in `try...catch` blocks and passing errors to middleware using `next(err)`.  
Then, a centralized error handler captures and responds with a standard message.

Example:

```js
router.get('/profile', (req, res, next) => {
  try {
    res.json(readUser());
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: 'Server Error', error: err.message });
});
```

This ensures that any file read or server issues are handled gracefully instead of crashing the app.

---

#### Section C: Bonus

**7. Dynamic Port Binding in Express.js**

The following line allows the app to use a port defined by the hosting environment:

```js
app.listen(process.env.port || 8081);
```

If no environment variable `port` is set, it defaults to port `8081`.  
This is essential for cloud deployment (e.g., Render, Heroku) where the hosting provider dynamically assigns the port.

---

# Submission Guideline

**Step 1: Complete the Exercise**

All routes were implemented, tested, and validated using Postman.  
`home.html`, `user.json`, `index.js`, and `routes/users.js` work as expected.

---

**Step 2: Create ZIP File**

Created and named:
```
101476000_COMP3123-exec05.zip
```

It contains:
```
index.js
home.html
user.json
routes/users.js
package.json
Readme.md
.gitignore
```

---

**Step 3: Create GitHub Repository**

Repository created:  
[https://github.com/101476000/101476000_COMP3123-exec05](https://github.com/101476000/101476000_COMP3123-exec05)

Code pushed successfully using:
```bash
git init
git add .
git commit -m "COMP3123 exec05 solution"
git branch -M main
git remote add origin https://github.com/101476000/101476000_COMP3123-exec05.git
git push -u origin main
```

---

**Step 4: Upload Screenshots**

Uploaded screenshots showing:
- MongoDB Atlas cluster (`Cluster0`)
- Connection string (Connect → Drivers)
- Postman routes tested successfully (`/home`, `/profile`, `/login`, `/logout`)
- Console showing server running at port 8081

---

**Step 5: Submission**

Submitted GitHub repository link and ZIP file.  
All routes and requirements completed successfully.
