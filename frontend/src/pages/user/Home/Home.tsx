import VoteEvents from "../../../components/VoteEvents/VoteEvents";
import "./Home.css";

export default function Home() {
    return (
        <div className="page">
            <h2>User Home</h2>
            <VoteEvents/>
        </div>
    );
}
