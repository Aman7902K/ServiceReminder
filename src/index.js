import dotenv from "dotenv"

// Load environment variables FIRST before any other imports
// Railway provides env vars automatically, but load .env for local dev
if (process.env.NODE_ENV !== 'production') {
    dotenv.config({
        path: './.env'
    })
}

import connectDB from "./db/index.js"
import {app} from "./app.js"
import { initCronJobs } from "./services/cron.services.js"

connectDB().then(() => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`⚙️ Server is running at port : ${PORT}`);
        // Initialize cron jobs after server starts
        initCronJobs();
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})




//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
//         app.on("error", (error) => {
//             console.error("Express error:", error);
//         });
//         app.listen(process.env.PORT, () => {
//             console.log(`Server is running on port ${process.env.PORT}`);
//         });
//     } catch (error) {
//         console.error("MongoDB connection error:", error);
//     }
// })();
