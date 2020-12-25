const express = require('express')
const bodyParser= require('body-parser')
const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2
const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
)
oauth2Client.setCredentials({
    refresh_token:process.env.REFRESH_TOKEN
})
const accessToken = oauth2Client.getAccessToken()
const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('website'))
app.get('/', function(req, res){
    res.send(fs.readFileSync('./website/index.html', 'utf8'));

});
app.post('/',(req,res)=>{
    const output=`
	
    <p>You have a new contact request</p>
    <img class="subheader" src="cid:subheader" alt="header">
	<h3>Contact details</h3>
	<ul>
	  <li>FirstName: ${req.body.name}</li>
	  <li>TelNum: ${req.body.telephone}</li>
	  <li>Email: ${req.body.email}</li>
	  <li>Message: ${req.body.message}</li>
	</ul>
	
	`
    const smtpTrans = nodemailer.createTransport({
        service:"gmail",
        auth:{
            type:"OAuth2",
            user:process.env.GMAIL_USER,
            clientId:process.env.CLIENT_ID,
            clientSecret:process.env.CLIENT_SECRET,
            refreshToken:process.env.REFRESH_TOKEN,
            accessToken:accessToken
        }
    })
    const mailOpts = {
        from:process.env.GMAIL_USER,
        to:process.env.RECIPIENT,
        subject:'New message from contact form at masaplast.com',
        html:output,
        attachments: [{
            filename: 'subheader.png',
            path:__dirname + '/website/new changes/subheader.png',
            cid: 'subheader' //same cid value as in the html img src
        }]
    }
    
    smtpTrans.sendMail(mailOpts,(error,response)=>{
        if(error){
            return console.log(error);
            
        }else{
        res.redirect("back")
        res.send(`<script>alert("Email Sent Successfully.")</script>`);
        console.log("Message sent");
        }

    })
    
})


// Setup Server
const port = process.env.PORT || 3000
const server = app.listen(port,listening)
function listening (){
    console.log(`server running on ${port}`)
}