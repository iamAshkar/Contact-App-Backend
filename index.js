const express = require("express");
const cors = require("cors");
const logic = require("./Services/logic");
const contactServer = express();

contactServer.use(
  cors({
    origin: "http://localhost:5173",
  })
);

contactServer.use(express.json());

contactServer.listen(2001, () => {
  console.log("contact server listening on the port 2001");
});

contactServer.get("/", (req, res) => {
  res.send("contact server");
});

// http://localhost:2001/api/get-all-contacts

contactServer.get(`/api/get-all-contacts`, (req, res) => {
  logic
    .getContacts()
    .then((response) => {
      res.status(response.statusCode).json(response);
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// http://localhost:2001/api/view-contacts/1

contactServer.get(`/api/view-contacts/:id`, (req, res) => {
  logic.viewContacts(req.params.id).then((response) => {
    res.status(response.statusCode).json(response);
  });
});

// http://localhost:2001/api/add-contacts

contactServer.post(`/api/add-contacts`, (req, res) => {
  logic
    .addContacts(
      req.body.id,
      req.body.name,
      req.body.address,
      req.body.email,
      req.body.phone
    )
    .then((response) => {
      res.status(response.statusCode).json(response);
    });
});

// http://localhost:2001/api/delete-contacts/2

contactServer.delete(`/api/delete-contacts/:id`,(req,res)=>{
  logic.deleteContact(req.params.id,).then((response)=>{
    res.status(response.statusCode).json(response)
  })
})


// http://localhost:2001/api/update-contacts/2


contactServer.post(`/api/update-contacts/:id`,(req,res)=>{
  logic.updateContacts(req.params.id,req.body.name,
    req.body.address,
    req.body.email,
    req.body.phone)
    .then((response)=>{
    res.status(response.statusCode).json(response)
  })
})