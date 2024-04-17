import { FontAwesomeIcon, isLoginUser, useSelector } from "../../Constants";
import Countdown from "react-countdown";
const CountDown = ({ futureDate, completionMessage, title, color }) => {
  const isLogin = useSelector(isLoginUser);
  const formatNumber = (number) => {
    return String(number).padStart(2, "0");
  };
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span>{completionMessage}</span>;
    } else {
      return (
        <span>
          {formatNumber(days)}:{formatNumber(hours)}:{formatNumber(minutes)}:
          {formatNumber(seconds)}
        </span>
      );
    }
  };

  return (
    <div
      title={title}
      className="counterDown"
      style={
        isLogin
          ? { bottom: "230px", color: color }
          : { bottom: "160px", color: color }
      }
    >
      <FontAwesomeIcon className="mx-2" icon="fa-clock" />
      <Countdown date={futureDate} renderer={renderer} />
    </div>
  );
};
export default CountDown;
