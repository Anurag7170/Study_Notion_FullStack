import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {sidebarLinks} from "../../../data/dashboard-links";

function Sidebar() {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // to keep track of confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(null);

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="spinner"></div>
      </div>
    );
  }
  return (
    <>
      <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] text-white flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
        <div>
            hello
        </div>
      </div>
    </>
  );
}

export default Sidebar;
