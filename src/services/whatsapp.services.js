import axios from 'axios';

// Get API URL with phone number ID
const getWhatsAppApiUrl = () => {
  const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
  return `https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}/messages`;
};

// Send opt-in welcome message
export const sendOptInMessage = async (phoneNumber, carNumber) => {
  try {
    const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
    const WHATSAPP_API_URL = getWhatsAppApiUrl();
    
    const payload = {
      messaging_product: "whatsapp",
      to: phoneNumber,
      type: "template",
      template: {
        name: "hello_world",
        language: {
          code: "en_US"
        }
      }
    };

    const response = await axios.post(WHATSAPP_API_URL, payload, {
      headers: {
        'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    console.log(`✅ Opt-in message sent successfully! Message ID: ${response.data.messages[0].id}`);

    return {
      success: true,
      data: {
        messageId: response.data.messages[0].id,
        to: phoneNumber,
      },
    };
  } catch (error) {
    console.error("WhatsApp Cloud API Opt-in Message Error:", error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.error?.message || error.message,
    };
  }
};

// Send maintenance reminder using template
export const sendWhatsAppMessage = async (phoneNumber, templateName, parameters) => {
  try {
    const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
    const WHATSAPP_API_URL = getWhatsAppApiUrl();
    
    const payload = {
      messaging_product: "whatsapp",
      to: phoneNumber,
      type: "template",
      template: {
        name: templateName,
        language: {
          code: "en"
        },
        components: [
          {
            type: "body",
            parameters: parameters.map(param => ({
              type: "text",
              text: param
            }))
          }
        ]
      }
    };

    const response = await axios.post(WHATSAPP_API_URL, payload, {
      headers: {
        'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    console.log(`✅ WhatsApp message sent successfully! Message ID: ${response.data.messages[0].id}`);

    return {
      success: true,
      data: {
        messageId: response.data.messages[0].id,
        to: phoneNumber,
      },
    };
  } catch (error) {
    console.error("WhatsApp Cloud API Error:", error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.error?.message || error.message,
    };
  }
};

export const sendMaintenanceReminder = async (maintenanceRecord) => {
  const { ownerWhatsAppNumber, carRegistrationNumber, nextServiceDate } = maintenanceRecord;
  
  // Format date for display
  const formattedDate = new Date(nextServiceDate).toLocaleDateString("en-GB");
  
  // Using hello_world template (no parameters needed for standard hello_world)
  const parameters = [];
  
  return await sendWhatsAppMessage(
    ownerWhatsAppNumber,
    "hello_world",
    parameters
  );
};
