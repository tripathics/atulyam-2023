import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import cx from "classnames";
import styles from "../styles/Admin.module.scss";
import "../styles/admin.scss";
import { useFetchCollection } from "../hooks/hooks";
import { events } from "../data/data";
import Alert from "../components/Alert";

const AdminNew = () => {
  const { docs, refetch, fetchCollectionError, fetching } =
    useFetchCollection("registered");

  const [eventFilter, setEventFilter] = useState("");

  return (
    <motion.div
      className={cx(styles["admin-page"], "page-transition")}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      exit={{ scaleX: 0 }}
    >
      <Alert message={fetchCollectionError} severity="error" />
      <div className="container">
        <header className={cx("page-header form-header")}>
          <h2 className="heading">Admin</h2>
        </header>
        <main className={styles.main}>
          <div className={styles.filter}></div>

          <nav className={styles["filter-nav"]}>
            <label htmlFor="eventFilter">Filter by events</label>
            <select
              required
              name="eventFilter"
              value={eventFilter}
              onChange={(e) => {
                setEventFilter(e.target.value);
              }}
              defaultChecked=""
            >
              <option value="">All</option>
              {Object.keys(events)
                .filter((id) => events[id].type === "Contest")
                .map((id) => (
                  <option key={id} value={id}>
                    {events[id].title}
                  </option>
                ))}
            </select>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                refetch();
              }}
            >
              Refresh
            </button>
          </nav>

          {fetching ? (
            <p>Please wait...</p>
          ) : (
            <>
              <div className={styles.count}>
                {eventFilter ? events[eventFilter].title : "All"} :{" "}
                {
                  Object.keys(docs).filter(
                    (id) =>
                      docs[id].eventParticipation === eventFilter ||
                      !eventFilter
                  ).length
                }
              </div>

              <div className={styles["table-wrapper"]}>
                <table className={styles["list-table"]}>
                  <thead>
                    <tr>
                      <th>Time submitted</th>
                      <th>Name</th>
                      <th>Sex</th>
                      <th>College</th>
                      <th>Roll no. (if NITAPian)</th>
                      {eventFilter && events[eventFilter].solo === false && (
                        <>
                          <th>Team name</th>
                          <th>Team member details</th>
                        </>
                      )}
                      <th>Whatsapp number</th>
                      <th>Email</th>
                      {!eventFilter && <th>Event</th>}
                      <th>Doc ID</th>
                      <th>userId</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(docs)
                      .filter(
                        (id) =>
                          docs[id].eventParticipation === eventFilter ||
                          !eventFilter
                      )
                      .map((id) => {
                        const {
                          TeamMembers,
                          TeamName,
                          TeamSize,
                          age,
                          college,
                          email,
                          eventParticipation,
                          firstName,
                          gender,
                          lastName,
                          rollno,
                          contact,
                          userId,
                          created,
                        } = docs[id];
                        return (
                          <tr key={id}>
                            <td>
                              {created
                                ? new Date(created).toLocaleString("en-IN", {
                                    dateStyle: "medium",
                                    timeStyle: "medium",
                                  })
                                : ""}
                            </td>
                            <td>
                              {firstName} {lastName}
                            </td>
                            <td>{gender}</td>
                            <td>{college}</td>
                            <td>{rollno}</td>
                            {eventFilter &&
                              events[eventFilter].solo === false && (
                                <>
                                  <td>{TeamMembers}</td>
                                  <td>{TeamName}</td>
                                </>
                              )}
                            <td>{contact}</td>
                            <td>{email}</td>
                            {!eventFilter && (
                              <td>
                                {events[eventParticipation] &&
                                  events[eventParticipation].title}
                              </td>
                            )}
                            <td>{id}</td>
                            <td>{userId}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </main>
      </div>
    </motion.div>
  );
};

const SubmissionRow = () => {};

export default AdminNew;

const Admin = ({ user }) => {
  const { docs, fetching, refetch } = useFetchCollection("registered");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    if (fetching) return;
    console.log(docs);
  }, [fetching]);

  const handlechange = (e) => {
    console.log(e.target.value);
  };

  return (
    <>
      <section
        className={cx(
          "container",
          styles["intro-section"],
          styles["home-section"]
        )}
      >
        <header className={cx(styles.introContent, styles.sectionHeader)}>
          <h2 className={styles.heading}>
            <span style={{ marginRight: "3ch" }}>Atulyam</span>
            <span className={styles._ar}>Admin</span>
          </h2>
          <p className={styles.subtitle}>
            The Admin Portal for ATULYAM 2023 Atulyam is the annual cultural
            festival of NIT Arunachal Pradesh. <br />
            After three years, we return with great evnets and hoping for great
            success.
          </p>
        </header>
      </section>

      <div className="container">
        <div className="FormLabel">
          <div className="event">
            <label htmlFor="events">Event Details</label>
            <br />
            <select
              required
              className="halfInput"
              onChange={(e) => {
                handlechange(e);
              }}
              style={{ padding: "4px 12px" }}
              name="events"
              id="events"
            >
              <option defaultValue={"allEvents"} value="allEvents">
                All Events{" "}
              </option>
              <option value="Modern Dance">Modern Dance</option>
              <option value="Quize">Quize </option>
              <option value="Poetry Slam">Poetry Slam</option>
              <option value="Painting">Painting</option>
              <option value="Short Film Making">Short Film Making</option>
              <option value="Essay">Essay</option>
              <option value="Solo Song"> Solo Song</option>
            </select>
          </div>
          <div>
            {/* {!fetching && docs && (
              
            )} */}
          </div>
        </div>
      </div>
    </>
  );
};

// export default Admin
