import React, { useEffect } from "react";
import ButtonPlus from "../components/atom/buttonPlus";
import { useSelector, useDispatch } from "react-redux";
import { fetchActivity, deleteActivity, addActivity } from "./store";
import moment from "moment";
import IconDelete from "../assets/icon/Group (4).svg";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import EmptyState from "../assets/img/activity-empty-state.svg";

const Dashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory();
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
        dispatch(deleteActivity(id));
        setTimeout(() => {
          dispatch(fetchActivity());
        }, 100);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  useEffect(() => {
      dispatch(fetchActivity());
  }, [dispatch]);

  const store = useSelector((state) => state.Todo.tasks);

  function handleAdd() {
    const data = { title: "Test Fachri", email: "fachryfachry1997@gmail.com" };
    dispatch(addActivity(data));
    dispatch(fetchActivity());
  }

  return (
    <div className={" mx-5 mt-11"}>
      <div className="flex">
        <h1 className="text-black font-bold text-3xl">Activity</h1>
        <ButtonPlus onClick={handleAdd} />
      </div>
      <div className="mt-14 w-full grid grid-cols-4 gap-4">
        {store.length > 0 ? (
          <>
            {store.map((item, index) => {
              return (
                <div
                  className="pt-6 px-6 bg-white rounded-xl w-56 h-56 cursor-pointer"
                  key={index}
                >
                  <h1
                    className="text-black font-bold text-lg"
                    onClick={() => history.push(`/home/detailactivity/${item.id}`)}
                  >
                    {" "}
                    {item.title}
                  </h1>
                  <div className="flex mt-32">
                    <p className="font-medium text-sm mr-10 text-tertiary-10">
                      {moment(item.created_at).format("D MMMM YYYY")}
                    </p>
                    <img
                      src={IconDelete}
                      alt="icon"
                      className="w-4 h-4 cursor-pointer"
                      onClick={() => HandleDeletes(item.id, item.title)}
                    />
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div style={{ width: "767px", height: "490px" }} className="mb-8">
            <img src={EmptyState} alt="img" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
