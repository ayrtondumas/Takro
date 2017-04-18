var mongoose = require('mongoose')
var path = require('path')

// Schémas MongoDB --------------------------------
    var Tag = mongoose.model('Tag')
    var Document = mongoose.model('Document')
// ------------------------------------------------


var documentsFunctions = {

  // liste de tous les documents ----------------------------
  getAllDocuments: function(req, res) {
    Document.find({})
    .populate('author').populate('comments').populate('tags')
    .exec((err, documents) => {
      if(err){
        return res.send(err);
      }
      return res.json(documents);
    });
  },
  // ---------------------------------------------------------


  // Upload d'un fichier -------------------------------------
  uploadDocument: function(req, res) {

    var document = new Document()
    document.filename = req.body.filename.trim().toUpperCase()
    if (req.files) {
      req.files.document.mv(path.resolve(__dirname ,'../../../uploads/' + document._id) , function(err) {
          if (err) {
            res.send("File not uploaded: " + err);
          }

          var tags = req.body.tags.split(",").map((tag) => { return tag.toUpperCase()})

          Tag.find({'label':
            {$in: tags
            }},function(err,oldTags){

            if(err) res.send(err);
            var tags_id = [];
            var db_labels = [];
            var db_ids = [];

            for (var i = 0; i < oldTags.length; i++) {
              db_labels.push( oldTags[i].label.trim().toUpperCase() );
              db_ids.push( oldTags[i]._id );
            }

            for (var i = 0; i < tags.length; i++) {
              var label = tags[i].trim().toUpperCase();
              var tag_id = "";
              if ( db_labels.indexOf(label) == -1) {

                //tag not found
                var tag = new Tag();
                tag.label = label;
                tag_id = tag._id;
                tag.save();

              } else {

                //tag found
                tag_id = db_ids[db_labels.indexOf(label)];
                var tag = oldTags[db_labels.indexOf(label)];
                tag.use++;
                tag.save();

              }
              tags_id.push( tag_id )
            }

            document.type = req.files.document.name.split('.').pop();

            //test si l'extension est acceptée
            // TODO

            document.tags = tags_id;
            document.save(function(err, document) {
              if (err){
                return res.send(err);
              }
              return res.json(document);
            });
          });

        })
    } else {
      res.send("No file found")
    }
  }
}


module.exports = documentsFunctions
