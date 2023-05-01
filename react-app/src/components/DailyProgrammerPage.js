import React, { useState } from 'react';
import '../styles/widgets.css';

function DailyProgrammerPage() {
    const [widgets, setWidgets] = useState([{},{},{}]);
    const [showOptions, setShowOptions] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleAddWidget = () => {
        setShowOptions(true);
    };

    const handleRemoveWidget = (index) => {
        const newWidgets = [...widgets];
        newWidgets.splice(index, 1);
        setWidgets(newWidgets);
    };

    const handleSelectOption = (option) => {
        setSelectedOption(option);
        setWidgets([...widgets, option]);
        setShowOptions(false);
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
                            {index === widgets.length - 1 && selectedOption && (
                                <div>{selectedOption.content}</div>
                            )}
                        </div>
                    </div>
                ))}
                {widgets.length < 9 && (
                    <div className="add-widget" onClick={handleAddWidget}>
                        <span>+</span>
                    </div>
                )}
                {showOptions && (
                    <div className="options-container">
                        <div className="options-header">
                            <button onClick={() => setShowOptions(false)}>X</button>
                        </div>
                        <div className="options-list">
                            {dummyOptions.map((option, index) => (
                                <div key={index} className="option" onClick={() => handleSelectOption(option)}>
                                    {option.title}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DailyProgrammerPage;

const dummyOptions = [
    { title: 'Option 1', content: 'Content for option 1' },
    { title: 'Option 2', content: 'Content for option 2' },
    { title: 'Option 3', content: 'Content for option 3' },
];
