import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const userid = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await makeRequest.get("/users/find/" + userid);
      return res.data;
    },
  });

  const { data: relationshipData } = useQuery({
    queryKey: ["relationship"],
    queryFn: async () => {
      const res = await makeRequest.get(
        "/relationships?followedUserId=" + userid
      );
      return res.data;
    },
  });

  console.log(relationshipData);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (following) => {
      if (following)
        return makeRequest.delete("/relationships?userId=" + userid);
      return makeRequest.post("/relationships", { userid });
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["relationship"] });
    },
  });

  const handleFollow = async () => {
    await mutation.mutate(relationshipData.includes(currentUser.id));
  };

  console.log(data);

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <div className="profile">
      <div className="images">
        <img src={data.coverPic} alt="" className="cover" />
        <img src={data.profilePic} alt="" className="profilePic" />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>{data.name}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>{data.city}</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>{data.website}</span>
              </div>
            </div>
            {userid === currentUser.id ? (
              <button onClick={() => setOpenUpdate(true)}>update</button>
            ) : (
              <button onClick={handleFollow}>
                {relationshipData.includes(currentUser.id)
                  ? "Following"
                  : "follow"}
              </button>
            )}
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
        <Posts />
      </div>
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
};

export default Profile;
