import React, { useEffect, useState } from 'react';
import { Chrono } from "react-chrono";
import api from '../utils/api';

const Timeline = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get('/expenses');
                const expenses = res.data.data || [];

                // Sort by date desc
                const sorted = expenses.sort((a, b) => new Date(b.date) - new Date(a.date));

                const timelineItems = sorted.map(e => ({
                    title: new Date(e.date).toLocaleDateString(),
                    cardTitle: e.description, // Use description as title
                    cardSubtitle: `$${e.amount} - ${e.category}`,
                    cardDetailedText: e.notes || 'No notes', // Use notes for details
                }));

                setItems(timelineItems);
            } catch (err) {
                console.error("Failed to fetch timeline data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="text-center py-10">Loading timeline...</div>;
    if (items.length === 0) return <div className="text-center py-10">No history yet.</div>;

    return (
        <div className="w-full h-[600px] bg-white rounded-2xl p-4 shadow-sm">
            <Chrono
                items={items}
                mode="VERTICAL_ALTERNATING"
                disableToolbar
                cardHeight={100}
                theme={{
                    primary: '#2563EB',
                    secondary: '#EFF6FF',
                    cardBgColor: 'white',
                    cardForeColor: 'black',
                    titleColor: 'black',
                    titleColorActive: '#2563EB',
                }}
            />
        </div>
    );
};

export default Timeline;
