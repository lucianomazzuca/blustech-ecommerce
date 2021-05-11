export default function setErrorFromServer(errorsServer, setError) {
  errorsServer.forEach((error) => {
    const param = error.param;
    const message = error.msg;
    setError(`${param}`, {
      type: "server",
      message: message,
    });
  });
}