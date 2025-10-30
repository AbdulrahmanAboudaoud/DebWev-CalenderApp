import React, { useMemo, useState } from "react";
import EventGrid from "../../../components/Events/EventGrid";
import EventIdeaForm from "../../../components/Events/EventIdeaForm";
import AdminEventIdeasTable, { EventIdea } from "../../../components/Events/AdminEventIdeasTable";
import { EventItem } from "../../../pages/user/Events/Events";
import "./AdminEvents.css";
const INITIAL_EVENTS: EventItem[] = [
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

const INITIAL_IDEAS: EventIdea[] = [
    {
        id: "i1",
        user: "Sophie de Vries",
        title: "Team Building Retreat",
        startsAt: "2025-12-10T09:00",
        endsAt: "2025-12-10T17:00",
        location: "De Buitenplaats",
        city: "Utrecht",
        description:
            "A full-day company retreat focusing on collaboration, creative thinking, and team bonding activities in nature.",
        imageUrl:
            "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop",
    },
    {
        id: "i2",
        user: "Lars Hendriks",
        title: "Corporate Innovation Workshop",
        startsAt: "2025-11-28T13:00",
        endsAt: "2025-11-28T18:00",
        location: "BrightHub Offices",
        city: "Amsterdam",
        description:
            "Interactive session for teams to brainstorm new solutions and product ideas, guided by external innovation experts.",
        imageUrl:
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop",
    },
    {
        id: "i3",
        user: "Eva Janssen",
        title: "Networking Dinner & Drinks",
        startsAt: "2025-12-15T19:00",
        endsAt: "2025-12-15T23:00",
        location: "The Harbour Club",
        city: "Rotterdam",
        description:
            "An evening for professionals across departments to connect over food, drinks, and relaxed conversations.",
        imageUrl:
            "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1600&auto=format&fit=crop",
    },
    {
        id: "i4",
        user: "Tom van Dijk",
        title: "Annual Company Gala",
        startsAt: "2025-12-20T18:30",
        endsAt: "2025-12-21T01:00",
        location: "Hilton Conference Hall",
        city: "The Hague",
        description:
            "A formal black-tie event to celebrate yearly achievements, with live music, dinner, and awards for top performers.",
        imageUrl:
            "https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=1600&auto=format&fit=crop",
    },
];

const AdminEventsPage: React.FC = () => {
    const [query, setQuery] = useState("");
    const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
    const [ideas, setIdeas] = useState<EventIdea[]>(INITIAL_IDEAS);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return events;
        return events.filter((e) =>
            [e.title, e.location, e.city, e.type].join(" ").toLowerCase().includes(q)
        );
    }, [query, events]);

    // Reused form: actually add a new event to the grid
    const handleAddEvent = (formData: FormData) => {
        const title = String(formData.get("title") || "").trim();
        const location = String(formData.get("location") || "").trim();
        const startsAt = String(formData.get("startsAt") || "");
        const endsAt = String(formData.get("endsAt") || "");
        const description = String(formData.get("description") || ""); // not stored on EventItem, but available
        const type = String(formData.get("type") || "Other").trim();
        const cityGuess = (location.includes(",") ? location.split(",")[1] : "").trim();
        const priceStr = String(formData.get("priceEUR") || "").trim();
        const priceEUR = priceStr ? Number(priceStr) : 0;

        const imgUrl = String(formData.get("imageUrl") || "").trim();
        const file = formData.get("image") as File | null;

        let imageUrl = imgUrl;
        if (file && file.size > 0) {
            imageUrl = URL.createObjectURL(file);
        }

        if (!title || !location || !startsAt || !endsAt || !imageUrl) {
            alert("Please fill all required fields (title, location, start, end, image).");
            return;
        }
        if (new Date(endsAt).getTime() < new Date(startsAt).getTime()) {
            alert("End date/time must be after the start date/time.");
            return;
        }

        const newEvent: EventItem = {
            id: Date.now().toString(),
            title,
            location,
            city: cityGuess || "", // you can add a City field to your form later if you want
            startsAt,
            endsAt,
            type,
            priceEUR,
            imageUrl,
            description
        };

        setEvents((prev) => [newEvent, ...prev]);
        alert("New event created successfully ✅");
    };

    // Accept idea: convert to event + remove from ideas
    const handleAcceptIdea = (idea: EventIdea) => {
        const newEvent: EventItem = {
            id: Date.now().toString(),
            title: idea.title,
            startsAt: idea.startsAt,
            endsAt: idea.endsAt,
            location: idea.location,
            city: idea.city || "",
            priceEUR: 0,
            type: "Other",
            imageUrl: idea.imageUrl || "https://via.placeholder.com/800x600?text=Event",
            description: idea.description,
        };
        setEvents((prev) => [newEvent, ...prev]);
        setIdeas((prev) => prev.filter((i) => i.id !== idea.id));
    };

    return (
        <div className="container py-4">
            {/* Search Bar */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="input-group">
                        <span className="input-group-text">
                            <i className="bi bi-search"></i>
                        </span>
                        <input
                            type="search"
                            className="form-control"
                            placeholder="Search events..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Title */}
            <h2 className="fw-bold mb-3">Manage Events</h2>

            {/* Same grid, just different button/link for admin */}
            <EventGrid events={filtered} buttonLabel="Edit Event" linkPrefix="/admin/events" />

            {/* Event Ideas table (pending suggestions to accept) */}
            <AdminEventIdeasTable ideas={ideas} onAccept={handleAcceptIdea} />

            {/* Reuse the same form to create events */}
            <section className="mt-5">
                <EventIdeaForm
                    onSubmit={handleAddEvent}
                    title="Add a new event"
                    description="Fill out the details below to add a new event to the system."
                    buttonLabel="Add Event"
                />
            </section>
        </div>
    );
};

export default AdminEventsPage;
