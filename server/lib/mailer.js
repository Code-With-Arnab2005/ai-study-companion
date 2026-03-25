import nodemailer from 'nodemailer';

export const sendMail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.GMAIL_ADDRESS,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        const info = await transporter.sendMail({
            from: "Easy Solution",
            to,
            subject,
            text,
        });

        console.log("Message sent:", info.messageId);
        return info;
    } catch (error) {
        console.log("Error sending mail");
        throw error;
    }

}