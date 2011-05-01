module.exports = {
    id: "headers"
    , title: "HTTP Headers"
    , process_request: function(req, res){
        var send = res.send

        function headersPrettyPrint(req) {
          str = "<table><thead><tr><th>Key</th><th>Value</th></tr></thead><tbody>";
          str+= "<tr class='djDebugOdd'><td>HTTP Accept</td><td>"+req.headers["accept"]+"</td></tr>";
          str+= "<tr class='djDebugEven'><td>HTTP User Agent</td><td>"+req.headers["user-agent"]+"</td></tr>";
          str+= "<tr class='djDebugOdd'><td>HTTP Connection</td><td>"+req.headers["connection"]+"</td></tr>";
          str+= "<tr class='djDebugEven'><td>Server Port</td><td>"+ req.app.address().port+"</td></tr>";
          str+= "<tr class='djDebugOdd'><td>Server Name</td><td>-</td></tr>";
          str+= "<tr class='djDebugEven'><td>Remote Address</td><td>"+(req.socket && (req.socket.remoteAddress || (req.socket.socket && req.socket.socket.remoteAddress)))+"</td></tr>";
          str+= "<tr class='djDebugOdd'><td>Server Software</td><td>Node "+ process.version+"</td></tr>";
          str+= "<tr class='djDebugEven'><td>HTTP Accept Language</td><td>"+req.headers["accept-language"]+"</td></tr>";
          str+= "<tr class='djDebugOdd'><td>Script Name</td><td>"+req.url+"</td></tr>";
          str+= "<tr class='djDebugEven'><td>Request Method</td><td>"+req.method+"</td></tr>";
          str+= "<tr class='djDebugOdd'><td>HTTP Host</td><td>"+req.headers["host"]+"</td></tr>";
          str+= "<tr class='djDebugEven'><td>Content Type</td><td>-</td></tr>";
          str+= "<tr class='djDebugOdd'><td>Server Protocol</td><td>HTTP/"+(req.httpVersionMajor + '.' + req.httpVersionMinor)+"</td></tr>";
          str+= "<tr class='djDebugEven'><td>HTTP Accept Encoding</td><td>"+req.headers["accept-encoding"]+"</td></tr>";
          str+= "</tbody></table>";
          return str;
        } 
        res.send = function(body, headers, status){ 
          module.exports.content = headersPrettyPrint(req);
          res.send = send;
          res.send(body, headers, status);
        }      
    }
};