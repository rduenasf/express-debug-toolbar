var fs = require('fs')
  , jade = require('jade');
                  
exports.version = '0.0.0'           

var existingPanels = {version: true, profiler: true, headers: true};

exports = module.exports = function filterOutput(options){
  var options = options || {}
    , panels = {};

  options.panels = options.panels || ["version", "profiler"];
  options.panels.forEach(function(a){
    if(a in existingPanels)
      panels[a] = require('./panels/'+ a +'.js');
  });
  
  return function filterOutput(req, res, next){     
    /* safe mounting */
    if(req._debugToolbar) return next();
    req._debugToolbar = true;
    
    /* text/html request received */
    if(~req.headers['accept'].indexOf('text/html')){
      /* proxy res.send to set up the debug Toolbar  */
      var send = res.send;
      res.send = function(body,headers,status){
        res.send = send;              
        if(~(pos = body.indexOf('</body>'))){
          html = fs.readFileSync(__dirname + '/../templates/base.jade');
          html = jade.render(html, {locals: {panels: panels}});
          body = body.substr(0,pos) + html + body.substr(pos);
        }
        res.send(body,headers,status);
      }

      /* mount all the requested panels  */
      for(key in panels){
        panels[key].process_request && panels[key].process_request(req, res);
      }
    }
    next();
  }
}