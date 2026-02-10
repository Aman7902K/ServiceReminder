import cron from "node-cron";
import { CarMaintenance } from "../models/carmaintenance.model.js";
import { sendMaintenanceReminder, sendOptInMessage } from "./whatsapp.services.js";

/**
 * Check for new records and send opt-in messages
 * Check for records 1 minute after opt-in and send maintenance reminders
 */
const checkAndSendReminders = async () => {
  try {
    console.log("Running maintenance reminder check...");
    
    // STEP 1: Send opt-in messages to newly created records
    const oneMinuteAgo = new Date();
    oneMinuteAgo.setMinutes(oneMinuteAgo.getMinutes() - 1);
    
    const newRecords = await CarMaintenance.find({
      createdAt: {
        $gte: oneMinuteAgo,
      },
      optInMessageSent: false,
    });
    
    if (newRecords.length > 0) {
      console.log(`Found ${newRecords.length} new records - sending opt-in messages`);
      
      for (const record of newRecords) {
        try {
          const result = await sendOptInMessage(record.ownerWhatsAppNumber, record.carRegistrationNumber);
          
          if (result.success) {
            record.optInMessageSent = true;
            record.optInMessageSentAt = new Date();
            await record.save();
            console.log(`✓ Opt-in message sent for car: ${record.carRegistrationNumber}`);
          } else {
            console.error(`✗ Failed to send opt-in for car: ${record.carRegistrationNumber}`, result.error);
          }
        } catch (error) {
          console.error(`Error sending opt-in for car: ${record.carRegistrationNumber}`, error);
        }
      }
    }
    
    // STEP 2: Send maintenance reminders to records 1 minute after opt-in
    const twoMinutesAgo = new Date();
    twoMinutesAgo.setMinutes(twoMinutesAgo.getMinutes() - 2);
    
    const optedInRecords = await CarMaintenance.find({
      optInMessageSent: true,
      optInMessageSentAt: {
        $gte: twoMinutesAgo,
        $lt: oneMinuteAgo,
      },
      reminderSent: false,
    });
    
    if (optedInRecords.length > 0) {
      console.log(`Found ${optedInRecords.length} records ready for maintenance reminder`);
      
      for (const record of optedInRecords) {
        try {
          const result = await sendMaintenanceReminder(record);
          
          if (result.success) {
            record.reminderSent = true;
            await record.save();
            console.log(`✓ Maintenance reminder sent for car: ${record.carRegistrationNumber}`);
          } else {
            console.error(`✗ Failed to send maintenance reminder for car: ${record.carRegistrationNumber}`, result.error);
          }
        } catch (error) {
          console.error(`Error sending maintenance reminder for car: ${record.carRegistrationNumber}`, error);
        }
      }
    }
    
    console.log("Maintenance reminder check completed");
  } catch (error) {
    console.error("Error in checkAndSendReminders:", error);
  }
};

/**
 * Initialize the cron job to run every minute for testing
 */
export const initCronJobs = () => {
  // FOR TESTING: Run every minute
  // Format: second minute hour day month weekday
  cron.schedule("* * * * *", checkAndSendReminders, {
    timezone: "Asia/Kolkata", // Adjust timezone as needed
  });
  
  console.log("✓ Cron job initialized: Maintenance reminder check every 1 minute (TESTING MODE)");
  
  // Optional: Run immediately on startup for testing
  // Uncomment the next line if you want to test the cron job on server start
  // checkAndSendReminders();
};

// Export for manual testing
export { checkAndSendReminders };
