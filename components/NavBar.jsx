import React, { useEffect, useState, useContext } from "react";

import { TrackingContext } from "@/context/Tracking";

const NavBar = () => {
  const [state, setState] = useState(false);

  const { currentUser, connectWallet } = useContext(TrackingContext);

  return <div>NavBar</div>;
};

export default NavBar;
