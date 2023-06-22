"use client";

import React, { useState, useEffect, useContext, createContext } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

import tracking from "../context/Tracking.json";
const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const contractABI = tracking.abi;

// 0x70997970C51812dc3A010C7d01b50e0d17dc79C8

const fetchContract = (signerOrProvider) =>
  new ethers.Contract(contractAddress, contractABI, signerOrProvider);

export const TrackingContext = createContext();

export const TrackingProvider = ({ children }) => {
  const dappName = "Product tracking dapp";
  const [currentUser, setCurrentUser] = useState("");

  const createShipment = async (items) => {
    console.log(items);
    const { receiver, pickupTime, distance, price } = items;

    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const createItem = await contract.createShipment(
        receiver,
        new Date(pickupTime).getTime(),
        distance,
        ethers.utils.parseUnits(price, 18),
        {
          value: ethers.utils.parseUnits(price, 18),
        }
      );

      await createItem.wait();
      console.log(createItem);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllShipments = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);

      const shipments = await contract.getAllTransaction();
      const allShipments = shipments.map((ship) => ({
        sender: ship.sender,
        receiver: ship.receiver,
        price: ethers.utils.formatEther(ship.price.toString()),
        pickupTime: ship.pickupTime.toNumber(),
        deliveryTime: ship.deliveryTime.toNumber(),
        distance: ship.distance.toNumber(),
        isPaid: ship.isPaid,
        status: ship.status,
      }));

      return allShipments;
    } catch (error) {
      console.log(error);
    }
  };

  const getShipmentsCount = async () => {
    try {
      if (!window.ethereum) return alert("Insall metamask");

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);
      const shipmentsCount = await contract.getShipmentsCount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const completeShipment = async (completeShip) => {
    const { receiver, index } = completeShip;
    try {
      if (!window.ethereum) return alert("Insall metamask");

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const tx = await contract.completeShipment(accounts[0], receiver, index, {
        gasLimit: 300000,
      });

      tx.wait();
      console.log(tx);
    } catch (error) {
      console.log(error);
    }
  };

  const getShipment = async (index) => {
    console.log(index * 1);

    try {
      if (!window.ethereum) return alert("Insall metamask");

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);

      const shipment = await contract.getShipment(accounts[0], index * 1);

      const singleShipment = {
        sender: shipment[0],
        receiver: shipment[1],
        pickupTime: shipment[2].toNumber(),
        deliveryTime: shipment[3].toNumber(),
        distance: shipment[4].toNumber(),
        price: ethers.utils.formatEther(shipment[5].toString()),
        status: shipment[6],
        isPaid: shipment[7],
      };

      return singleShipment;
    } catch (error) {
      console.log(error);
    }
  };

  const startShipment = async (getProduct) => {
    const { receiver, index } = getProduct;

    try {
      if (!window.ethereum) return alert("Insall metamask");

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const shipment = await contract.startShipment(
        accounts[0],
        receiver,
        index * 1
      );

      shipment.wait();
      console.log(shipment);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) return alert("Insall metamask");

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) setCurrentUser(accounts[0]);
      else alert("No account found");
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return alert("Insall metamask");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentUser(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => checkIfWalletConnected(), []);

  return (
    <TrackingContext.Provider
      value={{
        connectWallet,
        createShipment,
        getAllShipments,
        completeShipment,
        getShipment,
        startShipment,
        getShipmentsCount,
        dappName,
        currentUser,
      }}
    >
      {children}
    </TrackingContext.Provider>
  );
};
