// frontend/src/pages/user/Events/EventsPage.tsx
import React, { useMemo, useState } from "react";
import "./Events.css";
import EventGrid from "../../../components/Events/EventGrid";
import EventIdeaForm from "../../../components/Events/EventIdeaForm";

export type EventItem = {
    id: string;
    title: string;
    startsAt: string;
    endsAt?: string;
    location: string;
    city: string;
    priceEUR?: number;
    type: string;
    imageUrl: string;
    description: string;
};

export const FAKE_EVENTS: EventItem[] = [
    {
        id: "1",
        title: "Summer DJ Night at the Beach",
        startsAt: "2025-11-08T20:00:00+01:00",
        endsAt: "2025-11-09T02:00:00+01:00",
        location: "Strandpaviljoen Sunset",
        city: "Scheveningen",
        priceEUR: 15,
        type: "Party",
        imageUrl:
            "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?q=80&w=1600&auto=format&fit=crop",
        description:
            "Get ready for a night of dancing under the stars! The Summer DJ Night brings you top local DJs, tropical cocktails, and an incredible beach vibe. Expect vibrant lights, energetic beats, and a crowd that’s all about good times. Dress for the summer and dance until sunrise with your friends right by the waves.",
    },
    {
        id: "2",
        title: "Karaoke & Drinks Night",
        startsAt: "2025-11-22T21:00:00+01:00",
        endsAt: "2025-11-23T01:00:00+01:00",
        location: "SingStar Bar",
        city: "Groningen",
        priceEUR: 0,
        type: "Entertainment",
        imageUrl:
            "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1600&auto=format&fit=crop",
        description:
            "A cozy evening full of laughter, friends, and music! Step on stage and sing your heart out while enjoying delicious cocktails and snacks. Whether you’re a pro singer or just there for fun, our Karaoke & Drinks Night is the perfect way to unwind and share a good laugh with your crew.",
    },
    {
        id: "3",
        title: "Street Food Festival",
        startsAt: "2025-11-29T12:00:00+01:00",
        endsAt: "2025-11-29T23:00:00+01:00",
        location: "Central Park",
        city: "Utrecht",
        priceEUR: 0,
        type: "Festival",
        imageUrl:
            "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1600&auto=format&fit=crop",
        description:
            "Discover a world of flavors at Utrecht’s annual Street Food Festival! Dozens of food trucks and local chefs gather for a day of global tastes, live music, and open-air fun. Bring your friends, try something new, and enjoy the festive atmosphere filled with the smell of fresh street food and live performances throughout the day.",
    },
];


export function formatDateRange(startsAt: string, endsAt?: string) {
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

    if (end) {
        return `${dateFmt} • ${timeFmt.format(start)}–${timeFmt.format(end)}`;
    }
    return `${dateFmt} • ${timeFmt.format(start)}`;
}

export function formatPriceEUR(priceEUR?: number) {
    if (!priceEUR || priceEUR === 0) return "Gratis";
    return priceEUR.toString();
}

const EventsPage: React.FC = () => {
    const [query, setQuery] = useState("");

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return FAKE_EVENTS;
        return FAKE_EVENTS.filter((e) => {
            const hay = [
                e.title,
                e.location,
                e.city,
                e.type,
                formatDateRange(e.startsAt, e.endsAt),
                formatPriceEUR(e.priceEUR),
            ]
                .join(" ")
                .toLowerCase();
            return hay.includes(q);
        });
    }, [query]);

    const handleIdeaSubmit = (formData: FormData) => {
        console.log("Event idea submitted:", Object.fromEntries(formData.entries()));
        alert("Thanks! Your event idea has been submitted 🎉");
    };

    return (
        <div className="container py-4">
            {/* Search Bar */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="input-group">
                        <span className="input-group-text" id="search-addon">
                            <i className="bi bi-search"></i>
                        </span>
                        <input
                            type="search"
                            className="form-control"
                            placeholder="Search for fun events..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Title */}
            <h2 className="fw-bold mb-3">Upcoming Events</h2>

            {/* Grid */}
            <EventGrid
                events={filtered}
                linkPrefix="/app/events"
                buttonLabel="View Details"
            />


            {/* Form */}
            <section className="mt-5">
                <EventIdeaForm onSubmit={handleIdeaSubmit} />
            </section>
        </div>
    );
};

export default EventsPage;
