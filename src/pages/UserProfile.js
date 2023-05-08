import React, { useState } from "react";
import { getDoc, doc, where } from "firebase/firestore";
import { db } from "../config/config-dev";
// import { db } from "../config/config-prod";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ReactComponent as LogoutIcon } from "../media/icons/logout.svg";
import { ReactComponent as RegisterIcon } from "../media/icons/register.svg";
import { ReactComponent as UpdateIcon } from "../media/icons/update.svg";
import { ReactComponent as ScheduleIcon } from "../media/icons/schedule.svg";
import { ReactComponent as SpinnerIcon } from "../media/icons/spinner.svg";

import QrCode from "../components/qrCode";
import { NavLink } from "react-router-dom";
import styles from "../styles/Profile.module.scss";
import "../styles/user.scss";
import cx from "classnames";
import { events } from "../data/data";
import SupportLink from "../components/SupportLink";
import { useFetchCollection } from "../hooks/hooks";
import Alert from "../components/Alert";

const UserProfile = ({ user, logoutUser }) => {
  const { docs: registrations, fetching } = useFetchCollection("registered", [
    where("userId", "==", user.user.uid),
  ]);

  const [profiledata, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userQrValue, setUserQrValue] = useState("");

  useEffect(() => {
    if (!user) return;
    if (!user.user) return;
    setLoading(true);
    getDoc(doc(db, "users", user.user.uid))
      .then((snap) => {
        if (snap.exists()) {
          const fetched = snap.data();
          setProfileData(fetched);
        } else {
          setProfileData(null);
          console.log("Data does not exist");
        }
      })
      .catch((err) => {
        console.log("An error occured", err);
        setErrorMessage(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  useEffect(() => {
    if (infoMessage.length === 0) return;
    setTimeout(() => {
      setInfoMessage("");
    }, 5000);
  }, [infoMessage]);

  useEffect(() => {
    if (profiledata && !fetching) {
      const qrStr = `Name ${profiledata.firstName} ${
        profiledata.lastName
      }, Registration Id ${user.user.uid} College ${
        profiledata.college
      } Event Registered [${Object.keys(registrations)
        .map((id) => registrations[id])
        .map((id) => events[id])
        .join(",")}]`;
      setUserQrValue(qrStr);
    }
  }, [profiledata]);

  return (
    <motion.div
      className={cx(styles.profile, "page-transition")}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      exit={{ scaleX: 0 }}
    >
      <Alert
        message={errorMessage}
        handleDismiss={(e) => {
          e.preventDefault();
          setErrorMessage("");
        }}
        severity="error"
      />
      <div className="container">
        <header className={cx("page-header", styles.header)}>
          <h2 className="heading">
            Welcome <br />
            back {user.user.displayName}!
          </h2>
          <div className={styles["header-btn-wrapper"]}>
            <NavLink
              to="/update-profile"
              className={cx("btn", { secondary: user.isProfileComplete })}
            >
              {user.isProfileComplete ? (
                <span className="btn-subtitle">Need changes?</span>
              ) : (
                <span className="btn-subtitle">Your profile is incomplete</span>
              )}
              <span className="btn-text">Update Profile</span>
              <UpdateIcon />
            </NavLink>
          </div>
          <div className="subtitle">
            <h4>{user.user.email}</h4>
            <div className={styles["subtitle-btn-wrapper"]}>
              <button
                className="btn secondary"
                onClick={(e) => {
                  e.preventDefault();
                  logoutUser();
                }}
              >
                <span className="btn-subtitle">We'll meet again</span>
                <span className="btn-text">Logout</span>
                <LogoutIcon />
              </button>
            </div>
          </div>
        </header>
        
        {!fetching && !loading ? (
          <main className={styles.main}>
            {loading ? (
              <p>Please wait...</p>
            ) : (
              profiledata &&
              profiledata.firstName && (
                <>
                  <section className={styles["profile-section"]}>
                    <h2 className={styles.heading}>Personal Details</h2>
                    <div className={styles.user}>
                      <ul className={styles["registration-details"]}>
                        <li>
                          {" "}
                          <span className={cx(styles.title, styles.id)}>
                            {user.user.uid}
                          </span>
                        </li>
                        <li>
                          {" "}
                          <span className={styles.title}>Name</span>
                          <span>{`${profiledata.firstName} ${profiledata.lastName}`}</span>
                        </li>
                        <li>
                          {" "}
                          <span className={styles.title}>Age</span>
                          <span>{profiledata.age}</span>
                        </li>
                        <li>
                          {" "}
                          <span className={styles.title}>Sex</span>
                          <span>{profiledata.gender}</span>
                        </li>
                        <li>
                          {" "}
                          <span className={styles.title}>Whatsapp#</span>
                          <span>{profiledata.contact}</span>
                        </li>
                        <li>
                          {" "}
                          <span className={styles.title}>Address</span>
                          <span>{profiledata.address}</span>
                        </li>
                        {!fetching && (
                          <li>
                            {" "}
                            <span className={styles.title}>
                              Events registered
                            </span>
                            <span>{Object.keys(registrations).length}</span>
                          </li>
                        )}
                      </ul>
                      {!fetching && Object.keys(registrations).length > 0 && (
                        <div className={styles.qr}>
                          <QrCode value={userQrValue} />
                          <div className={styles.ftr}>
                            <p>Autogenerated at www.atulyam23.com</p>
                            <p>
                              Save the screenshot of registration confirmation
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </section>
                </>
              )
            )}
            <section className={styles["profile-section"]}>
              <h2 className={styles.heading}>Your registrations</h2>
              {!fetching &&
                profiledata &&
                profiledata.firstName &&
                (Object.keys(registrations).length > 0 ? (
                  <>
                    <div className={styles.registrations}>
                      {Object.keys(registrations).map((id, i) => {
                        const {
                          TeamName,
                          TeamMembers,
                          contact,
                          eventParticipation,
                        } = registrations[id];
                        return (
                          <div key={id} className={styles.confirmation}>
                            {events[eventParticipation].figureSrc && (
                              <EventFigure
                                figureSrc={events[eventParticipation].figureSrc}
                                title={events[eventParticipation].title}
                              />
                            )}
                            <div className={styles.user}>
                              <ul className={styles["registration-details"]}>
                                <li>
                                  {" "}
                                  <span className={styles.title}>
                                    Whatsapp#
                                  </span>{" "}
                                  <span> {contact}</span>
                                </li>
                                {TeamName && (
                                  <>
                                    <li>
                                      {" "}
                                      <span className={styles.title}>
                                        Team Name
                                      </span>{" "}
                                      <span> {TeamName}</span>
                                    </li>
                                    <li>
                                      {" "}
                                      <span className={styles.title}>
                                        Team Members
                                      </span>{" "}
                                      <span> {TeamMembers}</span>
                                    </li>
                                  </>
                                )}
                              </ul>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : <h4>You have not registered yet</h4>)}
              <div className={styles["btns-wrapper"]}>
                <div className={styles["btn-wrapper"]}>
                  <NavLink to="/events" className="btn secondary">
                    <span className="btn-subtitle">Events</span>
                    <span className="btn-text">
                      Full Event
                      <br />
                      Schedule
                    </span>
                    <ScheduleIcon />
                  </NavLink>
                </div>
                <div className={styles["btn-wrapper"]}>
                  <NavLink to="/register" className="btn">
                    <span className="btn-subtitle">Registrations are open</span>
                    <span className="btn-text">Register</span>
                    <RegisterIcon />
                  </NavLink>
                </div>
              </div>
              <p>Register for multiple events by filling the registration form back to back</p>
              <SupportLink />
            </section>
          </main>
        ) : (
          <p><SpinnerIcon /> Please wait</p>
        )}
      </div>
    </motion.div>
  );
};

const EventFigure = ({ title = "", figureSrc }) =>
  figureSrc && (
    <article className={styles["event-card"]}>
      <figure className={styles["img-wrapper"]}>
        <img alt={title} src={figureSrc} />
      </figure>
      <main>
        <h3 className={styles.title}>{title}</h3>
        <p>Atulyam'23 NITAP</p>
      </main>
    </article>
  );

export default UserProfile;
