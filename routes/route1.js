const fs = require("fs");
const path = require("path");
var notes1 =notes();

function notes() {

  let dataread = fs.readFileSync("./db/db.json", "UTF-8");
  let notesdata = JSON.parse(dataread);
  for (let i = 0; i < notesdata.length; i++) {
    notesdata[i].id = "" + i;
    console.log(notesdata);
  }
  return notesdata;
}

module.exports = (app) => {

  app.get("/api/notes", (req,res) =>{
      notes1 = notes();
      res.json(notes1);
  });

  app.get("api/notes", (req,res)=>{
    notes1.push(req.body);
    res.json(true);
    
  });

  app.post("/api/notes", (req,res) =>{
    notes1.push(req.body);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes1), "UTF-8");
    res.json(true);
  });

  app.delete("/api/notes/:identi", function(req, res) {
    const newidenti = req.params.identi;

    let note = notes1.filter(note => {
      return note.identi === newidenti;
    })[0];

    const identi2 = notes1.indexOf(note);

    notes1.splice(identi2, 1);

    fs.writeFileSync("./db/db.json", JSON.stringify(notes1), "utf8");
    res.json("Note deleted");
  });

};