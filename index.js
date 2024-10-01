require('dotenv').config();
const { MongoClient } = require('mongodb');
const nodemailer = require('nodemailer');

// MongoDB connection details from .env file
const MONGO_URI = process.env.MONGO_URI; // Ensure this is set in your .env file
const DATABASE_NAME = 'mayank-packagings'; // Your database name
const COLLECTION_NAME = 'contacts'; // Your collection name

// Email credentials from .env file
const EMAIL_USER = process.env.EMAIL_USER; // Your Gmail address
const EMAIL_PASS = process.env.EMAIL_PASS; // Your Gmail App Password
const EMAIL_RECEIVER = process.env.EMAIL_RECEIVER; // Recipient email address

// Function to fetch specific fields from MongoDB
async function fetchDataFromMongoDB() {
  try {
    const client = await MongoClient.connect(MONGO_URI);
    const db = client.db(DATABASE_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // Fetch only the name, email, and message fields
    const data = await collection.find({}, { projection: { name: 1, email: 1, message: 1 } }).toArray();
    await client.close();
    return data;
  } catch (error) {
    console.error('Failed to fetch data from MongoDB:', error);
    throw error;
  }
}

// Function to send email
async function sendEmail(data) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  // Prepare email content
  const mailOptions = {
    from: EMAIL_USER,
    to: EMAIL_RECEIVER,
    subject: 'MongoDB Data Extraction',
    text: `Here is the extracted data:\n\n${JSON.stringify(data, null, 2)}`,
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Failed to send email:', error);
  }
}

// Main function to run the script
(async () => {
  try {
    const data = await fetchDataFromMongoDB();
    await sendEmail(data);
  } catch (error) {
    console.error('Error:', error);
  }
})();
