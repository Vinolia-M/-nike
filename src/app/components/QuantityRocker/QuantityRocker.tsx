"use client";

import React, { useState } from "react";
import Image from "next/image";
import TrashIcon from "../../Assets/trash-icon.svg";
import DecreaseIcon from "../../Assets/decrease-icon.svg";
import IncreaseIcon from "../../Assets/increase-icon.svg";

export default function QuantityRocker() {
  return (
    <div className="flex items-center gap-[20px]">
      <div className="qty-rocker">
        <Image src={DecreaseIcon} alt="Decrease Icon" />
        <div className="qty"></div>
        <Image src={IncreaseIcon} alt="Increase Icon" />
      </div>
      <div className="update-button">UPDATE</div>
      <Image src={TrashIcon} alt="Trash" />
    </div>
  );
}
