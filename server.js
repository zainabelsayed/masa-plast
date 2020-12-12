const express = require('express')
const bodyParser= require('body-parser')
const nodemailer = require('nodemailer')
const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('website'))
app.get('/', function(req, res){
    res.send(fs.readFileSync('./website/index.html', 'utf8'));

});
app.post('/contact',(req,res)=>{
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
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        requireTLS:true,
        auth:{
            user:process.env.GMAIL_USER,
            pass:process.env.GMAIL_PASS
        }
    })
    const mailOpts = {
        from:process.env.GMAIL_USER,
        to:'eng.zainab92@gmail.com',
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
        
        console.log("Message sent");
        res.redirect('/')
        }

    })
    
})


// Setup Server
const port = process.env.PORT || 3000
const server = app.listen(port,listening)
function listening (){
    console.log(`server running on ${port}`)
}