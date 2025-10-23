import UpcomingEvents from "../../../components/UpcomingEvents/UpcomingEvents";
import VoteEvents from "../../../components/VoteEvents/VoteEvents";
import Calendar from "../../../components/Calendar/Calendar";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <div className="page">
        <h1>Welcome to Your Home Page</h1>
        <div className="content">
            <div className="left-column">
                <UpcomingEvents />
                <VoteEvents />
            </div>
            <div className="right-column">
                <Calendar />
            </div>
        </div>
    </div>
  );
};

export default Home;
