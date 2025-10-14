import "./EventDetail.css";
import { useParams } from "react-router-dom";

export default function EventDetail() {
    const { eventId } = useParams();
    return (
        <div className="page">
            <h2>User Event Detail</h2>
            <p>Event ID: <strong>{eventId}</strong></p>
        </div>
    );
}