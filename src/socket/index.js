export const init = () => {
  const promise = new Promise(function(resolve, reject) {
    var ws;

    try {
      ws = new WebSocket(`ws://${settings.host_addr}:${settings.host_port}/ws`);
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
