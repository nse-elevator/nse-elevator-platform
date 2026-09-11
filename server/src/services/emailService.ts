import nodemailer from 'nodemailer';
import { config } from '../config/env';
import { ILead } from '../models/Lead';

// Create Nodemailer transporter
let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (!transporter) {
    if (config.EMAIL_SERVICE_API_KEY) {
      // SendGrid or custom SMTP credentials
      transporter = nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: 'apikey',
          pass: config.EMAIL_SERVICE_API_KEY,
        },
      });
    } else {
      // Development mock transporter (using ethereal or JSON stream)
      transporter = nodemailer.createTransport({
        streamTransport: true,
        newline: 'windows',
      });
    }
  }
  return transporter;
}

export async function sendLeadNotificationEmail(lead: ILead): Promise<{ success: boolean; messageId?: string }> {
  try {
    const transport = getTransporter();

    const subject = `[New Elevator Service Lead] ${lead.propertyType ? `[${lead.propertyType.toUpperCase()}]` : ''} ${lead.buildingName || lead.name} (${lead.elevatorCount} Car${lead.elevatorCount > 1 ? 's' : ''})`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #1E293B; border-radius: 4px; overflow: hidden;">
        <div style="background-color: #0B1118; color: #FFFFFF; padding: 20px; border-bottom: 3px solid #E63920;">
          <h2 style="margin: 0; font-size: 18px; text-transform: uppercase;">NSE – New Sahyadri Elevator (Central Dispatch)</h2>
          <p style="margin: 5px 0 0 0; font-size: 12px; color: #94A3B8;">New AMC / Breakdown Inquiry Received</p>
        </div>
        
        <div style="padding: 20px; background-color: #F8FAFC;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #64748B; width: 140px;"><strong>Client Name:</strong></td>
              <td style="padding: 8px 0; color: #0F172A;">${lead.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748B;"><strong>Direct Phone:</strong></td>
              <td style="padding: 8px 0; color: #E63920; font-weight: bold;">${lead.phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748B;"><strong>Email Address:</strong></td>
              <td style="padding: 8px 0; color: #0F172A;"><a href="mailto:${lead.email}">${lead.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748B;"><strong>Building Name:</strong></td>
              <td style="padding: 8px 0; color: #0F172A;">${lead.buildingName || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748B;"><strong>Property Address:</strong></td>
              <td style="padding: 8px 0; color: #0F172A;">${lead.address || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748B;"><strong>Property Category:</strong></td>
              <td style="padding: 8px 0; color: #0F172A;">${lead.propertyType || 'Commercial'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748B;"><strong>Elevator Unit Count:</strong></td>
              <td style="padding: 8px 0; color: #0F172A;">${lead.elevatorCount}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748B;"><strong>Service Urgency:</strong></td>
              <td style="padding: 8px 0; color: #0F172A;">${lead.serviceUrgency || 'Standard Request'}</td>
            </tr>
          </table>

          ${lead.message ? `
            <div style="margin-top: 15px; padding: 12px; background-color: #FFFFFF; border: 1px solid #CBD5E1; border-radius: 2px;">
              <strong style="font-size: 12px; color: #64748B; text-transform: uppercase;">Message / Scope:</strong>
              <p style="margin: 6px 0 0 0; font-size: 13px; color: #334155;">${lead.message}</p>
            </div>
          ` : ''}

          <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #E2E8F0; font-size: 11px; color: #94A3B8;">
            <span>Lead Source: ${lead.source}</span> | 
            <span>Timestamp: ${new Date().toISOString()}</span>
          </div>
        </div>
      </div>
    `;

    const info = await transport.sendMail({
      from: config.EMAIL_FROM,
      to: config.LEAD_NOTIFICATION_EMAIL,
      subject,
      html: htmlContent,
    });

    console.log(`[EmailService] Notification sent for lead ${lead.id}. MessageId: ${info.messageId || 'mock-id'}`);
    return { success: true, messageId: info.messageId || 'mock-id' };
  } catch (error) {
    console.error('[EmailService] Error sending lead notification email:', error);
    // Return gracefully so lead capture does not fail if email provider is unreachable
    return { success: false };
  }
}
