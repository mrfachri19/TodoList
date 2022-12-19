import React from "react";
import IconPlus from "../../assets/icon/Group (3).svg";

function ButtonPlus({ onClick }) {
  return (
    <div
      className="rounded-3xl w-32 h-12 bg-accentSuccess-900 py-3 flex px-6 ml-auto cursor-pointer"
      onClick={onClick}
    >
      <img src={IconPlus} alt="icon" className="w-4 mr-3" />
      <p className="text-white">Tambah</p>
    </div>
  );
}

export default ButtonPlus;
