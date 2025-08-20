# School Management APIs

A Node.js RESTful API project to manage schools using **Express.js** and **MySQL**.  
The system allows users to add new schools and list all schools sorted by proximity to a user-specified location.

---

## Technologies Used
- Node.js
- Express.js
- MySQL
- Cors
- dotenv

---

## How to Use

1. Clone the repository:
2. Install dependencies
3. Create a .env file in the project root with your database credentials. It should contain
   * DB_HOST
   * DB_USER
   * DB_PASSWORD
   * DB_NAME
   * PORT
4. Start the server
5. Test the APIs using Postman or Insomnia. The APIs are of
   * POST -> http://localhost:5000/addSchool
   * GET -> http://localhost:5000/listSchools?latitude=XX.XXXX&longitude=YY.YYYY
