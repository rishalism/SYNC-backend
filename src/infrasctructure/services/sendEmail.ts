import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import dotenv from 'dotenv'
dotenv.config()

export default class sendEmail {

    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport(
            {
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            }
        )
    }

    sendEmail(emailId: string, subject: string, content: string): void {
        const mailOptions: nodemailer.SendMailOptions = {
            from: process.env.EMAIL_USER,
            to: emailId,
            subject,
            html: content,
        };

        this.transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log("Failed to send email. Error:", err);
            } else {
                console.log(`Email sent successfully to ${emailId}. Response: ${info.response}`);
            }
        });
    }

    generateMailTemplate(email: Mailgen.Content): string {
        const mailGenerator = new Mailgen({
            theme: 'default',
            product: {
                name: 'SYNC',
                link: process.env.CORS_URL || "",
            }
        });

        return mailGenerator.generate(email);
    }

    sendOtpMail(emailID: string, name: string, otp: string): void {
        const subject = "SYNC Account Verification";
        const email = {
            body: {
                name: name,
                intro: "Welcome to SYNC !!",
                instructions: "Please click the button below to verify your email address.",
                action: {
                    instructions: `Hello ${name},

Your One-Time Password (OTP) for Sync is: ${otp}

Please enter this OTP to complete your verification process. This OTP will expire in ${process.env.OTP_TIMER} minutes.

If you did not request this OTP, please ignore this email.

Thank you,
The Sync Team`,
                    button: {
                        color: "#000000",
                        text: "Verify Now",
                        link: `${process.env.CORS_URL}/verify-otp?otp=${otp}` // Ideally, this should be a valid link
                    }
                },
                outro: "Thank you for using SYNC!!",
            }
        };

        const content = this.generateMailTemplate(email);
        this.sendEmail(emailID, subject, content);
    }


    sendInvitationMail(emailId: string, projectOwner: string, url: string) {
        const subject = "You're Invited to a Project on SYNC!";
        const email = {
            body: {
                name: emailId,
                intro: `You've been invited to join the project`,
                instructions: "Click the button below to accept the invitation and get started.",
                action: {
                    instructions: `Hey ${emailId},
        
        You've been invited to join the project  by the project owner  ${projectOwner}.
        
        We're excited to have you on board! Click the button below to join the project and start collaborating.
        
        If this wasn't expected, you can ignore this email.
        
        Thanks,
        The Sync Team`,
                    button: {
                        color: "#007BFF", // A friendly, inviting color
                        text: "Join Project",
                        link: url // Ensure this is a valid link
                    }
                },
                outro: "Looking forward to working with you!",
            }
        };

        const content = this.generateMailTemplate(email);
        this.sendEmail(emailId, subject, content);
    }


}
