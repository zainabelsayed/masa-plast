const express = require('express')
//const bodyParser= require('body-parser')
const multiparty = require('multiparty')
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
//app.use(express.json());
//app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('website'))
app.get('/', function(req, res){
    res.send(fs.readFileSync('./website/index.html', 'utf8'));
});
app.post('/contact',(req,res)=>{
    let form = new multiparty.Form()
    let data = {}
    form.parse(req,function(err,fields){
        console.log(fields)
        Object.keys(fields).forEach(function(property){
            data[property]=fields[property].toString()
        })
    })
    const output=`
	
    <p>You have a new contact request</p>
    <img class="subheader" src="cid:subheader" alt="header">
	<h3>Contact details</h3>
	<ul>
	  <li>FirstName: ${data.name}</li>
	  <li>TelNum: ${data.telephone}</li>
	  <li>Email: ${data.email}</li>
	  <li>Message: ${data.message}</li>
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
        console.log(error);
            
        }else{
         response.status(200).send("لقد تم إرسال الرسالة بنجاح.");
        }

    })
    
})


// Setup Server
const port = process.env.PORT || 3000
const server = app.listen(port,listening)
function listening (){
    console.log(`server running on ${port}`)
}