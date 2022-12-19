import React, { useState } from "react";
import Modal from ".";
import CancelIcon from "../../assets/icon/cancel.svg";
import Select from "react-dropdown-select";
import { postTodo } from "../../api";

function AddTodo({ idPriority, handleClose }) {
  const [select, setSelect] = useState("");
  const [title, setTitle] = useState("");
  const datapriority = [
    {
      id: 1,
      name: "Very High",
      priority: "very-high",
    },
    {
      id: 2,
      name: "High",
      priority: "high",
    },
    {
      id: 3,
      name: "Medium",
      priority: "medium",
    },
    {
      id: 4,
      name: "Low",
      priority: "low",
    },
    {
      id: 5,
      name: "Very Low",
      priority: "very-low",
    },
  ];
  const items = datapriority?.map((item) => {
    const data = {};
    data.label = item.name;
    data.value = item.priority;
    data.valueId = item.id;
    return data;
  });

  const handlePost = () => {
    let data = {
      title: title,
      activity_group_id: idPriority,
      priority: select.value,
    };
    postTodo(data).then((res) => {
      console.log("post =>", res);
    });
  };

  return (
    <>
      {/* {showModal ? ( */}
      <Modal className="rounded-3xl">
        <div className="relative w-1/2 mx-auto rounded-3xl">
          {/*content*/}
          <div className="border-0 shadow-lg relative flex flex-col w-full rounded-3xl bg-white outline-none focus:outline-none pb-10 pr-4">
            {/*header*/}
            <div className="flex flex-wrap items-center rounded-t-3xl border-b-2 border-tertiary-400 pl-8 py-5 ">
              <div className="relative w-full px-2 flex">
                <span className="text-black font-bold text-xl flex-1">
                  Tambah List Item
                </span>
                <img
                  src={CancelIcon}
                  alt="icon"
                  className="mr-5 cursor-pointer"
                  onClick={handleClose}
                />
              </div>
            </div>
            {/*body*/}

            <div className="mt-9 block border-b-2 border-tertiary-400">
              <div>
                <span className="text-black text-xs font-bold pl-10">
                  NAMA LIST ITEM
                </span>
              </div>

              <input
                type="text"
                className="border-2 mt-2 border-slate-400 px-2 pb-2 text-3xl text-tertiary-900 w-3/4 font-bold relative bg-transparent ml-10"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="my-7">
                <span className="text-black text-xs font-bold pl-10">
                  PRIORITY
                </span>
                <div className="w-1/3">
                  <Select
                    placeholder="Pilih Priority"
                    className="border-2 mt-2 border-slate-400 px-2 pb-2 text-base text-tertiary-900 font-normal relative bg-transparent ml-10 "
                    options={items}
                    hideSelectedOptions={false}
                    value={datapriority}
                    onChange={(selected) => setSelect(selected[0])}
                  />
                </div>
              </div>
            </div>
            <div
              style={{ borderRadius: "45px" }}
              className="py-3 px-10 text-white text-sm bg-accentInformation-600 w-1/6 mt-4 ml-auto"
              onClick={handlePost}
            >
              Simpan
            </div>
          </div>
        </div>
      </Modal>
      {/* ) : (
        <></>
      )} */}
    </>
  );
}

export default AddTodo;
