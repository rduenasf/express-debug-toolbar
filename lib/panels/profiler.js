var fs = require('fs')
  , jade = require('jade');

module.exports = {
    title: "Profiler"
    , process_request: function(req, res){
        var send = res.send
        , start = snapshot();
        function snapshot() {
          return {
            mem: process.memoryUsage()
            , time: new Date
          };
        }                                                      
        res.send = function(body, headers, status){ 
          module.exports.content = prettyPrint(req,start,snapshot());
          res.send = send;
          res.send(body, headers, status);
        }      
    }
};

function formatBytes(bytes) {
  var kb = 1024
    , mb = 1024 * kb
    , gb = 1024 * mb;
  if (bytes < kb) return bytes + 'b';
  if (bytes < mb) return (bytes / kb).toFixed(2) + 'kb';
  if (bytes < gb) return (bytes / mb).toFixed(2) + 'mb';
  return (bytes / gb).toFixed(2) + 'gb';
};
       
function prettyPrint(req, start, end) {
  panelHtml = fs.readFileSync(__dirname+'/../../templates/panels/profiler.jade', 'utf-8');
  return jade.render(panelHtml, {locals: {headers:[
    {name: "Response Time", value: ((end.time - start.time) + 'ms')}
    , {name: "Memory RSS", value: formatBytes(end.mem.rss - start.mem.rss)}
    , {name: "Memory VSize", value: formatBytes(end.mem.vsize - start.mem.vsize)}
    , {name: "Heap Before", value: (formatBytes(start.mem.heapUsed) + ' / ' + formatBytes(start.mem.heapTotal))}
    , {name: "Heap After", value: (formatBytes(end.mem.heapUsed) + ' / ' + formatBytes(end.mem.heapTotal))}
  ]}});
}