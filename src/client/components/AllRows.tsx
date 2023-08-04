import React, { CSSProperties } from "react";
import SingleRow from "./SingleRow";
import { Device } from "../Device";

const DeviceList: React.FC<{ device: Device }> = ({ device }) => {
  return (
    <div >
      <SingleRow
        valueBackgroundColor="#FB9159"
        valueVisible={false}
        key={1}
        icon={`/icons/icon_1.svg`}
        title={`الإسم : ${String(device.employee)}`}
        value={""}
      />
      <SingleRow
        valueBackgroundColor="#FB9159"
        valueVisible={true}
        key={2}
        icon={`/icons/icon_2.svg`}
        title={"الضغط الانقباضي:"}
        value={String(device.sys)}
      />

      <SingleRow
        valueBackgroundColor="#FB9159"
        valueVisible={true}
        key={3}
        icon={`/icons/icon_2.svg`}
        title={"الضغط الانبساطي:"}
        value={String(device.dia)}
      />

      <SingleRow
        valueBackgroundColor="#C1A5FC"
        valueVisible={true}
        key={4}
        icon={`/icons/icon_3.svg`}
        title={"معدل النبض:"}
        value={String(device.hr)}
      />

      <SingleRow
        valueBackgroundColor="#FB5959"
        valueVisible={true}
        key={5}
        icon={`/icons/icon_4.svg`}
        title={"نسبة الأكسجين:"}
        value={String(device.spo2)}
      />
      <SingleRow
        valueBackgroundColor="#6659FB"
        valueVisible={true}
        key={6}
        icon={`/icons/icon_5.svg`}
        title={"خر تحديث :"}
        value={String(device.lastUpdate!.toLocaleString())}
      />
    </div>
  );
};

export default DeviceList;
