# WhatsApp Business API Setup Guide

## Current Status: Mock Mode Active ✅

Your application is currently running in **Mock Mode**, which means:
- ✅ You can test all functionality without WhatsApp credentials
- ✅ Console logs will show simulated message previews
- ✅ No real messages are sent (no costs incurred)
- ✅ All endpoints work normally

When you see messages in the console, the app is working correctly in mock mode!

---

## Setting Up WhatsApp Business API (When Ready)

### Prerequisites
- Facebook Business Account
- Meta Business Manager access
- A phone number for WhatsApp Business (can't be used on regular WhatsApp)
- Verified business

### Step-by-Step Setup

#### 1. **Create Meta App**
1. Go to [Meta for Developers](https://developers.facebook.com/)
2. Click "My Apps" → "Create App"
3. Choose "Business" as app type
4. Fill in app details and create

#### 2. **Add WhatsApp Product**
1. In your app dashboard, find "Add Products"
2. Select "WhatsApp" and click "Set Up"
3. Follow the setup wizard

#### 3. **Get Your Phone Number ID**
1. In WhatsApp setup, go to "API Setup"
2. You'll see **Phone Number ID** (starts with a number like `123456789012345`)
3. Copy this - you'll need it for `.env`

#### 4. **Get Your Access Token**

**Temporary Token (for testing - 24 hours):**
1. In WhatsApp API Setup page
2. Copy the temporary access token shown
3. Use this for initial testing

**Permanent Token (for production):**
1. Go to "Business Settings" → "System Users"
2. Create a system user
3. Add assets (your WhatsApp app)
4. Generate a permanent token with `whatsapp_business_messaging` permission

#### 5. **Create Message Template**
1. Go to WhatsApp Manager
2. Click "Message Templates" → "Create Template"
3. Use these details:

**Template Name:** `maintenance_reminder`  
**Category:** Utility  
**Language:** English

**Body:**
```
Hello! Your car {{1}} is due for maintenance on {{2}}. Please schedule your service appointment soon to keep your vehicle in top condition.
```

**Variables:**
- {{1}} = Car registration number
- {{2}} = Service date

**Footer (optional):**
```
Thank you for using our Auto-Reminder service!
```

4. Submit for approval (usually takes a few hours)

#### 6. **Update Your .env File**

Once you have the credentials, update your `.env`:

```env
# WhatsApp Configuration
WHATSAPP_ACCESS_TOKEN=your_access_token_here
PHONE_NUMBER_ID=your_phone_number_id_here

# Example:
# WHATSAPP_ACCESS_TOKEN=EAABsb1ZC2...
# PHONE_NUMBER_ID=123456789012345
```

#### 7. **Restart Your Server**

After adding credentials, restart your Node.js server. The app will automatically switch from **Mock Mode** to **Real Mode**.

---

## Testing the Integration

### In Mock Mode (Current):
```bash
# Create a test record
curl -X POST http://localhost:8000/api/v1/car-maintenance \
  -H "Content-Type: application/json" \
  -d '{
    "carRegistrationNumber": "MH12AB1234",
    "ownerWhatsAppNumber": "+919876543210",
    "lastServiceDate": "2026-01-01",
    "meterReading": 15000,
    "serviceCost": 5000
  }'

# Test the WhatsApp reminder (check console for mock message)
curl -X POST http://localhost:8000/api/v1/car-maintenance/<RECORD_ID>/test-reminder
```

### With Real Credentials:
Same commands, but messages will be sent to actual WhatsApp numbers!

---

## Important Notes

### Phone Number Format
- Must include country code with `+`
- Example: `+919876543210` (India)
- Example: `+14155552671` (USA)

### Rate Limits (Free Tier)
- 1,000 conversations per month (free)
- Additional conversations are charged
- Each 24-hour conversation window counts as 1 conversation

### Template Approval
- Templates must be approved before use
- Approval usually takes a few hours
- Rejections happen if templates are too promotional

### Testing Phone Numbers
Meta provides test numbers you can use:
- Go to WhatsApp API Setup
- Look for "Send and receive messages" section
- You can add up to 5 phone numbers for testing

---

## Costs

### Free Tier
- First 1,000 conversations/month: **FREE**
- After that: Varies by country (~$0.005-$0.09 per conversation)

### Conversation Definition
- A 24-hour window starting when you send a message
- Multiple messages in 24 hours = 1 conversation

---

## Troubleshooting

### "Message failed to send"
- Check if template is approved
- Verify phone number format (must have country code)
- Ensure access token is valid

### "Template not found"
- Template name must exactly match (case-sensitive)
- Template must be approved
- Check template is for correct WhatsApp Business Account

### "Invalid phone number"
- Phone number must be registered on WhatsApp
- Must include country code with `+`
- For testing, add number to test phone numbers list

---

## When You're Ready to Go Live

1. ✅ Complete business verification on Meta
2. ✅ Create and get template approved
3. ✅ Generate permanent access token
4. ✅ Add credentials to `.env`
5. ✅ Test with a real number
6. ✅ Deploy to production

---

## Support Resources

- [WhatsApp Business Platform Docs](https://developers.facebook.com/docs/whatsapp)
- [Template Guidelines](https://developers.facebook.com/docs/whatsapp/message-templates/guidelines)
- [Meta Business Support](https://business.facebook.com/business/help)

---

**Current Status:** Application is fully functional in Mock Mode. When credentials are added, it will automatically switch to sending real WhatsApp messages.
