import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN 
const client = twilio(accountSid, authToken);


// Send opt-in welcome message
export const sendOptInMessage = async (phoneNumber, carNumber) => {
  try {
    const message = await client.messages.create({
      body: `Welcome! Thank you for registering your vehicle ${carNumber}. You will receive maintenance reminders for this vehicle.`,
      from: 'whatsapp:+14155238886',
      to: `whatsapp:+${phoneNumber}`
    });

    

    console.log(`✅ Opt-in message sent successfully! SID: ${message.sid}`);

    return {
      success: true,
      data: {
        sid: message.sid,
        status: message.status,
        to: phoneNumber,
      },
    };
  } catch (error) {
    console.error("Twilio Opt-in Message Error:", error.message);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Send maintenance reminder using template
export const sendWhatsAppMessage = async (phoneNumber, templateName, parameters) => {
  // Send actual WhatsApp message using Twilio Content Template
  try {
    // Create content variables JSON with car number and date
    const contentVariables = JSON.stringify({
      "1": parameters[0], // Car registration number
      "2": parameters[1]  // Service date
    });
    
    const message = await client.messages.create({
      from: 'whatsapp:+14155238886',
      contentSid: 'HXb5b62575e6e4ff6129ad7c8efe1f983e',
      contentVariables: contentVariables,
      to: `whatsapp:+${phoneNumber}`
    });

    console.log(`✅ WhatsApp message sent successfully! SID: ${message.sid}`);

    return {
      success: true,
      mock: false,
      data: {
        sid: message.sid,
        status: message.status,
        to: phoneNumber,
      },
    };
  } catch (error) {
    console.error("Twilio WhatsApp API Error:", error.message);
    return {
      success: false,
      mock: false,
      error: error.message,
    };
  }
};


export const sendMaintenanceReminder = async (maintenanceRecord) => {
  const { ownerWhatsAppNumber, carRegistrationNumber, nextServiceDate } = maintenanceRecord;
  
  // Format date for display
  const formattedDate = new Date(nextServiceDate).toLocaleDateString("en-GB");
  
  // Template parameters: Car Number, Service Date
  const parameters = [carRegistrationNumber, formattedDate];
  
  return await sendWhatsAppMessage(
    ownerWhatsAppNumber,
    "maintenance_reminder",
    parameters
  );
};
