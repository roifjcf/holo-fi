'use client';
import { useEffect, useState } from "react";
import "./clock.scss";

interface Props {

}

export default function Clock() {
  
  const [currTime, setCurrTime] = useState<string>('');
  const [currDate, setCurrDate] = useState<string>('');

  useEffect(() => {

    const getTimeString = () => {
      const now = new Date();
      return now.toLocaleTimeString(undefined, {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
      });
    }

    const getDateString = () => {
      const now = new Date();
      const day = now.getDate(); // 1-31
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month = monthNames[now.getMonth()]; // 0-11
      const year = now.getFullYear();
      return `${day < 10 ? '0'+day : day} ${month} ${year}`;
    }

    const updateTime = () => {
      setCurrTime(getTimeString());
      setCurrDate(getDateString());
    }

    updateTime();
    const interval = setInterval(updateTime, 60 * 1000);

    return () => clearInterval(interval);

  }, []);

  return <>
    <div className="clock-container">
      <h2 className="clock-time" >{currTime}</h2>
      <p className="clock-week">{currDate}</p>
    </div>
  </>;
}