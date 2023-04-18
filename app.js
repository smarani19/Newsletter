const express = require("express")
const app = express()
const bodyParser = require("body-parser") 
const request = require("request")
const https=require("https")

app.use(express.static(__dirname)); 
app.use(bodyParser.urlencoded({extended: true})) ;

app.get("/" , function(req,res){
 res.sendFile(__dirname+"/signup.html")
})

app.post("/", function(req,res){

    const firstname = req.body.fname ;
    const lastname= req.body.lname ;
    const mail = req.body.email ;

    const data ={
        members: [
            {
                email_address: mail,
                status: "subscribed",
                merge_fields:{
                    FNAME : firstname,
                    LNAME: lastname 
                }
            }
        ]
    } 

 const jsonData = JSON.stringify(data)

 const url = "https://us21.api.mailchimp.com/3.0/lists/4987147ef9"
 const options={
  method: "POST",
  auth: "smb:bad89b1265436e1c05256b62c037eb08-us21"
 }

 const request  =  https.request(url, options, function(response){

   if( response.statusCode==200){
    res.sendFile(__dirname+"/success.html")
   }
   else{
    res.sendFile(__dirname+"/failure.html")
   }
   response.on("data" , function(data){
    console.log(JSON.parse(data)) ; 
   })
 })
 
 request.write(jsonData) ;
 request.end() ; 

})

// method to return back to thee home route on clicking the "try again button" in the failure page
app.post("/failure", function(req,res){
    res.redirect("/") ; //redirecting to the home ruote
})

app.listen(process.env.PORT || 3000 , function(){
    console.log("server is running on port 3000..")
})

//API KEY
//bad89b1265436e1c05256b62c037eb08-us21

//list id
// 4987147ef9