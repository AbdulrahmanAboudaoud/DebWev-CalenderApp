import "./AdminEvents.css";
import { Link } from "react-router-dom";

export default function AdminEvents() {
    return (
        <div className="page">
            <h2>Admin Events</h2>
            <ul className="list">
                <li><Link to="/admin/events/999">Admin Event #999</Link></li>
            </ul>
        </div>
    );
}
