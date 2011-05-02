var express = require('express')
  , jade = require('jade')
  , path = require('path')
  , fs = require('fs');

module.exports = {
  title: "Application Info"
  , subtitle: "N: " + process.version + " | E: v" + express.version
  , process_request: function(req,res){
    module.exports.content = prettyPrint(req);
  }
}

function prettyPrint(req) {
  var handlers = [];
  req.app.stack.forEach(function(n){ if(n.handle.name.trim() && n.handle.name != 'router') handlers.push(n.handle.name); });

  templatePath = path.join(__dirname,'../../templates/panels/',path.basename(__filename, '.js')+'.jade');
  panelHtml = fs.readFileSync(templatePath, 'utf-8');
  return jade.render(panelHtml, {locals: {headers:[
    {name: "Node Version", value: "Node " + process.version}
    , {name: "Express Version", value: "Express v" + express.version}
    , {name: "Used middleWares", value: handlers.join(", ")}
    ]}});
}