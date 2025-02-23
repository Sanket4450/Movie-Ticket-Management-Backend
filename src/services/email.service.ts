import { Transporter, createTransport } from 'nodemailer'
import { SendEmail } from '../types/email'

export default class EmailService {
  private transporter: Transporter

  constructor() {
    this.transporter = createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })
  }

  async sendEmail({ to, subject, content }: SendEmail) {
    try {
      await this.transporter.sendMail({
        from: `"${process.env.EMAIL_NAME}" <${process.env.EMAIL_USER}>`,
        to: to,
        subject: subject,
        html: content,
      })
    } catch (error) {
      console.error(`Error sending email: ${to} ${error}`)
    }
  }
}
