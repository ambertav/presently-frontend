import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake } from "@fortawesome/free-solid-svg-icons";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import Confetti from "react-confetti";
import styles from "../../styles/BirthdayFriends.module.css";
import { formatDate, presentlyCardColors, buildGiftLink } from '../../utilities/helpers';

const FriendItem = ({ friend, name, dob, id, photo, daysUntilBirthday, cardColor, favoriteGifts }) => {
    const navigate = useNavigate();
    const [isViewSavedGifts, setIsViewedSavedGifts] = useState(false);
    const canvasRef = useRef(null);

    const viewSavedGiftsHandler = (e) => {
      e.stopPropagation();
      setIsViewedSavedGifts((preVal) => !preVal);
    };

    return (
      <button
        onClick={() => navigate(`/friend/${id}`)}
        className={styles["itemButton"]}
      >
        <div className={styles["item"]}>
          {daysUntilBirthday === 0 && (
            <Confetti
              height="90"
              width="320"
              numberOfPieces="65"
              colors={presentlyCardColors}
              style={{ margin: "8px auto 0" }}
              ref={canvasRef}
            />
          )}

          <div>
            {photo ? (
              <img src={photo} alt={name} />
            ) : (
              <FontAwesomeIcon
                icon={faBirthdayCake}
                size="xl"
                style={{ height: 60, width: 60 }}
                color={cardColor}
              />
            )}
            <div>
              <p>{name}</p>
              <p>{formatDate(dob)}</p>
            </div>

            <div className={styles["card"]}>
              <p className={styles["days"]} style={{ color: cardColor }}>
                {daysUntilBirthday}
              </p>
              <p className={styles["label"]}>Days Left</p>
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundColor: cardColor,
            borderBottomLeftRadius: isViewSavedGifts && "0",
            borderBottomRightRadius: isViewSavedGifts && "0",
          }}
          onClick={viewSavedGiftsHandler}
        >
          View Saved Gifts{" "}
          <sub className={styles.dropdown}>
            {!isViewSavedGifts ? (
              <RiArrowDropDownLine />
            ) : (
              <RiArrowDropUpLine />
            )}
          </sub>
        </div>
        <div className={isViewSavedGifts ? styles.open : ""}>
          {isViewSavedGifts && favoriteGifts && favoriteGifts.map((fav, idx) => {
              return (
                <Link
                  to={buildGiftLink(fav, friend.location)}
                  target="_blank"
                  key={idx}
                  onClick={(e) => e.stopPropagation()}
                >
                  <img src={fav.image} alt={fav.title} />
                  <p>{fav.title}</p>
                </Link>
              );
            })}
          {isViewSavedGifts && !favoriteGifts && (
            <p>No Favorites At This Time.</p>
          )}
        </div>
      </button>
    );
  };

  export default FriendItem;