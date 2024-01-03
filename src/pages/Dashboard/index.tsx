import { useEffect, useState } from "react";
import socket from "utils/socket";

function Dashboard() {
  const [data, setData] = useState<any[]>([]);

  // useEffect(() => {
  //   socket.on("0981957216", (newData) => {
  //     console.log("data from 0981957216", newData);
  //     setData((data) => [...data, newData]);
  //     console.log(newData);
  //   });
    

  //   return () => {
  //     socket.off("0981957216");
  //   };
  // }, []);

  return (
    <>
      {data.map((d, i) => (
        <div key={i}>{d.humidity}</div>
      ))}
    </>
  );
}

export default Dashboard;
