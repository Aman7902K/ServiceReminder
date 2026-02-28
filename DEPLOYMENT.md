# Deployment Guide - Retailer Reminder System

This guide will walk you through deploying your application with:
- **Frontend**: Vercel
- **Backend**: Railway
- **Database**: MongoDB Atlas (already connected)

---

## 📋 Prerequisites

- GitHub account with your code pushed
- Vercel account
- Railway account
- MongoDB Atlas cluster running

---

## 🗄️ Step 1: MongoDB Atlas Setup

Your MongoDB is already connected. Just ensure:

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Navigate to **Database Access** → Add a database user (if not exists)
3. Navigate to **Network Access** → Add IP: `0.0.0.0/0` (allow all IPs for cloud deployment)
4. Copy your connection string: `mongodb+srv://username:password@cluster.mongodb.net/dbname`

---

## 🚀 Step 2: Deploy Backend to Railway

### 2.1 Push Code to GitHub
```bash
cd /home/aman/Desktop/Projects/RetailerReminder
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 2.2 Deploy on Railway

1. Go to [Railway Dashboard](https://railway.app/)
2. Click **New Project**
3. Select **Deploy from GitHub repo**
4. Connect your GitHub account and select your repository
5. Railway will auto-detect it's a Node.js app
6. Click **Add variables** and add these environment variables:
   ```
   NODE_ENV=production
   PORT=8000
   MONGODB_URL=<your-mongodb-atlas-connection-string>
   WHATSAPP_ACCESS_TOKEN=<your-whatsapp-token>
   PHONE_NUMBER_ID=<your-phone-number-id>
   ```

7. Go to **Settings** tab:
   - Under **Networking**, click **Generate Domain**
   - This creates a public URL for your API

8. Wait for deployment (3-5 minutes)

9. Copy your backend URL: `https://retailer-reminder-api-production.up.railway.app`

---

## 🎨 Step 3: Deploy Frontend to Vercel

### 3.1 Create Production Environment File

Create `frontend/.env.production`:
```env
VITE_API_BASE_URL=https://retailer-reminder-api-production.up.railway.app
```

Push this to GitHub:
```bash
git add frontend/.env.production
git commit -m "Add production env"
git push origin main
```

### 3.2 Deploy on Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. **Environment Variables** - Add:
   ```
   VITE_API_BASE_URL=https://retailer-reminder-api-production.up.railway.app
   ```
   (Replace with your actual Railway URL from Step 2)

6. Click **Deploy**

7. Wait for deployment (2-3 minutes)

8. Copy your frontend URL: `https://retailer-reminder.vercel.app`

---

## 🔗 Step 4: Update Backend with Frontend URL
ailway Dashboard
2. Open your **retailer-reminder** project
3. Click on **Variables** tab
4. Add new environment variable:
   ```
   FRONTEND_URL=https://retailer-reminder.vercel.app
   ```
   (Replace with your actual Vercel URL from Step 3)
5. Save (Railway
5. Save (service will auto-redeploy)

---

## ✅ Step 5: Verify Deployment

1. Visit your frontend URL: `https://retailer-reminder.vercel.app`
2. Try creating a maintenance record
3. Check if the record is saved

**Note**: WhatsApp messages won't send until you add a permanent access token, but record creation will work!

---

## 🔧 Troubleshooting

### Backeailway logs: Dashboard → Your Project → Deployments → View Logs
- Verify all environment variables are set correctly
- Check Railway free tier usage ($5/month credit)

### Frontend can't connect to backend?
- Check browser console for CORS errors
- Verify `VITE_API_BASE_URL` in Vercel env vars
- Verify `FRONTEND_URL` in Railway env vars
- Ensure Railway domain is generated and active vars
- Verify `FRONTEND_URL` in Render env vars

### Database connection failed?
- Verify MongoDB connection string
- Ensure IP `0.0.0.0/0` is whitelisted in MongoDB Atlas

---

## 📝 Post-Deployment Checklist

- [ ] Backend deployed and health check passing
- [ ] Frontend deployed and accessible
- [ ] Can create new maintenance records
- [ ] Records visible in recent records section
- [ ] MongoDB Atlas shows new documents

---

## 🔄 Future Updates

### Update Backend:
```bash
git add .
git commit -m "Update message"
gailway auto-deploys from GitHub.

### Update Frontend:
```bash
cd frontend
git add .
git commit -m "Update message"
git push origin main
```
Vercel auto-deploys from GitHub.

---

## 🎯 When WhatsApp is Ready

Once you have a permanent access token from Meta:

1. Update `WHATSAPP_ACCESS_TOKEN` in Railway environment variables
2. Messages will automatically start sending
3. No code changes needed!

---

## 💡 Railway Free Tier Notes

- Free tier: $5 credit per month
- Includes 500 hours of usage
- More than enough for this project
- Supports persistent servers (perfect for cron jobs)

---

## 📞 Support

If you encounter issues:
- Check Railway logs for backend errors
- Check Vercel logs for frontend build errors
- Verify all environment variables match between platforms
- Ensure MongoDB Atlas allows connections from Railway IP
- Check Vercel logs for frontend build errors
- Verify all environment variables match between platforms
