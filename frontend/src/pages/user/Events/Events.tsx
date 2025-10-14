import "./Events.css";
import { Link } from "react-router-dom";

export default function Events() {
    return (
        <div className="page">
            <h2>User Events</h2>
            <ul className="list">
                <li><Link to="/app/events/101">Event #101</Link></li>
                <li><Link to="/app/events/202">Event #202</Link></li>
            </ul>
        </div>
    );
}
