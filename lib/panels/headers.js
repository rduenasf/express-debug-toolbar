var jade = require('jade')
  , fs = require('fs');

module.exports = {
    title: "HTTP Headers"
    , process_request: function(req, res){
        var send = res.send 
        res.send = function(body, headers, status){ 
          module.exports.content = prettyPrint(req);
          res.send = send;
          res.send(body, headers, status);
        }      
    }
};

function prettyPrint(req) {
  panelHtml = fs.readFileSync(__dirname+'/../../templates/panels/headers.jade', 'utf-8');
  return jade.render(panelHtml, {locals: {headers:[
    {name: "HTTP Accept", value: req.headers["accept"]}
    , {name: "HTTP User Agent", value: req.headers["user-agent"]}
    , {name: "HTTP Connection", value: req.headers["connection"]}
    , {name: "Server Port", value: req.app.address().port}
    , {name: "Server Name", value: "-"}
    , {name: "Remote Address", value: (req.socket && (req.socket.remoteAddress || (req.socket.socket && req.socket.socket.remoteAddress)))}
    , {name: "Server Software", value: "Node " + process.version}
    , {name: "HTTP Accept Language", value: req.headers["accept-language"]}
    , {name: "Script Name", value: req.url}
    , {name: "Request Method", value: req.method}
    , {name: "HTTP Host", value: req.headers["host"]}
    , {name: "Content Type", value: "-"}
    , {name: "Server Protocol", value: "HTTP/"+(req.httpVersionMajor + '.' + req.httpVersionMinor)}
    , {name: "HTTP Accept Encoding", value: req.headers["accept-encoding"]}
  ]}});
}