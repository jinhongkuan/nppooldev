onmessage = function (event) {
    var workerResult = event.data;
  
    workerResult.onmessage = true;
  
    postMessage(workerResult);
  };