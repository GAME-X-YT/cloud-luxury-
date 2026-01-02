import nodemailer from "nodemailer";

export const sendEmail = async (to: string, subject: string, htmlContent: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    logger: true,
   debug: true,
  });

  await transporter.sendMail({
    from: `"CLOUD LUXURY" <${process.env.EMAIL_USER}>`,
    to,
    subject,
     html: htmlContent,
  });
};


// import nodemailer from "nodemailer";

// export const sendEmail = async (to: string, subject: string, htmlContent: string) => {
//   try {
//     // Use Gmail with App Password
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 587,            // Use 587 for TLS
//       secure: false,        // false for TLS (587)
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS, // App Password, not your Gmail password
//       },tls: {
//       rejectUnauthorized: false // This helps bypass local network blocks
//       },
      
//       logger: true,  // optional, for debugging
//       debug: true,   // optional, for debugging
//     });

//     await transporter.sendMail({
//       from: `"CLOUD LUXURY" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       html: htmlContent,
//     });

//     console.log(`Email sent to ${to}`);
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// };
