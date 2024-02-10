import { setLoading, setToken } from "../../slices/authSlice";
import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { AuthEndpoints } from "../apis";
import { setUser } from "../../slices/profileSlice";
import { useSelector } from "react-redux";

//signin
export const signup = async (signupData, navigate, dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await apiConnector(
      "POST",
      AuthEndpoints.SIGNUP_API,
      signupData
    );
    // console.log(response);
    if (!response.data.success) {
      toast.error("Error Occured", response.data.messag);
      throw new Error(response.data.message);
    }
    toast.success("User Registered");
    navigate("/login");
  } catch (error) {
    console.log("Error in signup ", error);
  }
  dispatch(setLoading(false));
};

// login
export const login = async (email, password, navigate, dispatch) => {
  dispatch(setLoading(true));
  const toastId = toast.loading("Loading...");
  try {
    //Api Call
    const response = await apiConnector("Post", AuthEndpoints.LOGIN_API, {
      email,
      password,
    });
    // console.log(response.data.user);
    if (!response.data?.success) {
      toast.error("Login Failed");
      throw new error(response.data.message);
    }
    toast.success("Login Successfully");
    //settoken
    dispatch(setToken(response.data.user.token));
    //image bhi set krdiya
    const userImage = response.data?.user?.image
      ? response.data.user.image
      : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName}${response.data.user.lastName}`;
    const result = response.data.user
    

    result.image = userImage;
    
    dispatch(setUser(result));

    localStorage.setItem("token", JSON.stringify(response.data.user.token));
    navigate("/dashboard/my-profile");
  } catch (error) {
    console.log("Error while running Api: ", error);
  }
  dispatch(setLoading(false));
  toast.dismiss(toastId);
};

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(resetCart());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
  };
}
