import "./AdminEventDetail.css";
import { useParams } from "react-router-dom";

export default function AdminEventDetail() {
    const { eventId } = useParams();
    return (
        <div className="page">
            <h2>Admin Event Detail</h2>
            <p>Event ID: <strong>{eventId}</strong></p>
        </div>
    );
}
