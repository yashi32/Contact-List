const express= require('express');
const port=8000;
const path=require('path');
const db= require('./config/mongoose');

const Contact= require('./models/contact');
const app=express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());

app.use(express.static('assets'));
//Middleware1
//app.use(function(req,res,next)
/*{
    console.log("Middleware 1 is running ");
    next();
})*/
var contactList=[
    {
        'name':"Yashi Bagoli",
       
        'phoneNo':'9811892192'

    } ,

    {
        'name':"Karthik Bagoli",
        
        'phoneNo':'9811892193'

    },
    {
        'name':"Deepa Bagoli",
        
        'phoneNo':'8860066486'

    },

    {
        'name':"R.c Bagoli",
      
        'phoneNo':'97281123467'

    }
];
app.get('/',function(req,res)
{

    Contact.find({},function(err,contactList){

        if(err)
        {
            console.log("Error in fetching the data");
            return;
        }
        res.render('home',{
            title:"Contact List",
            contact_list:contactList });
})
});

    

app.get('/practise',function(req,res)
{
    res.render('practise',{title: "Welcome to practise page"});
})

//Adding a Contact 

app.post('/contact-list',function(req,res)
    {   
        console.log(req.body);
      // return  res.redirect('/practise');
      console.log(req.body.name);
      console.log(req.body.phone);
      /*contactList.push(
          {
              name:req.body.name,
              phoneNo:req.body.phone
          });

      return res.redirect('/');


    })*/

    Contact.create(
    {
        name:req.body.name,
        phone:req.body.phone
    },
    function(err,newContact)
    {
        if(err)
        {
            console.log('Error in creating a contact');
            return;
        }
        console.log("**********",newContact);
        return res.redirect('back');

    })
});


    //delete a contact 

    app.get('/delete-contact',function(req,res)
    {
        console.log(req.query);
        let id= req.query.id;

        //Using Delete command in databases
        Contact.findByIdAndDelete(id,function(err)
        {
            if(err)
            {
                console.log("error in deleting object from database");
                return
            }
            return res.redirect('back');
        })
        
        /*let contactIndex=contactList.findIndex(contact=> contact.phoneNo==phone)
        
        if(contactIndex!=-1)
        {
            contactList.splice(contactIndex,1);
        }
        return res.redirect('back');*/
    });

app.listen(port,function(err){
    if(err)
    {
        console.log('Error! server not running');
        return;
    }
    console.log('Server is running successfully on port ', port)

});
