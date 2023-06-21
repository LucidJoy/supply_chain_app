"use client";

import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";

import {
  Table,
  Form,
  Services,
  CompleteShipment,
  GetShipment,
  StartShipment,
  Profile,
} from "@/components";
import { TrackingContext } from "@/context/Tracking";

export default function Home() {
  const {
    currentUser,
    createShipment,
    getAllShipment,
    completeShipment,
    getShipment,
    startShipment,
    getShipmentCount,
  } = useContext(TrackingContext);

  const [createShipmentModal, setCreateShipmentModal] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [startModal, setstartModal] = useState(false);
  const [completeModal, setCompleteModal] = useState(false);
  const [getModal, setGetModal] = useState(false);

  const [allShipmentData, setAllShipmentData] = useState();

  // useEffect(() => {
  //   const getCampaignsData = getAllShipment();

  //   return async () => {
  //     const allData = await getCampaignsData();
  //     setAllShipmentData(allData);
  //   };
  // }, []);

  return (
    <div>
      <Services
        setOpenProfile={setOpenProfile}
        setCompleteModal={setCompleteModal}
        setGetModal={setGetModal}
        startModal={startModal}
      />
      <Table
        setCreateShipmentModal={setCreateShipmentModal}
        allShipmentData={allShipmentData}
      />
      <Form
        createShipmentModal={createShipmentModal}
        createShipment={createShipment}
        setCreateShipmentModal={setCreateShipmentModal}
      />
      <Profile
        openProfile={openProfile}
        setOpenProfile={setOpenProfile}
        currentUser={currentUser}
        getShipmentCount={getShipmentCount}
      />
      <CompleteShipment
        completeModal={completeModal}
        setCompleteModal={setCompleteModal}
        completeShipment={completeShipment}
      />
      <GetShipment
        getModal={getModal}
        setGetModal={setGetModal}
        getShipment={getShipment}
      />
      <StartShipment
        startModal={startModal}
        setstartModal={setstartModal}
        startShipment={startShipment}
      />
    </div>
  );
}
