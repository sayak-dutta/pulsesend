// const nodemailer = require("nodemailer");
// const fs = require("fs");

// const transporter = nodemailer.createTransport({
// 	host: "smtp.zoho.com",
// 	secure: true,
// 	port: 465,
// 	auth: {
// 		user: "support@pulsesend.com",
// 		pass: "7H2Rjxy3ZYVX",
// 	},
// });

// const sendAdminMail = (userMail, content) => {
// 	const mailOptions = {
// 		from: "support@pulsesend.com",
// 		to: userMail,
// 		subject: "Your OTP",
// 		html: content,
// 	};

// 	transporter.sendMail(mailOptions, function (err, info) {
// 		if (err) {
// 			console.error(err);
// 		}
// 	});
// };

// module.exports = { sendAdminMail };


// var nodemailer = require("nodemailer");
// //-----------------------------------------------------------------------------
// export async function sendMail(subject, toEmail, otpText) {
// 	var transporter = nodemailer.createTransport({
// 		service: "gmail",
// 		auth: {
// 			user: process.env.NODEMAILER_EMAIL,
// 			pass: process.env.NODEMAILER_PW,
// 		},
// 	});

// 	var mailOptions = {
// 		from: process.env.NODEMAILER_EMAIL,
// 		to: toEmail,
// 		subject: subject,
// 		text: otpText,
// 	};

// 	transporter.sendMail(mailOptions, function (error, info) {
// 		if (error) {
// 			throw new Error(error);
// 		} else {
// 			console.log("Email Sent");
// 			return true;
// 		}
// 	});
// }
