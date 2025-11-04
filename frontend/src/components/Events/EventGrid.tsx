
import React from "react";
import { Link } from "react-router-dom";
import { EventItem, formatDateRange, formatPriceEUR } from "../../pages/user/Events/Events";

type Props = {
    events: EventItem[];
    buttonLabel?: string;
    linkPrefix?: string;
};

const EventGrid: React.FC<Props> = ({
    events,
    buttonLabel = "View Details",
    linkPrefix = "/events",
}) => {
    return (
        <div className="row g-4 mb-5">
            {events.map((event) => (
                <div key={event.id} className="col-12 col-md-6 col-lg-4">
                    <div className="card h-100 shadow-sm">
                        <img
                            src={event.imageUrl}
                            alt={event.title}
                            className="card-img-top event-card-img"
                        />
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title fw-bold">{event.title}</h5>

                            <div className="d-flex align-items-start gap-2 mb-1 text-body-secondary">
                                <i className="bi bi-calendar-event"></i>
                                <span>{formatDateRange(event.startsAt, event.endsAt)}</span>
                            </div>

                            <div className="d-flex align-items-start gap-2 mb-1 text-body-secondary">
                                <i className="bi bi-geo-alt"></i>
                                <span>
                                    {event.location}, {event.city}
                                </span>
                            </div>

                            <div className="d-flex align-items-start gap-2 mb-3 text-body-secondary">
                                <i className="bi bi-currency-euro"></i>
                                <span>{formatPriceEUR(event.priceEUR)}</span>
                            </div>

                            <div className="mb-3">
                                <span className="badge event-type-badge">{event.type}</span>
                            </div>

                            <div className="mt-auto">
                                <Link
                                    to={`${linkPrefix}/${event.id}`}
                                    className="btn view-events-btn w-100"
                                    state={{ event }}
                                >
                                    {buttonLabel}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {events.length === 0 && (
                <div className="col-12">
                    <div className="alert alert-light border text-center">
                        No events found !
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventGrid;
