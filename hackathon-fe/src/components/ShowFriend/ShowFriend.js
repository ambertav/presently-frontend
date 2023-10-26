import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ShowFriend.module.css";
import { Card, CardHeader, IconButton, CardContent, Typography } from "@mui/material";
import * as friendsService from "../../utilities/friends-service";
import {
  daysUntilBirthday,
  splitDOB,
  calculateAge
} from "../../utilities/helpers";
import { BsArrowLeftCircle, BsHeart, BsPencilFill } from "react-icons/bs";

const ShowFriend = () => {


  const [friend, setFriend] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [dobObject, setDobObject] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [enableRecs, setEnableRecs] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFriend = async () => {
      const friend = await friendsService.showFriend(id);
      console.log(friend);
      setFriend(friend);
      setDobObject(splitDOB(friend.dob));
    }
    const fetchFavorites = async () => {
      const favorites = await friendsService.getFavorites(id);
      console.log(favorites);
      setFavorites(favorites);
    }
    fetchFriend();
    fetchFavorites();
  }, [id]);
  const handleTabClick = tabName => {
    setActiveTab(tabName);
  }

  const handleEditProfile = () => {
    navigate(`/friend/${id}/edit`);
  }

  const handleEditTags = () => {
    alert("Edit friend tags");
  }

  const handleEditFavorites = () => {
    alert("Edit favorites");
  }

  const giftPreferences = friend && friend.giftPreferences;


  return (
    <div className={styles["container"]}>
      <div className={styles["shadow"]}></div>
      <button type="button" onClick={() => navigate("/friends")}>
        <a>X</a>
      </button>
      <div className={styles["profile"]}>
        <img
          src={friend && friend.photo ? friend.photo : "https://i.imgur.com/hCwHtRc.png"}
          alt="Anthony Sudol"
          className={styles["profile-pic"]}
        />

        <h2>
          {friend && friend.name}
        </h2>

        <p>Friend</p>
      </div>
      <div className={styles["birthday"]}>
        <div className={styles["description"]}>
          <p className={styles["text-brick"]}>{dobObject && dobObject.day}</p>
          <p>{dobObject && dobObject.month}</p>

        </div>
        <div className={styles["border"]}>
          <p></p><p></p>
        </div>
        <div className={styles["description"]}>
          <p className={styles["text-brick"]}>{friend && daysUntilBirthday(friend.dob)}</p>
          <p>days left</p>

        </div>
        <div className={styles["border"]}>
          <p></p><p></p>
        </div>
        <div className={styles["description"]}>
          <p className={styles["text-brick"]}>Age </p>
          <p>{friend && calculateAge(friend.dob)}</p>
        </div>
        <div>
          <BsPencilFill onClick={handleEditProfile} />
        </div>
      </div>
      <div className={styles["tab-container"]}>
        <span
          onClick={() => handleTabClick("profile")}
          className={activeTab === "profile" ? styles["active-tab"] : ""}
        >
          Profile
        </span>
        <span
          onClick={() => handleTabClick("explore")}
          className={activeTab === "explore" ? styles["active-tab"] : ""}
        >
          Explore Gifts
        </span>
      </div>
      {activeTab === "profile" &&
        <>
          <Card className={styles["card"]}>
            <CardHeader className={styles["card-header"]} title="Gift Type" action={
              <IconButton onClick={handleEditProfile}>
                <BsPencilFill />
              </IconButton>
            } />
            <CardContent>
              <div className={styles["gift-preference"]}>
                <div className={styles["gift-types"]}>
                  <div className={styles["gift-type-btn"] + ' ' + (giftPreferences && giftPreferences.includes("Experience") ? styles["active"] : '')}>
                    <div className={styles["gift-type-btn__image--experiences"]}></div>
                    <div className={styles["gift-type-btn__text"]}>Experiences</div>
                  </div>
                  <div className={styles["gift-type-btn"] + ' ' + (giftPreferences && giftPreferences.includes("Present") ? styles["active"] : '')}>
                    <div className={styles["gift-type-btn__image--presents"]}></div>
                    <div className={styles["gift-type-btn__text"]}>Presents</div>
                  </div>
                  <div className={styles["gift-type-btn"] + ' ' + (giftPreferences && giftPreferences.includes("Donation") ? styles["active"] : '')}>
                    <div className={styles["gift-type-btn__image--donations"]}></div>
                    <div className={styles["gift-type-btn__text"]}>Donations</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className={styles["card"]}>
            <CardHeader className={styles["card-header"]} title="Selected Tags" action={
              <IconButton onClick={handleEditTags}>
                <BsPencilFill />
              </IconButton>
            } />
            <CardContent>
              <div className={styles["gift-preference"]}>
                <div className={styles["tags"]}>
                  {friend && friend.tags && !!friend.tags.length && friend.tags.map((tag, idx) =>
                    <>
                      <button key={tag._id}>{tag.title}</button>
                    </>)}
                  {
                    !(friend && friend.tags && !!friend.tags.length) &&
                    <>
                      <div>
                        Your friend doesn't have any tags. Click edit to add them.
                      </div>
                    </>
                  }
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className={styles["card"]}>
            <CardHeader className={styles["card-header"]} title="Favorite Gifts" action={
              <IconButton onClick={handleEditFavorites}>
                <BsPencilFill />
              </IconButton>
            } />
            <CardContent>
              <div className={styles["gift-recommendations"]}>
                {favorites && !!favorites.length && favorites.map((fav, idx) => {
                  // Grid display or flex the favorites here
                })}
                {
                  !(favorites && !!favorites.length) && <div>You haven't favorited any gifts yet.</div>
                }
              </div>
            </CardContent>
          </Card>
        </>}
      {
        activeTab === "explore" &&
        <>
          <div className={styles["personalized-recs--container"]}>
            <div className={styles["personalized-recs--container--header"]}>
              <Typography variant="h6"><div>Personalized Recommendations</div></Typography>
              <IconButton disabled={!enableRecs}>
                <div>Refresh</div>
              </IconButton>
              <IconButton disabled={!enableRecs}>
                <div>Filter</div>
              </IconButton>
            </div>
            {(friend && friend.tags && !!friend.tags.length) &&
              <>
                <div className={styles["personalized-recs--grid"]}>
                  <div className={styles["grid-item"]}>
                    <div className={styles["product-pic"]}></div>
                    <div className={styles["product-heart"]}><IconButton><BsHeart /></IconButton></div>
                    <div className={styles["product-name"]}>Bluetooth Earbuds</div>
                    <div className={styles["product-price"]}>~$100</div>
                  </div>
                  <div className={styles["grid-item"]}>
                    <div className={styles["product-pic"]}></div>
                    <div className={styles["product-heart"]}><IconButton><BsHeart /></IconButton></div>
                    <div className={styles["product-name"]}>Ficus</div>
                    <div className={styles["product-price"]}>~$100</div>
                  </div>
                  <div className={styles["grid-item"]}>
                    <div className={styles["product-pic"]}></div>
                    <div className={styles["product-heart"]}><IconButton><BsHeart /></IconButton></div>
                    <div className={styles["product-name"]}>Memory Foam Pillow</div>
                    <div className={styles["product-price"]}>~$100</div>
                  </div>
                  <div className={styles["grid-item"]}>
                    <div className={styles["product-pic"]}></div>
                    <div className={styles["product-heart"]}><IconButton><BsHeart /></IconButton></div>
                    <div className={styles["product-name"]}>Bluetooth Earbuds</div>
                    <div className={styles["product-price"]}>~$100</div>
                  </div>
                </div>
              </>
            }
            {
              !(friend && friend.tags && !!friend.tags.length) &&
              <>
                <div className={styles["no-tags-text"]}><Typography>Add tags to get personalized gift recommendations</Typography></div>
              </>
            }
          </div>
        </>
      }
    </div>
  );
};

export default ShowFriend;
