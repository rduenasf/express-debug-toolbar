module.exports = {
    id: "profiler"
    , title: "Profiler"
    , subtitle: "Measuring response time" 
    , process_request: function(req, res){
        var send = res.send
        , start = snapshot();
        function snapshot() {
          return {
            mem: process.memoryUsage()
            , time: new Date
          };
        }                                                      
        function formatBytes(bytes) {
          var kb = 1024
            , mb = 1024 * kb
            , gb = 1024 * mb;
          if (bytes < kb) return bytes + 'b';
          if (bytes < mb) return (bytes / kb).toFixed(2) + 'kb';
          if (bytes < gb) return (bytes / mb).toFixed(2) + 'mb';
          return (bytes / gb).toFixed(2) + 'gb';
        };
        function compare(req, start, end) {
          str = req.method + " " + req.url;
          str+='response time:' +  (end.time - start.time) + 'ms' + "<br/>";
          str+='memory rss:' +  formatBytes(end.mem.rss - start.mem.rss) + "<br/>";
          str+='memory vsize:' +  formatBytes(end.mem.vsize - start.mem.vsize) + "<br/>";
          str+='heap before:' +  formatBytes(start.mem.heapUsed) + ' / ' + formatBytes(start.mem.heapTotal) + "<br/>";
          str+='heap after:' +  formatBytes(end.mem.heapUsed) + ' / ' + formatBytes(end.mem.heapTotal) + "<br/>";
          return str;
        }
        res.send = function(body, headers, status){ 
          module.exports.content = compare(req,start,snapshot());
          res.send = send;
          res.send(body, headers, status);
        }      
    }
};