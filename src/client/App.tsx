import * as React from "react";
import { useEffect, useState } from "react";
import Room from "./components/Room";
import { socket } from "./socket";
import SingleRow from "./components/SingleRow";
import DeviceList from "./components/AllRows";

interface Link {
  a: string;
  r: number;
}

// define schema for data
interface Packet {
  id: string;
  // array of biometric data
  b?: number[];
  l?: Link[]; // links
  type?: "anchor";
  g?: boolean; // gas
}

interface Device {
  id: string;
  sys: number;
  dia: number;
  hr: number;
  spo2: number;
  ld: number;
  rd: number;
  color: string;
  opacity: number;
  employee?: string;
  lastUpdate: Date;
}

const colors = (id: string) => {
  switch (id) {
    case "1":
      return "ce2d3a";
    case "2":
      return "2527ba";
    default:
      return "000000";
  }
};

/* HOOK REACT EXAMPLE */
const App = (props: AppProps) => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [gas, setGas] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setDevices((devices) => {
        // update device opacity
        devices = devices.map((d) => {
          const diff = new Date().getTime() - d.lastUpdate.getTime();
          d.opacity = Math.max(1 - diff / 10000, 0);
          return d;
        });

        return devices;
      });
    }, 1000);

    socket.on("data", (data: string) => {
      // parse data to object of type Packet
      try {
        const packet: Packet = JSON.parse(data);
        if (packet.type === "anchor") {
          setGas(packet.g!);
          return;
        }

        setDevices((devices) => {
          // find device in devices
          const device = devices.find((d) => d.id === packet.id);

          // if device not found, add it to devices
          if (!device) {
            const newDevice: Device = {
              id: packet.id,
              sys: packet.b ? packet.b[0] : 0,
              dia: packet.b ? packet.b[1] : 0,
              hr: packet.b ? packet.b[2] : 0,
              spo2: packet.b ? packet.b[3] : 0,
              ld: 0,
              rd: 0,
              color: colors(packet.id),
              opacity: 1,
              lastUpdate: new Date(),
            };

            console.log(devices);
            devices = [...devices, newDevice];
          } else {
            // if device found, update its values
            if (packet.b) {
              device.sys = packet.b[0];
              device.dia = packet.b[1];
              device.hr = packet.b[2];
              device.spo2 = packet.b[3];
            }

            if (packet.l) {
              packet.l.forEach((link) => {
                if (link.a === "82") device.ld = link.r;
                if (link.a === "81") device.rd = link.r;
              });
            }

            device.opacity = 1;
            device.lastUpdate = new Date();

            // update devices
            devices = devices.map((d) => {
              if (d.id === device.id) return device;
              return d;
            });
          }

          return devices;
        });
      } catch (error) {}
    });

    return () => {
      clearInterval(interval);
      socket.off("data");
    };
  }, []);

  useEffect(() => {
    devices.forEach((device) => {
      if (!device.employee) {
        fetch(`/api/employees/${device.id}`)
          .then((res) => res.json())
          .then((employee) => {
            device.employee = employee.name;
            setDevices([...devices]);
          });
      }
    });
  }, [devices]);

  return (
    <div style={{ direction: "rtl", padding: "0 20px" }}>
      <div
        style={{
          float: "right",
          border: "2px dashed #b6b6b6",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <h2 style={{
          backgroundColor: "#eee",
          borderRadius: "8px",
          borderRight: "5px solid #858585",
          padding: "10px",
        }}>المدرج</h2>
        <h3>
          حالة الغاز:{" "}
          <span>
            <div
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                backgroundColor: gas ? "red" : "green",
                display: "inline-block",
              }}
            ></div>
          </span>
        </h3>
        <br />
        <h2>الأساور</h2>

        {devices.length > 0 ? (
          devices.map((device) => (
            // in the shape of a card
            <DeviceList device={device} />
          ))
        ) : (
          <h3>لا يوجد أساور</h3>
        )}
      </div>
      <div className="App">
        <Room width={7} height={7} devices={devices} gas={gas} />
      </div>
    </div>
  );
};

interface AppProps {}

export default App;
