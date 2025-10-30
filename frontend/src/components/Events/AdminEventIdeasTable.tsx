import React from "react";

export type EventIdea = {
    id: string;
    user: string;
    title: string;
    startsAt: string;
    endsAt?: string;
    location: string;
    city?: string;
    description: string;
    imageUrl?: string;
};

type Props = {
    ideas: EventIdea[];
    onAccept: (idea: EventIdea) => void;
};

function formatDateRange(startsAt: string, endsAt?: string) {
    const start = new Date(startsAt);
    const end = endsAt ? new Date(endsAt) : undefined;

    const dateFmt = new Intl.DateTimeFormat("nl-NL", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(start);

    const timeFmt = new Intl.DateTimeFormat("nl-NL", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return end
        ? `${dateFmt} • ${timeFmt.format(start)}–${timeFmt.format(end)}`
        : `${dateFmt} • ${timeFmt.format(start)}`;
}

const AdminEventIdeasTable: React.FC<Props> = ({ ideas, onAccept }) => {
    return (
        <section className="mt-5">
            <h3 className="fw-bold mb-3">Event Ideas</h3>

            <div className="table-responsive">
                <table className="table align-middle table-bordered table-hover admin-event-ideas-table">
                    <thead className="table-light">
                        <tr>
                            <th>User</th>
                            <th>Event Title</th>
                            <th>Date/Time</th>
                            <th>Location</th>
                            <th style={{ minWidth: 240 }}>Description</th>
                            <th>Image</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ideas.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="text-center text-body-secondary py-4">
                                    No event ideas yet.
                                </td>
                            </tr>
                        ) : (
                            ideas.map((idea) => (
                                <tr key={idea.id} className="event-idea-row">
                                    <td className="py-4">{idea.user}</td>
                                    <td className="fw-semibold py-4">{idea.title}</td>
                                    <td className="py-4 text-nowrap">
                                        {formatDateRange(idea.startsAt, idea.endsAt)}
                                    </td>
                                    <td className="py-4">
                                        {idea.location}
                                        {idea.city ? `, ${idea.city}` : ""}
                                    </td>
                                    <td className="py-4 idea-disc">
                                        {idea.description}
                                    </td>
                                    <td className="py-4">
                                        {idea.imageUrl ? (
                                            <img
                                                src={idea.imageUrl}
                                                alt="Idea"
                                                className="img-thumbnail shadow-sm"
                                                style={{ width: 80, height: 80, objectFit: "cover" }}
                                            />
                                        ) : (
                                            <span className="text-body-secondary">—</span>
                                        )}
                                    </td>
                                    <td className="text-center py-4">
                                        <button
                                            type="button"
                                            className="btn btn-accept"
                                            onClick={() => onAccept(idea)}
                                        >
                                            Accept
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default AdminEventIdeasTable;
