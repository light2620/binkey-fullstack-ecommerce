import { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { userUpdateApi } from "../api/user.api";
import { setUser } from "../redux/userSlice";
import { fetchUserDetails } from "../utils/fetchUserDetails";
import UserProfileAvatar from "../components/userProfileAvatar";
export default function Profile() {
  const userDetails = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [editAvatar,setEditAvatar] = useState(true)

  // Maintain local state for form inputs
  const [formData, setFormData] = useState({
    name: "",
    email:  "",
    mobile: "",
  });
  useEffect(()=>{
        setFormData({
            name: userDetails.name || "",
            email: userDetails.email || "",
            mobile: userDetails.mobile || "",

        })

  },[userDetails])

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Function to update user details
  async function updateUserDetails() {
    setIsEdit(false);
    try {
      const response = await userUpdateApi(formData);
      console.log(response);
      // Fetch updated user details from API and update Redux store
      fetchUserDetails(dispatch, setUser);
      
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <section className="flex flex-col items-center gap-5 min-h-[79vh]">
        <div className="w-[200px] flex flex-col gap-1 justify-center items-center">
          <div className="w-20 h-20 rounded-full  flex items-center justify-center overflow-hidden">
            {
                userDetails.avatar  ? <img src={userDetails.avatar} alt="" className="w-full h-full " /> : <FaRegUserCircle size={75} />
            }
            
          </div>
          <div className="py-0 px-1 border bg-gray-100 rounded-lg text-center hover:border-amber-300">
            <label htmlFor="avatar">Upload</label>
            <input type="file" id="avatar" className="hidden" />
          </div>
          {/* {
            editAvatar  && <UserProfileAvatar /> 
          } */}
        </div>

        {/* Editable Form */}
        <form action="" className="flex flex-col items-center w-[600px] gap-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">NAME</label>
            <input
              type="text"
              id="name"
              disabled={!isEdit}
              className="w-[300px] outline-none border rounded p-2"
              value={formData.name}
              onChange={handleChange} // Update state on input change
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">EMAIL</label>
            <input
              type="text"
              id="email"
              disabled={!isEdit}
              className="w-[300px] outline-none border rounded p-2"
              value={formData.email}
              onChange={handleChange} // Update state on input change
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="mobile">MOBILE</label>
            <input
              type="number"
              id="mobile"
              disabled={!isEdit}
              className="w-[300px] outline-none border rounded p-2"
              value={formData.mobile}
              onChange={handleChange} // Update state on input change
            />
          </div>
        </form>

        {/* Buttons */}
        {isEdit ? (
          <button
            onClick={updateUserDetails}
            className="rounded w-[300px] bg-yellow-500 hover:bg-yellow-400 text-white py-1 text-lg font-semibold"
          >
            Update Details
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="rounded w-[300px] bg-green-900 hover:bg-green-800 text-white py-1 text-lg font-semibold"
          >
            Edit
          </button>
        )}
      </section>
    </>
  );
}
