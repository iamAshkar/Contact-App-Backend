const db = require('./db');

const getContacts = () => {
    return db.Contact.find().then((result) => { 
        if (result) {
            return {
                statusCode: 200,
                contacts: result
            };
        } else {
            return {
                statusCode: 404,
                message: "No data found"
            };
        }
    });
};



const viewContacts =(id)=>{
    return db.Contact.findOne({id}).then((result) => { 
        if (result) {
            return {
                statusCode: 200,
                contacts: result
            };
        } else {
            return {
                statusCode: 404,
                message: "No data found"
            };
        }
    });
};

const addContacts = (id,name,address,email,phone)=>{
    return db.Contact.findOne({id}).then((result) => { 
        if (result) {
            return {
                statusCode: 401,
                message: "Conatact already exist"
            };
        } else {
           const contactData = new db.Contact({id,name,address,email,phone})
           contactData.save()
           return {
            statusCode: 200,
                message: "Conatact added successfully"
           }
        }
    });
};


const deleteContact =(id)=>{
    return db.Contact.deleteOne({id}).then((result)=>{
       if (result) {
        return{
            statusCode:200,
            message:"Contact deleted successfuly"
        }
       }else{
        return{
            statusCode:404,
            message:"no such Contact "
        }
       }
    })
}


const updateContacts = (id,name,address,email,phone)=>{
    return db.Contact.findOne({id}).then((response)=>{
        if(response){
            response.id = id;
            response.name = name;
            response.address = address;
            response.email = email;
            response.phone = phone;

            response.save();
            return{
                statusCode:200,
            message:"Contact edited successfuly"
            }


        }else{
            return{
                statusCode:400,
                message:"no such Contact "
            }
        }
    })
}



module.exports={
    getContacts,
    viewContacts,
    addContacts,
    deleteContact,
    updateContacts
}
