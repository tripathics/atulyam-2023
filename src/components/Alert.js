import { AnimatePresence, motion } from "framer-motion";
import { ReactComponent as InfoIcon } from "../media/icons/info.svg";
import { ReactComponent as WarningIcon } from "../media/icons/warning.svg";
import { ReactComponent as ErrorIcon } from "../media/icons/error.svg";
import { ReactComponent as SuccessIcon } from "../media/icons/success.svg";
import { ReactComponent as CloseIcon } from "../media/icons/cross.svg";
import styles from "./Alert.module.scss";
import cx from "classnames";
import { useEffect, useState } from "react";

const Icon = ({ severity }) => {
  if (severity === "success") return <SuccessIcon />;
  else if (severity === "warning") return <WarningIcon />;
  else if (severity === "error") return <ErrorIcon />;
  else return <InfoIcon />;
};

const Alert = ({ severity = "info", message = "", handleDismiss = null }) => {
  return (
    <AnimatePresence mode="wait">
      {message && (
        <motion.div
          className={cx(styles.alert, styles[severity])}
          initial={{ transform: "translate3d(-50%, -101%, 0)" }}
          animate={{ transform: "translate3d(-50%, var(--nav-height), 0)" }}
          exit={{ transform: "translate3d(-50%, -101%, 0)" }}
          transition={{ ease: [0.86, 0, 0.07, 0.995] }}
        >
          <div className={styles.icon}>
            <Icon severity={severity} />
          </div>
          <div className={styles.message}>{message}</div>
          {handleDismiss && (
            <button
              type="button"
              className={styles.dismiss}
              onClick={handleDismiss}
            >
              <CloseIcon />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Alert;
