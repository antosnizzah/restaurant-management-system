"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRegistrationEmailTemplate = exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const sendEmail = async (email, subject, userName, message, html) => {
    try {
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: `${subject}`,
            text: message,
            html: html
        };
        const mailRes = await transporter.sendMail(mailOptions);
        console.log('mailRes', mailRes);
        let mailResponse = '';
        if (mailRes.accepted.length > 0) {
            mailResponse = 'Email sent successfully';
        }
        else if (mailRes.rejected.length > 0) {
            mailResponse = 'Email not sent';
        }
        else {
            mailResponse = 'Email server error';
        }
        return mailResponse;
    }
    catch (error) {
        return JSON.stringify(error.message, null, 500);
    }
};
exports.sendEmail = sendEmail;
const sendRegistrationEmailTemplate = async (userEmail, eventName, UserName, imageUrl) => {
    try {
        const templatePath = path_1.default.join(__dirname, '../views/emails/value3.ejs');
        const html = await ejs_1.default.renderFile(templatePath, { UserName, eventName, imageUrl });
        const subject = `Confirmation: You have ${eventName}`;
        const message = `Hello 👋🏻 ${UserName}, we hope you enjoy our services. Thank you for choosing us.`;
        const mailRes = await (0, exports.sendEmail)(userEmail, subject, UserName, message, html);
        return mailRes;
    }
    catch (error) {
        return JSON.stringify(error.message, null, 500);
    }
};
exports.sendRegistrationEmailTemplate = sendRegistrationEmailTemplate;
