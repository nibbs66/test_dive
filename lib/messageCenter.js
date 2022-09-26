

const nodemailer = require('nodemailer');

exports.sendEmail = function({toUser, toEmail, regarding, messageResponse, replyBody}){
    return new Promise((res, rej)=>{
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GOOGLE_USER,
                pass: process.env.GOOGLE_PASSWORD,
            }
        })
        let message;
        if(messageResponse === 'inquiry'){
            message = {
                from: process.env.EMAIL_FROM,
                to:  `${toEmail}`,
                //to: toUser.email---inProduction
                subject: `${regarding}`,
                html: `
                <h3>Hello ${toUser}</h3>
                <p>${replyBody}</p>
               
                <p>RnG Diving</p>
            
            `
            }
        }
        if(messageResponse === 'password'){
            message = {
                from: process.env.EMAIL_FROM,
                to:  `${toEmail}`,
                //to: toUser.email---inProduction
                subject: 'Follow this link to reset your password',
                html: `
                <h3>Hello ${toUser}</h3>
                
                <a>To reset your password, please follow on this link: </p><a target="'_" href='${process.env.PUBLIC_URL}/reset/password/${id}'>Reset Password</a>
                <p>Bedankt,</p>
                <p>RnG Diving</p>
            
            `
            }
        }
        if(messageResponse === 'username'){
            message = {
                from: process.env.EMAIL_FROM,
                to: `${toEmail}`,
                //to: toUser.email---inProduction
                subject: 'Request for Username',
                html: `
                <h3>Hello ${toUser}</h3>
                
                <p>This is to confirm your username.</p>
                <p>Username: ${username}</p>
                <p>Bedankt,</p>
                <p>RnG Diving</p>
            
            `
            }
        }
        if(messageResponse === 'order'){
            message = {
                from: process.env.EMAIL_FROM,
                to:  `${toEmail}`,
                //to: toUser.email---inProduction
                subject:`Confirmation Order Number: ${id}`,
                html: `
                <h3>Hello ${toUser}</h3>
                
                <a>Thank you for your recent order.  You can track your order progress by following the link: </p>
                <a target="'_" href='${process.env.PUBLIC_URL}/order/${id}''>Order Status</a>
                <p>Bedankt,</p>
                <p>RnG Diving</p>

            `
            }
        }
        transporter.sendMail(message, function(err, info){
            if(err){
                rej(err)
            }else{
                res(info)
            }
        })
    })
}
