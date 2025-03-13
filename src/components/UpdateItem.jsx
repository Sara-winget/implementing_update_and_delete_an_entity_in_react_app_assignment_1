import { useState, useEffect } from "react";
import axios from "axios";

const UpdateItem = ({ item }) => {
    const [formData, setFormData] = useState({ name: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Pre-fill the form when item is received
    useEffect(() => {
        if (item) {
            setFormData({ name: item.name || "" });
        }
    }, [item]);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.put(`http://localhost:8000/doors/${item.id}`, formData,
            );

            console.log("Updated Item:", response.data);
            alert("Item updated successfully!");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update item");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Update Item</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {item ? (
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit" disabled={loading}>
                        {loading ? "Updating..." : "Update"}
                    </button>
                </form>
            ) : (
                <p>Loading item...</p>
            )}
        </div>
    );
};

export default UpdateItem;
