// server.js
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
const uri =
  "mongodb+srv://digitalLessonUser:jzsE5stuOIi5oGig@cluster0.6qi4vu5.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
   // await client.connect();
    const db = client.db("digital_lesson_db");
    const lessonCollection = db.collection("add-lesson");
    const usersCollection = db.collection("users");

    console.log("MongoDB connected successfully!");

    // Create user (Save to DB)
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    // Users route
app.get("/users/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Server error" });
  }
});

// Make user premium
app.patch("/users/premium/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const result = await usersCollection.updateOne(
      { email },
      { $set: { role: "premium" } }
    );
    if (result.modifiedCount > 0) {
      res.send({ message: "User upgraded to premium" });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Server error" });
  }
});


app.get("/me", async (req, res) => {
  const email = req.query.email; 
  if (!email) return res.status(400).send({ message: "Email missing" });

  const user = await usersCollection.findOne({ email });
  if (!user) return res.status(404).send({ message: "User not found" });

  res.send(user);
});




    // Make user admin
    app.patch("/users/admin/:id", async (req, res) => {
      const { id } = req.params;
      try {
        const result = await usersCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { role: "admin" } }
        );
        if (result.modifiedCount > 0) {
          res.send({ message: "User updated to admin" });
        } else {
          res.status(404).send({ error: "User not found" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to update user" });
      }
    });

    app.post("/add-lesson", async (req, res) => {
  const lesson = req.body;
  lesson.createdAt = new Date();
  const result = await lessonCollection.insertOne(lesson);
  res.send(result);
});

app.post("/users", async (req, res) => {
  const user = req.body;
 
  const existingUser = await usersCollection.findOne({ email: user.email });
  if (existingUser) return res.send(existingUser);

  const result = await usersCollection.insertOne(user);
  res.send(result);
});



 

    app.get("/add-lesson", async (req, res) => {
  try {
    const email = req.query.email;

    let query = {};
    if (email) {
      query.email = email; 
    }

    const result = await lessonCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to fetch lessons" });
  }
});


    

    app.get("/my-lesson", async (req, res) => {
      const email = req.query.email;
      const lessons = await lessonCollection
        .find({ email })
        .sort({ createdAt: -1 })
        .toArray();

      res.send(lessons);
    });



    app.get("/public-lessons", async (req, res) => {
  try {
    const email = req.query.email;

    const lessons = await lessonCollection
      .find({
        email,
        privacy: "Public",
      })
      .sort({ createdAt: -1 })
      .toArray();

    res.send(lessons);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to fetch public lessons" });
  }
});


    // Get Public Lesson By ID

    app.get("/public-lesson/:id", async (req, res) => {
      try {
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
          return res.status(400).json({ message: "Invalid lesson ID" });
        }

        const lesson = await lessonCollection.findOne({
          _id: new ObjectId(id),
        });
        if (!lesson) {
          return res.status(404).json({ message: "Lesson not found" });
        }

        res.json(lesson);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
    });
    // Update Privacy
    app.patch("/lessons/privacy/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const { privacy } = req.body;

        if (!ObjectId.isValid(id)) {
          return res.status(400).json({ message: "Invalid lesson ID" });
        }

        const result = await lessonCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { privacy } }
        );
        res.json(result);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
    });

    // Update Access Level

    app.patch("/lessons/access/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const { accessLevel } = req.body;

        if (!ObjectId.isValid(id)) {
          return res.status(400).json({ message: "Invalid lesson ID" });
        }

        const result = await lessonCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { accessLevel } }
        );
        res.json(result);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
    });

    // Delete Lesson

    app.delete("/lessons/:id", async (req, res) => {
      try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
          return res.status(400).json({ message: "Invalid lesson ID" });
        }

        const result = await lessonCollection.deleteOne({
          _id: new ObjectId(id),
        });
        res.json(result);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
    });

    //payment api
    app.post("/create-checkout-session", async (req, res) => {
      try {
        const session = await stripe.checkout.sessions.create({
          line_items: [
            {
              price_data: {
                currency: "usd",
                unit_amount: 1500,
                product_data: {
                  name: "Premium Membership",
                },
              },
              quantity: 1,
            },
          ],
          mode: "payment",
          success_url: `${process.env.SITE_DOMAIN}/dashboard/payment-success`,
          cancel_url: `${process.env.SITE_DOMAIN}/premium`,
        });

        res.send({ url: session.url });
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Stripe session failed" });
      }
    });


    app.post("/confirm-payment", async (req, res) => {
  const { sessionId } = req.body;
  try {
    
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const email = session.customer_email;

    if (!email) return res.status(400).send({ message: "No customer email" });
    const result = await usersCollection.updateOne(
      { email },
      { $set: { role: "premium" } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).send({ message: "User not found" });
    }

    res.send({ message: "Payment confirmed & user upgraded" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Payment confirmation failed" });
  }
});

  } finally {
  }
}

run().catch(console.dir);


app.get("/", (req, res) => {
  res.send("Digital lesson server is running");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
