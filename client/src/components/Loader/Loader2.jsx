import React from "react";
import "./Loader2.css";

const Loader2 = () => (
  <div>
    <h3 className="myh2"  style={{ margin: "0 auto", marginTop: "10%", fontFamily: "cursive" }}>Loading...</h3>
    <div
      aria-label="Orange and tan hamster running in a metal wheel"
      role="img"
      className="wheel-and-hamster"
      style={{ margin: "0 auto", marginTop: "2%" }}
    >
      <div className="wheel"></div>
      <div className="hamster">
        <div className="hamster__body">
          <div className="hamster__head">
            <div className="hamster__ear"></div>
            <div className="hamster__eye"></div>
            <div className="hamster__nose"></div>
          </div>
          <div className="hamster__limb hamster__limb--fr"></div>
          <div className="hamster__limb hamster__limb--fl"></div>
          <div className="hamster__limb hamster__limb--br"></div>
          <div className="hamster__limb hamster__limb--bl"></div>
          <div className="hamster__tail"></div>
        </div>
      </div>
      <div className="spoke"></div>
    </div>
  </div>
);

export default Loader2;
