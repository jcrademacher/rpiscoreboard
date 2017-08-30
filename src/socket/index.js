
export const init = () => {
  const promise = new Promise(function(resolve, reject) {
    var ws;

    try {
      ws = new WebSocket("ws://192.168.86.41:8888/ws");
    }
    catch(e) {
      console.log("catch err:",e);
      reject(e);
    }

    ws.addEventListener("open", () => {
      resolve(ws);
    });

    ws.addEventListener("error", (event) => {
      reject(event);
    });
  });

  return promise;
}
