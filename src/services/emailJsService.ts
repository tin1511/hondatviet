import emailjs from '@emailjs/browser';

/**
 * Cấu hình EmailJS phục vụ gửi mã xác thực OTP
 * Bạn có thể khai báo các biến môi trường trong file .env:
 * VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
 * VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
 * VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
 */

export interface EmailJSOtpPayload {
  toEmail: string;
  toName?: string;
  otpCode: string;
  expireMinutes?: number;
}

export const EMAILJS_CONFIG = {
  serviceId: (import.meta as any).env?.VITE_EMAILJS_SERVICE_ID || '',
  templateId: (import.meta as any).env?.VITE_EMAILJS_TEMPLATE_ID || '',
  publicKey: (import.meta as any).env?.VITE_EMAILJS_PUBLIC_KEY || '',
};

export const emailJsService = {
  /**
   * Kiểm tra xem EmailJS đã được cấu hình đủ biến môi trường chưa
   */
  isConfigured(): boolean {
    return Boolean(
      EMAILJS_CONFIG.serviceId &&
      EMAILJS_CONFIG.templateId &&
      EMAILJS_CONFIG.publicKey
    );
  },

  /**
   * Gửi OTP trực tiếp qua EmailJS SDK
   */
  async sendOtp(payload: EmailJSOtpPayload): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const serviceId = EMAILJS_CONFIG.serviceId;
    const templateId = EMAILJS_CONFIG.templateId;
    const publicKey = EMAILJS_CONFIG.publicKey;

    if (!serviceId || !templateId || !publicKey) {
      return {
        success: false,
        error: 'Chưa cấu hình VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID hoặc VITE_EMAILJS_PUBLIC_KEY trong .env'
      };
    }

    try {
      const templateParams = {
        to_email: payload.toEmail,
        to_name: payload.toName || 'Quý khách',
        otp_code: payload.otpCode,
        passcode: payload.otpCode,
        code: payload.otpCode,
        expire_time: `${payload.expireMinutes || 5} phút`,
        company_name: 'Hồn Đất Việt - HeritageAI',
        app_name: 'Hồn Đất Việt'
      };

      const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);

      if (response.status === 200) {
        return { success: true, messageId: response.text };
      } else {
        return { success: false, error: `EmailJS trả về mã lỗi: ${response.status} - ${response.text}` };
      }
    } catch (err: any) {
      console.error('[EmailJS Send Error]:', err);
      return {
        success: false,
        error: err?.text || err?.message || 'Không thể gửi email OTP qua EmailJS'
      };
    }
  }
};
