const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

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
    const db = client.db("digital_lesson_db");
    const lessonCollection = db.collection("add-lesson");
    const usersCollection = db.collection("users");

    console.log("MongoDB connected successfully!");

    // Create user (Save to DB)
    app.post("/users", async (req, res) => {
      try {
        const user = req.body;
        const existingUser = await usersCollection.findOne({ email: user.email });
        if (existingUser) return res.send(existingUser);

        const result = await usersCollection.insertOne(user);
        res.send(result);
      } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Failed to create user" });
      }
    });

    // Get user by email
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

    // Make user premium directly
    app.patch("/users/premium/:email", async (req, res) => {
      const { email } = req.params;
      try {
        const result = await usersCollection.updateOne(
          { email },
          { $set: { role: "premium" } },
          { upsert: true }
        );
        res.send({ message: "User upgraded to premium", result });
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
      try {
        const lesson = req.body;
        lesson.createdAt = new Date();
        const result = await lessonCollection.insertOne(lesson);
        res.send(result);
      } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Failed to add lesson" });
      }
    });

    app.get("/add-lesson", async (req, res) => {
      try {
        const email = req.query.email;
        let query = {};
        if (email) query.email = email;

        const result = await lessonCollection
          .find(query)
          .sort({ createdAt: -1 })
          .toArray();

        res.send(result);
      } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Failed to fetch lessons" });
      }
    });

    app.get("/my-lesson", async (req, res) => {
      try {
        const email = req.query.email;
        const lessons = await lessonCollection
          .find({ email })
          .sort({ createdAt: -1 })
          .toArray();

        res.send(lessons);
      } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Failed to fetch my lessons" });
      }
    });

    app.get("/public-lessons", async (req, res) => {
      try {
        const lessons = await lessonCollection
          .find({ privacy: "Public" })
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

    // Get Lesson By ID (Universal)
    app.get("/lesson/:id", async (req, res) => {
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

    // Get Premium & Private Lessons
    app.get("/premium-lessons", async (req, res) => {
      try {
        const lessons = await lessonCollection
          .find({
            $or: [
              { accessLevel: "Premium" },
              { privacy: "Private" },
            ],
          })
          .sort({ createdAt: -1 })
          .toArray();

        res.send(lessons);
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Failed to fetch premium lessons" });
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

    // Delete Lesson (Accepts both /lessons/:id and /lesson/:id)
    const deleteLessonHandler = async (req, res) => {
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
    };

    app.delete("/lessons/:id", deleteLessonHandler);
    app.delete("/lesson/:id", deleteLessonHandler);

    // Payment API: Create Checkout Session
    app.post("/create-checkout-session", async (req, res) => {
      try {
        const { email } = req.body;
        const siteDomain = process.env.SITE_DOMAIN || "http://localhost:5173";

        const sessionPayload = {
          payment_method_types: ["card"],
          mode: "payment",
          line_items: [
            {
              price_data: {
                currency: "usd",
                product_data: {
                  name: "Premium Membership",
                  description: "Full Lifetime Access to All Premium Lessons & Exclusive Features",
                },
                unit_amount: 1500, // $15.00
              },
              quantity: 1,
            },
          ],
          success_url: `${siteDomain}/dashboard/payment-success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${siteDomain}/premium-lesson`,
        };

        if (email) {
          sessionPayload.customer_email = email;
          sessionPayload.metadata = { email };
        }

        const session = await stripe.checkout.sessions.create(sessionPayload);

        res.status(200).send({
          success: true,
          url: session.url,
          sessionId: session.id,
        });
      } catch (error) {
        console.error("Stripe Error:", error);
        res.status(500).send({
          success: false,
          message: "Stripe session failed",
          error: error.message,
        });
      }
    });

    // Payment API: Confirm Payment
    app.post("/confirm-payment", async (req, res) => {
      const { sessionId, email: fallbackEmail } = req.body;
      try {
        let userEmail = fallbackEmail;

        if (sessionId) {
          try {
            const session = await stripe.checkout.sessions.retrieve(sessionId);
            if (session.customer_email) {
              userEmail = session.customer_email;
            } else if (session.metadata?.email) {
              userEmail = session.metadata.email;
            }
          } catch (retrievalError) {
            console.error("Could not retrieve Stripe session details:", retrievalError.message);
          }
        }

        if (!userEmail) {
          return res.status(400).send({ message: "No customer email found" });
        }

        const result = await usersCollection.updateOne(
          { email: userEmail },
          { $set: { role: "premium" } },
          { upsert: true }
        );

        res.send({
          success: true,
          message: "Payment confirmed & user upgraded to premium",
          email: userEmail,
          result,
        });
      } catch (error) {
        console.error("Confirm payment error:", error);
        res.status(500).send({
          success: false,
          message: "Payment confirmation failed",
          error: error.message,
        });
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
