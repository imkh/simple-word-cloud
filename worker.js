var w;

function startWorker() {
    if (typeof(Worker) !== "undefined") {
        if (typeof(w) == "undefined") {
            w = new Worker("script.js");
        }
        w.onmessage = function(event) {
            // document.getElementById("result").innerHTML = event.data;
            console.log("lol");
        };
    } else {
        document.getElementByClass("page-content").innerHTML = "Sorry, your browser does not support Web Workers.";
    }
}

function stopWorker() {
    w.terminate();
    w = undefined;
}
