import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { Line } from "@ant-design/charts";
import "./chart.css";
import { getData ,getLocationData, getAqiData} from "api/data";
import { handleErrorMessage } from "i18n";
import socket from "utils/socket";
import {Select} from "antd";
const Chart: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [chartData, setChartData] = useState<{ time: string; value: any }[]>(
    []
  );
  const [selectedButton, setSelectedButton] = useState<string>("temperature"); // Khai báo state để lưu trữ button đang được chọn
  const [temperatureData, setTemperatureData] = useState<any>([]);
  const [humidityData, setHumidityData] = useState<any>([]);
  const [co2Data, setCo2Data] = useState<any>([]);
  const [coData, setCoData] = useState<any>([]);
  const [nh3Data, setNh3Data] = useState<any>([]);
  const [pm25Data, setPm25Data] = useState<any>([]);
  const [allChartData, setAllChartData] = useState<any>([]);
  const [locationList, setLocationList] = useState<any>([]);
  const [selectedLocation, setSelectedLocation] = useState('1');
  const [aqiData, setAqiData] = useState<any>([]);

  const fetchData = async (locationId:string) => {
    try {
      const params = {locationId:locationId}
      const response = await getData(params);
      const formattedData = response.map((item: any) => {
        return {
          ...item,
          createdAt: convertToHHMM(item.createdAt),
        };
      });
      setData(formattedData.slice(0, 10));


      const aqiData = await getAqiData(params);
      
      const aqiDataFormatTed = aqiData.map((item:any) => {
        return {
          ...item,
          value: item.avgAqi !== null? item.avgAqi:0,
          time: item.endTime,
          type: "AQI"
        }
      }).reverse();
      console.log(aqiDataFormatTed);
      setAqiData(aqiDataFormatTed);
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  const changeLocation = (locationId : string) => {
    fetchData(locationId);
  }

  const seperateData = () => {
    const formattedData = data;
    const temperatureData = formattedData
        .map((item: any) => {
          return {
            time: item.createdAt,
            value: item.temperature,
            type: 'Temperature(°C)  '
          };
        })
      setTemperatureData(temperatureData);

      const humidityData = formattedData
        .map((item: any) => {
          return {
            time: item.createdAt,
            value: item.humidity,
            type: 'Humidity(%)'
          };
        })
      setHumidityData(humidityData);

      const co2Data = formattedData
        .map((item: any) => {
          return {
            time: item.createdAt,
            value: item.CO2_concentration,
            type: 'CO2_concentration(ppm)'
          };
        })
      setCo2Data(co2Data);

      const nh3Data = formattedData
        .map((item: any) => {
          return {
            time: item.createdAt,
            value: item.NH3_concentration,
            type: 'NH3_concentration(ppm)'
          };
        })
      setNh3Data(nh3Data);

      const pm25Data = formattedData
        .map((item: any) => {
          return {
            time: item.createdAt,
            value: item.PM25_concentration,
            type: 'PM25_concentration(µg/m³)'
          };
        })
      setPm25Data(pm25Data);

      const coData = formattedData
        .map((item: any) => {
          return {
            time: item.createdAt,
            value: item.CO_concentration,
            type: 'CO_concentration(ppm)'
          };
        })
      setCoData(coData);

      const allChartData = [
        temperatureData,
        humidityData,
        co2Data,
        nh3Data,
        pm25Data,
        coData,
      ];

      const combinedChartData = allChartData.flatMap((data) => data);
      setAllChartData(combinedChartData);
      if (chartData !== null && chartData !== undefined) {
        setChartData(chartTypeMap[selectedButton]);
      } else {
        console.log(chartData);
        setChartData(temperatureData);
      }
      
  }

  function convertToHHMM(dateTime: string) {
    const dateObj = new Date(dateTime);
    const hours = dateObj.getHours().toString().padStart(2, "0"); // Lấy giờ và format thành HH
    const minutes = dateObj.getMinutes().toString().padStart(2, "0"); // Lấy phút và format thành mm
    const seconds = dateObj.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }

  const chartTypeMap:any = {};
  useEffect(() => {
    const chartTypeMap: { [key: string]: any } = {
      temperature: temperatureData,
      humidity: humidityData,
      CO_concentration: coData,
      NH3_concentration: nh3Data,
      CO2_concentration: co2Data,
      PM25_concentration: pm25Data,
      All: allChartData,
      Aqi : aqiData
    };
  
    setChartData(chartTypeMap[selectedButton]);
  }, [temperatureData, humidityData, coData, nh3Data, co2Data, pm25Data, allChartData, selectedButton]);
  

  const switchChart = (data: any, property: string) => {
    setChartData(chartTypeMap[property]); // Sử dụng đối tượng để lấy loại dữ liệu tương ứng với nút được chọn
    setSelectedButton(property);
  };

  const fetchLocationData = async() => {
    try {
      const response = await getLocationData();
      const locations = response.map((location: any) => {
        return {
          ...location,
          value: location.id,
          label: location.description
        }
      });

      setLocationList(locations);
      setSelectedLocation(locations[0].id);
    } catch (error) {
      handleErrorMessage(error);
    }
  }

  useEffect(() => {
     // Gọi hàm fetchData ở đây
    fetchLocationData();
    fetchData(selectedLocation);
    socket.on("0981957216", (newData) => {
      console.log("data from 0981957216", newData);
      newData.createdAt = convertToHHMM(newData.datetime);
    
      setData((prevData) => {
        let updatedData = [...prevData, newData]; // Thêm newData vào cuối mảng
    
        // Kiểm tra nếu số phần tử vượt quá 10, thì loại bỏ phần tử đầu tiên
        if (updatedData.length > 10) {
          updatedData = updatedData.slice(1); // Loại bỏ phần tử đầu tiên
        }
    
        return updatedData;
      });
    
      // console.log(newData);
    });
    
    return () => {
      socket.off("0981957216");
    };
  }, []);
  useEffect(() => {
    seperateData();
  },[data])

  const config = {
    data: chartData,
    xField: "time",
    yField: "value",
    seriesField: 'type',
    label : {
      position: 'bottom',
    },
    point: {
      size: 5,
      shape: "diamond",
    },
    colorField: 'type',
    color: ["#000000"]
  };

  return (
    <div>
      
      <div className="location-filter">
      <label style={{marginRight:"10px"}}>Choose location</label>
      <Select
      defaultValue={"1"}
      style={{ width: 120 }}
      options={locationList}
      onChange={(selectedOption) => changeLocation(selectedOption)}
    />
      </div>
      <div className="option-row">
        <Button
          className={selectedButton === "temperature" ? "selected" : ""}
          onClick={() => switchChart(temperatureData, "temperature")}
        >
          Temperature
        </Button>
        <Button
          className={selectedButton === "humidity" ? "selected" : ""}
          onClick={() => switchChart(humidityData, "humidity")}
        >
          Humidity
        </Button>
        <Button
          className={selectedButton === "CO_concentration" ? "selected" : ""}
          onClick={() => switchChart(coData, "CO_concentration")}
        >
          CO concentration
        </Button>
        <Button
          className={selectedButton === "NH3_concentration" ? "selected" : ""}
          onClick={() => switchChart(nh3Data, "NH3_concentration")}
        >
          NH3 concentration
        </Button>
        <Button
          className={selectedButton === "CO2_concentration" ? "selected" : ""}
          onClick={() => switchChart(co2Data, "CO2_concentration")}
        >
          CO2 concentration
        </Button>
        <Button
          className={selectedButton === "PM25_concentration" ? "selected" : ""}
          onClick={() => switchChart(pm25Data, "PM25_concentration")}
        >
          Concentration of dust
        </Button>
        <Button
          className={selectedButton === "Aqi" ? "selected" : ""}
          onClick={() => switchChart(allChartData, "Aqi")}
        >
          AQI
        </Button>
      </div>
      <Line className="chart" {...config} />
    </div>
  );
};
export default Chart;
