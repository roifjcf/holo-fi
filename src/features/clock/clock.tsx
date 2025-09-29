'use client';
import { useEffect, useState } from "react";
import { useWeather } from "@/hooks/useWeather";
import "./clock.scss";
import { useTime } from "@/hooks/useTime";

export default function Clock() {
  
  const { currTime, currDate, currDay } = useTime();  
  const { weather, loadingWeather, error } = useWeather();

  

  return <>
    <div className="clock-container">
      <h2 className="clock-time" >{currTime}</h2>
      <p>{currDate} ({currDay})</p>
      {loadingWeather ?
      <p>Loading weather...</p> :
      error ?
      <></> :
      <p>{weather?.description} {weather?.temperature}°C</p> }
    </div>
  </>;
}