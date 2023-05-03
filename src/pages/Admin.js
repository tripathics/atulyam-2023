import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import cx from "classnames";
import styles from "../styles/Admin.module.scss";
import "../styles/admin.scss";
import { events } from "../data/data";
import { registered } from "../data/data2";

const Admin = () => {
  const compareTime = (a, b) => {
    if (registered[a].created < registered[b].created) return 1;
    else if (registered[a].created > registered[b].created) return -1;
    else return 0;
  }

  const [eventFilter, setEventFilter] = useState("");

  return (
    <motion.div
      className={cx(styles["admin-page"], "page-transition")}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      exit={{ scaleX: 0 }}
    >
      <div className="container">
        <header className={cx("page-header form-header")}>
          <h2 className="heading">Admin</h2>
        </header>
        <main className={styles.main}>
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
          </nav>

          {registered && (
            <>
              <div className={styles.count}>
                {eventFilter ? events[eventFilter].title : "All"} :{" "}
                {
                  Object.keys(registered).filter(
                    (id) =>
                      registered[id].eventParticipation === eventFilter ||
                      !eventFilter
                  ).length
                }
              </div>

              <div className={styles["table-wrapper"]}>
                <table className={styles["list-table"]}>
                  <thead>
                    <tr>
                      <th>Time submitted</th>
                      {!eventFilter && <th>Event</th>}
                      <th>Name</th>
                      <th>Sex</th>
                      <th>College</th>
                      <th>Roll no. (if NITAPian)</th>
                      {(!eventFilter || (eventFilter && events[eventFilter].solo === false)) && (<>
                        <th>Team name</th>
                        <th>Team member details</th>
                      </>)}
                      <th>Whatsapp number</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(registered)
                      .sort(compareTime)
                      .filter(
                        (id) =>
                          registered[id].eventParticipation === eventFilter ||
                          !eventFilter
                      )
                      .map((id) => {
                        const {
                          TeamMembers,
                          TeamName,
                          eventParticipation,
                          firstName,
                          lastName,
                          gender,
                          college,
                          rollno,
                          email,
                          contact,
                          userId,
                          created,
                        } = registered[id];
                        return (
                          <tr key={id}>
                            <td style={{ whiteSpace: "nowrap" }}>
                              {new Date(created).toLocaleString("en-IN", {
                                dateStyle: "short",
                                timeStyle: "short",
                              })}
                            </td>
                            {!eventFilter && (
                              <td style={{ whiteSpace: "nowrap" }}>
                                {events[eventParticipation] &&
                                  events[eventParticipation].title}
                              </td>
                            )}
                            <td>
                              {firstName} {lastName}
                            </td>
                            <td>{gender}</td>
                            <td>{college}</td>
                            <td>{rollno}</td>
                            {(!eventFilter ||
                              (eventFilter &&
                                events[eventFilter].solo === false)) && (<>
                                  <td>{TeamMembers}</td>
                                  <td>{TeamName}</td>
                                </>)}
                            <td>{contact}</td>
                            <td>{email}</td>
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


export default Admin;