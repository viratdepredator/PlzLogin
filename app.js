//jshint esversion:6
const exp=require("express");
const app=exp();
const bp=require("body-parser");
const http=require('https');
app.use(exp.static("public"));
app.use(bp.urlencoded({extended:true}));

app.get('/',function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post('/',function(rq,rs){
  const fname=rq.body.fname;
  const lname=rq.body.lname;
  const em=rq.body.email;
  const data ={
    members:[
      {
        email_address: em,
        status:"subscribed",
        merge_fields:{
        FNAME: fname,
        LNAME: lname
      }
      }
    ]
  };
  const jData=JSON.stringify(data);
  const url="#";
  const option={
    method:"post",
    auth:"Viratdep:022ad29ce67e43ecd20b2f121cb77266-us8"
  };
  const req=http.request(url,option,function(rp){
    if(rp.statusCode==200){
        rs.sendFile(__dirname+"/success.html");
    }
    else{
      rs.sendFile(__dirname+"/failure.html");
    }
    rp.on("data",function(dt){
      console.log(JSON.parse(dt));
    });
  });
  req.write(jData);
  req.end();

});
app.post('/failure',function(rq,rs){
  rs.redirect('/');
});
app.listen(process.env.PORT||1409,function(){
  console.log("Port 1409 is on way & now it's running");
});
//API key
// 022ad29ce67e43ecd20b2f121cb77266-us8
//Audience key
//07d211caa8
