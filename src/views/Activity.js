import React, { useEffect, useState } from "react";
import ButtonPlus from "../components/atom/buttonPlus";
import { useParams } from "react-router-dom";
import EditIcon from "../assets/icon/editpencil.svg";
import BackIcon from "../assets/icon/back.svg";
import EmptyStateTodo from "../assets/icon/todo-empty-state.svg";
import { getActivitybyid } from "../api";
import AddTodo from "./modal/AddTodo";
import IconDelete from "../assets/icon/Group (4).svg";
import { deletetodo } from "./store";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";

const Activity = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const getActivityId = async () => {
    const response = await getActivitybyid(`/${id}`);
    console.log(response.data?.todo_items);
    setdata(response.data);
    setdatatodo(response.data?.todo_items);
  };

  useEffect(() => {
    getActivityId();
  }, []);

  const [show, setShow] = useState(false);
  const [data, setdata] = useState({});
  const [title, setTitle] = useState(data.title);
  const [showModal, setShowModal] = useState(false);
  const [datatodo, setdatatodo] = useState([]);

  const HandleDeletes = (id, title) => {
    Swal.fire({
      title: `Are you sure delete ${title}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletetodo(id));
          getActivityId();
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <div className={" mx-5 mt-11"}>
      <div className="flex">
        {show ? (
          <>
            <img src={BackIcon} alt="icon" />
            <input
              type="text"
              className="border-b-2 border-black px-2 pb-2 text-4xl text-tertiary-900 w-1/3 font-bold relative bg-transparent focus:outline-none pl-10"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <img
              src={EditIcon}
              alt="icon"
              className="cursor-pointer"
              onClick={() => setShow(!show)}
            />
          </>
        ) : (
          <>
            <img src={BackIcon} alt="icon" />
            <h1 className="border-b-gray-900 px-2 pb-2 text-4xl text-tertiary-900 mx-6 font-bold">
              {data.title}
            </h1>
            <img
              src={EditIcon}
              alt="icon"
              className="cursor-pointer"
              onClick={() => setShow(!show)}
            />
          </>
        )}

        <ButtonPlus onClick={() => setShowModal(!showModal)} />
      </div>
      <div className="mt-14">
        {datatodo.length > 0 ? (
          datatodo.map((item, index) => (
            <div
              key={index}
              className="py-6 rounded-xl px-8 border-2 mt-3 bg-white flex"
            >
              <div
                className={`w-3 h-3 mr-4 mt-2 ${
                  item.priority === "high"
                    ? "bg-amber-500"
                    : item.priority === "very-high"
                    ? "bg-rose-600"
                    : item.priority === "medium"
                    ? "bg-green-500"
                    : item.priority === "low"
                    ? "bg-accentInformation-500"
                    : "bg-violet-500"
                } rounded-full`}
              ></div>
              <span className="mr-6 font-medium text-lg">{item.title}</span>
              <img
                src={EditIcon}
                alt="icon"
                className="cursor-pointer w-4 h-4 mt-1"
                onClick={() => setShowModal(!showModal)}
              />
              <div className="flex-1"></div>
              <img
                src={IconDelete}
                alt="icon"
                className="w-4 h-4 cursor-pointer"
                onClick={() => HandleDeletes(item.id, item.title)}
              />
            </div>
          ))
        ) : (
          <div style={{ width: "541px", height: "413px" }} className="m-auto">
            <img src={EmptyStateTodo} alt="img" />
          </div>
        )}
      </div>
      {showModal ? (
        <AddTodo idPriority={id} handleClose={() => setShowModal(false)} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Activity;
