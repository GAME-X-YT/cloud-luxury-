import nodemailer from "nodemailer";

export const sendEmail = async (to: string, subject: string, text: string) => {
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
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  });
};


// import nodemailer from "nodemailer";

// export const sendEmail = async (to: string, subject: string, text: string) => {
//   try {
//     // Use Gmail with App Password
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 587,            // Use 587 for TLS
//       secure: false,        // false for TLS (587)
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS, // App Password, not your Gmail password
//       },
//       logger: true,  // optional, for debugging
//       debug: true,   // optional, for debugging
//     });

//     await transporter.sendMail({
//       from: `"CLOUD LUXURY" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       text,
//     });

//     console.log(`Email sent to ${to}`);
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// };
