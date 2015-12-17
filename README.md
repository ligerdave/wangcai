# wangcai
A node.js agent that reports node related metrics(vm, http, etc)

## Usage:
Include these lines in your start script, for instance app.js
```
// get the instance
var heapAgent = require('wangcai').heapAgent;
// start the agent
heapAgent.start();
```

Now, you can run this anywhere in your code to get a snapshot of your current heap 
```
// get the instance
var heapAgent = require('wangcai').heapAgent;
// return a set of metrics in JSON
heapAgent.getMetrics();
```

