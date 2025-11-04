import React from "react";
import { useLocation, useParams } from "react-router-dom";
import type { EventItem } from "./Events";
import { FAKE_EVENTS } from "./Events";
import "./EventDetail.css";

function fmtDateRange(startsAt: string, endsAt?: string) {
    const s = new Date(startsAt);
    const e = endsAt ? new Date(endsAt) : undefined;
    const d = new Intl.DateTimeFormat("nl-NL", {
        weekday: "short", day: "2-digit", month: "short", year: "numeric",
    }).format(s);
    const t = new Intl.DateTimeFormat("nl-NL", { hour: "2-digit", minute: "2-digit" });
    return e ? `${d} • ${t.format(s)}–${t.format(e)}` : `${d} • ${t.format(s)}`;
}

export default function EventDetail() {
    const { eventId } = useParams(); // matches /app/events/:eventId
    const state = useLocation().state as { event?: EventItem } | null;

    const event = state?.event ?? FAKE_EVENTS.find(e => e.id === eventId);
    if (!event) return <div className="container py-4">Event not found.</div>;

    const price = !event.priceEUR || event.priceEUR === 0 ? "Gratis" : `€${event.priceEUR}`;

    return (
        <div className="container py-4 event-detail">
            <div className="row g-4">
                <div className="col-lg-7">
                    <img src={event.imageUrl} alt={event.title} className="img-fluid rounded shadow-sm w-100" />
                </div>
                <div className="col-lg-5">
                    <h1 className="fw-bold mb-1">{event.title}</h1>
                    <p className="text-secondary mb-3">{event.type}</p>

                    <div className="card shadow-sm border-0">
                        <div className="card-body p-0">
                            <table className="table mb-0 align-middle">
                                <tbody>
                                    <tr>
                                        <td style={{ width: 50, textAlign: "center" }}>
                                            <i className="bi bi-calendar-event fs-5 text-secondary"></i>
                                        </td>
                                        <td>{fmtDateRange(event.startsAt, event.endsAt)}</td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: "center" }}>
                                            <i className="bi bi-geo-alt fs-5 text-secondary"></i>
                                        </td>
                                        <td>{event.location}</td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: "center" }}>
                                            <i className="bi bi-building fs-5 text-secondary"></i>
                                        </td>
                                        <td>{event.city}</td>
                                    </tr>

                                    <tr>
                                        <td style={{ textAlign: "center" }}>
                                            <i className="bi bi-cash-coin fs-5 text-secondary"></i>
                                        </td>
                                        <td>{price}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <button className="btn view-events-btn w-100 mt-3">Attend</button>
                </div>
            </div>

            <div className="card mt-4 shadow-sm border-0">
                <div className="card-header bg-white border-0 pt-4">
                    <h3 className="mb-0">More Information</h3>
                </div>
                <div className="card-body">
                    <h5 className="mb-2">About the Event</h5>
                    <p className="mb-0 event-longtext">{event.description}</p>
                </div>
            </div>
        </div>
    );
}
