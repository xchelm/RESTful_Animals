const express = require('express'),
      app = express(),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override');

app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/animals');

let animalSchema = new mongoose.Schema({
   name: String,
   image: String,
   age: Number
});

let Animal = mongoose.model('animal', animalSchema);

app.get('/', function(req, res){
    res.redirect('/animals');
});

app.get('/animals', function(req, res){
   Animal.find({}, function(err, animal){
       if(err){
           res.redirect('/animlas');
       } else {
         res.render('index', {animal: animal});
       }
   });
});

app.get('/animals/new', function(req, res){
   res.render('new');
});

app.post('/animals', function(req, res){
    Animal.create(req.body.animal, function(err, added){
        if(err){
            res.redirect('/aniamls/new');
        } else {
            res.redirect('/animals' );
        }
    });
});

app.get('/animals/:id', function(req, res){
   Animal.findById(req.params.id, function(err, animal){
       if(err){
           res.redirect('/animals');
       } else {
           res.render('show', {animal: animal})
       };
   });
});

app.get('/animals/:id/edit', function(req, res){
    Animal.findById(req.params.id, function(err, animal){
      if(err){
          res.redirect('/animals');
      }  else {
          res.render('edit', {animal: animal});
      }
    });
});

app.put('/animals/:id', function(req, res){
   Animal.findByIdAndUpdate(req.params.id, req.body.animal, function(err, animal){
        if(err){
            res.redirect('/animals');
        }  else {
            res.redirect('/animals/' + req.params.id);
        }
   });
});

app.delete('/animals/:id', function(req, res){
   Animal.findByIdAndRemove(req.params.id, function(err, animal){
       if(err){
           res.redirect('/animals');
       } else {
           res.redirect('/animals');
       }
   });
});

app.listen(3000, function(){
    console.log('The server is running');
});