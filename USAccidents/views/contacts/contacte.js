// const nodemailer = require('nodemailer');

// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'us.accidents2020@gmail.com',
//       pass: 'hamsterulelaputere'
//     }
// })

// var mailOptions = {
//     from: 'us.accidents2020@gmail.com',
//     to: 'adrianapostol89@gmail.com',
//     subject: 'Sending Email using Node.js',
//     text: 'That was easy!'
// };

function printForm(){
    // transporter.sendMail(mailOptions, function(error, info){
    //     if (error) {
    //       console.log(error);
    //     } else {
    //       console.log('Email sent: ' + info.response);
    //     }
    //   }); 
    console.log("sakhdhsajk");
}

async function postData() {
  // Default options are marked with *
  const response = await fetch('/https127.0.0.1:8001',), {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}