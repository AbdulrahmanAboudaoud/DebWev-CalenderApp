// src/components/events/EventIdeaForm.tsx
import React, { useState } from "react";

type Props = {
    onSubmit: (formData: FormData) => void;
    title?: string;
    description?: string;
    buttonLabel?: string;
};

const EventIdeaForm: React.FC<Props> = ({
    onSubmit,
    title = "Submit your event idea",
    description = "Share your vision for the next great event — tell us what, where, and when! We’ll review it and might feature it on the list.",
    buttonLabel = "Submit",
}) => {
    const [preview, setPreview] = useState<string | null>(null);

    return (
        <>
            <form
                className="row g-3 event-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    const formEl = e.currentTarget as HTMLFormElement;
                    const formData = new FormData(formEl);
                    onSubmit(formData);
                    formEl.reset();
                    setPreview(null);
                }}
                encType="multipart/form-data"
            >
                <h3 className="fw-bold mb-2">{title}</h3>
                <p className="text-body-secondary mb-4">{description}</p>
                {/* Event title */}
                <div className="col-12">
                    <label htmlFor="ideaTitle" className="form-label">Event title</label>
                    <input
                        id="ideaTitle"
                        name="title"
                        type="text"
                        className="form-control"
                        placeholder="e.g., Bowling Night Tournament"
                        required
                    />
                </div>

                {/* Location */}
                <div className="col-12">
                    <label htmlFor="ideaLocation" className="form-label">Location</label>
                    <input
                        id="ideaLocation"
                        name="location"
                        type="text"
                        className="form-control"
                        placeholder="Venue name, City"
                        required
                    />
                </div>

                {/* Start & End Date/Time */}
                <div className="col-12 col-md-6">
                    <label htmlFor="ideaStart" className="form-label">Start date & time</label>
                    <input id="ideaStart" name="startsAt" type="datetime-local" className="form-control" required />
                </div>
                <div className="col-12 col-md-6">
                    <label htmlFor="ideaEnd" className="form-label">End date & time</label>
                    <input id="ideaEnd" name="endsAt" type="datetime-local" className="form-control" required />
                </div>

                {/* Description */}
                <div className="col-12">
                    <label htmlFor="ideaDesc" className="form-label">Description</label>
                    <textarea
                        id="ideaDesc"
                        name="description"
                        className="form-control"
                        rows={4}
                        placeholder="Tell us more (theme, artists, link, etc.)"
                        required
                    />
                </div>

                {/* Image upload */}
                <div className="col-12">
                    <label htmlFor="ideaImage" className="form-label">Event image</label>
                    <input
                        id="ideaImage"
                        name="image"
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onload = () => setPreview(reader.result as string);
                                reader.readAsDataURL(file);
                            } else {
                                setPreview(null);
                            }
                        }}
                        required
                    />
                    {preview && (
                        <div className="mt-3 text-center">
                            <img
                                src={preview}
                                alt="Preview"
                                className="img-fluid rounded shadow-sm"
                                style={{ maxHeight: "250px", objectFit: "cover" }}
                            />
                        </div>
                    )}
                </div>

                {/* Submit */}
                <div className="col-12">
                    <button type="submit" className="btn view-events-btn w-100">
                        {buttonLabel}
                    </button>
                </div>
            </form>
        </>
    );
};

export default EventIdeaForm;
