# MongoMail

**MongoMail** is a Node.js application designed to extract contact data from a MongoDB database and send it via email using Nodemailer. This project demonstrates the integration of MongoDB and Nodemailer to automate data retrieval and email delivery.
## Features

- **Data Extraction**: Connects to a MongoDB database and extracts contact information (name, email, and message).
- **Email Notifications**: Automatically sends the extracted data via email using Nodemailer.
- **Environment Variables**: Manages sensitive information like database connection strings and email credentials using a `.env` file.

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **MongoDB**: NoSQL database used to store contact information.
- **Nodemailer**: Module for sending emails easily.
- **dotenv**: Module for managing environment variables.
