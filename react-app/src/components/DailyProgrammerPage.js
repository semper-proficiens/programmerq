import React, { useState } from 'react';
import '../styles/widgets.css';

function DailyProgrammerPage() {
    const [widgets, setWidgets] = useState([{},{},{}]);

    const handleAddWidget = () => {
        setWidgets([...widgets, {}]);
    };

    const handleRemoveWidget = (index) => {
        const newWidgets = [...widgets];
        newWidgets.splice(index, 1);
        setWidgets(newWidgets);
    };

    return (
        <div className="daily-programmer-page">
            <div className="widgets-container">
                {widgets.map((widget, index) => (
                    <div key={index} className="widget">
                        <div className="widget-header">
                            <button onClick={() => handleRemoveWidget(index)}>{index === widgets.length - 1 ? '-' : '-'}</button>
                        </div>
                        <div className="widget-content">
                            {/* Content to be supplied from backend */}
                        </div>
                    </div>
                ))}
                {widgets.length < 9 && (
                    <div className="add-widget" onClick={handleAddWidget}>
                        <span>+</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DailyProgrammerPage;
