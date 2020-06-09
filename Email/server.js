var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'us.accidents2020@gmail.com',
    pass: 'hamsterulelaputere'
  }
});

var mailOptions = {
  from: 'us.accidents2020@gmail.com',
  to: 'us.accidents2020@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

const http = require('http');
const port = process.env.PORT || 8001;

//Start the server
http.createServer(function (request, response) {
    //See request
    console.log('request', request.method, request.url)

    if (request.method == "POST") {
        postHandler(request,response);      
    }
    else {
        response.writeHead(405, { 'Content-Type': 'text/html' })
        response.end("method is not supported")
    }

}).listen(port)

//Show server running
serverRunningTxt = 'Server running at http://127.0.0.1:' + port + '/'
console.log(serverRunningTxt)

async function postHandler(request, response) {
    //Used for getting the request data
    let obj

    //Get the data
    request.on('data', function (data) { 
        obj = JSON.parse(data)
    })

    request.on('end', function () {
        update(obj, response, false)
    })
}

