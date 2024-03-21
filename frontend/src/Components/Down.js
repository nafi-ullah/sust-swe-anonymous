import React from "react";
import server from '../assets/serverdown.png';
function Down() {
  return (
    <div className="flex flex-col items-center">
      <p className="font-bold">
        Thank you for showing your maturity. We decided to shut down our server.
        </p>
      <img src={server} alt="server is down" className="h-24 w-24"/>
    </div>
  );
}

export default Down;
