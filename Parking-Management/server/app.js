const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const {Collection, EventList} = require("./mongo");
const Razorpay = require('razorpay');
const qs = require('qs');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

const razorpay = new Razorpay({
  key_id: 'rzp_test_o2gjG5fQUCPsaf',
  key_secret: 'QauWaN24nnlg7KuvDoIHDpAZ',
})

app.post("/api/detect", async (req, res) => {
  try {
    const formData = req.body;
    // Insert data into MongoDB collection
    await Collection.insertMany([formData]);
    res.status(200).json({ success: true, message: "Data inserted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
});

app.get("/", cors(), async (req, res) => {
  try {
    res.status(200).json({ success: true, message: "GET request received" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.Pass;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    } else {
      const user = await Collection.findOne({ email: email});
      if (!user) {
        res.json({ message: "User not found" });
      }

      if (password === user.password) {
        res.cookie("loggedIn", true);
        req.session.user = { email }; // You can add more user information as needed
        res.status(200).json({ success: true, message: "Login successful" });
      } else {
        res.json({ message: "Check password again" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});


app.post("/register", async (req, res) => {
  try {
    const formData = req.body;
    // Check if required fields are present
    const { username, email, password, confirmpassword } = formData;
    if (!username || !email || !password || !confirmpassword) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
    // Check if password and confirmpassword match
    if (password !== confirmpassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match" });
    }
    // Insert data into MongoDB collection
    await Collection.insertMany([formData]);
    res.status(200).json({ success: true, message: "Data inserted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
});

// Protected route example
app.get("/home", (req, res) => {
  // Check if user is logged in
  if (req.session.user) {
    // User is logged in, serve the home page
    res.status(200).json({ success: true, message: "Welcome to the home page" });
  } else {
    // User is not logged in, send a 401 Unauthorized response
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
});

// Razorpay payment route
app.post("/api/payment", async (req, res) => {
    try {
      // const options = {
      //   amount: req.body.price, // amount in the smallest currency unit (e.g., paise in INR)
      //   currency: "INR", // currency code (e.g., INR)
      //   receipt: "receipt1", // order ID or receipt ID
      //   payment_capture: 1 // auto-capture payment after successful authorization
      // };

      const amount = req.body.amount;
      if(!amount || amount <= 0) {
        return res.status(400).json({error:"Invalid amount. Please provide a positive value."});
      }

      // Create amount to paise (as expected by Razorpay)
      const amountInPaise = amount * 100;
      const options = {
        amount: amountInPaise,
        currency: "INR", //Assuming INR currency for this example
        
        receipt: "Your_order_receipt_id", //Replace with a unique receipt ID for your reference

        // notes: {
        //   key1: 'value1',
        //   key2: 'value2',
        // }
      };

      // Create an order using Razorpay API
      razorpay.orders.create(options, (err, order) => {
        if (err) {
          console.error("Error creating Razorpay order:", err);
          return res.status(500).json({error: "Failed to create order. Please try again later."});
        }
        
        // Order created successfully
        // console.log("Order created:", order);
        res.json(order);
  
          // Redirect to the Razorpay payment page
          // const redirectUrl = `https://${order.razorpay_payment_link.domain}/${order.razorpay_payment_link.id}`;
          // res.redirect(redirectUrl);
      });
    } catch (error) {
      console.error("Unexpected Error: ", error);
      res.status(500).json({error: "Internal server error."});
    }
  });
//   try {
//     const options = {
//       amount: req.body.amount, // amount in the smallest currency unit (e.g., paise in INR)
//       currency: req.body.currency, // currency code (e.g., INR)
//       receipt: req.body.receipt, // order ID or receipt ID
//       payment_capture: 1 // auto-capture payment after successful authorization
//     };

//     // Create an order using Razorpay API
//     razorpay.orders.create(options, (err, order) => {
//       if (err) {
//         console.error("Error creating order:", err);
//         res.status(500).json({ success: false, message: "An error occurred while creating order" });
//       } else {
//         console.log("Order created:", order);
//         res.status(200).json({ success: true, order });
//       }
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ success: false, message: "An error occurred" });
//   }

// Razorpay webhook route
app.post('/razorpay-webhook', (req, res) => {
  const { event, payload } = req.body;

  // Handle different event types (e.g., payment authorized, payment captured, etc.)
  switch (event) {
    case 'payment.captured':
      // Update your database, send email notifications, etc.
      console.log('Payment captured:', payload);
      break;
    case 'payment.authorized':
      // Handle authorized payment event
      console.log('Payment authorized:', payload);
      break;
    // Handle other event types as needed
    default:
      console.log('Unhandled event:', event);
  }

  res.sendStatus(200);
});

// add data to the MongoDB collection: EventList
app.post('/event', async (req, res) => {
  try {
    const formData = req.body;
    await EventList.insertMany([formData]);
    res.status(200).json({ success: true, message: "Data inserted successfully" });

  } catch(err) {
    console.error("Error:", err);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
});

// Endpoint to fetch events data
app.get('/events', async (req, res) => {
  try {
    // Fetch all events from MongoDB
    const events = await EventList.find();
    res.status(200).json(events);
  } catch(err) {
    console.error("Error:", err);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
});

app.listen(8080, () => {
  console.log("Server connected on port 8080");
});
