var express = require('express')
  , fs = require('fs')
  , jade = require('jade')
  , path = require('path');

exports.version = '0.0.1'

exports = module.exports = function filterOutput(options){
  var options = options || {}
    , panels = {};

  /* Default panels */
  options.panels = options.panels || ["application", "headers", "profiler"];

  options.panels.forEach(function(panel){
    if(path.existsSync(__dirname + '/panels/'+panel+'.js')){
      console.log(panel+' panel loaded succesfully!');
      panels[panel] = require('./panels/'+ panel +'.js');
    }
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
          html = fs.readFileSync(__dirname + '/../templates/debugToolbar.jade', 'utf-8');
          css = fs.readFileSync(__dirname + '/../media/css/toolbar.css', 'utf-8');
          js = fs.readFileSync(__dirname + '/../media/js/toolbar.js', 'utf-8');
          html = jade.render(html, {locals: {css: css, js: js, panels: panels}});
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