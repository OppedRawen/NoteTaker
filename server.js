const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT =3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
app.get('/notes',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/notes.html'))
});

app.get('/api/notes',(req,res)=>{
    console.info(`${req.method} for something`);
    fs.readFile('./db/db.json','utf-8',function(err,data){
        if(err){
            console.error(err);
        }else{
            res.json(JSON.parse(data));
            
        }
    })
});

app.post('/api/notes',(req,res)=>{
    console.info(`${req.method} request received to notes`);

    const {title,text} = req.body;
    if(req.body){
        const newNotes = {
            title,
            text,
            notes_id: uuid(),
        };
        const string = JSON.stringify(newNotes);

        fs.writeFile('./db/db.json',string,(err)=>{
            err
                ? console.error(err)
                :console.log(`notes has been added`);
        });
        res.json('notes added');
    }else{
        res.error("error adding notes");
    }
    
});

function uuid(){
    const num =  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
return num;
}
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);