import React, { useState } from 'react';
import '../styles/widgets.css';

function DailyProgrammerPage() {
    const [widgets, setWidgets] = useState([{ content: null }, { content: null }, { content: null }]);
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
        const newWidgets = [...widgets];
        newWidgets.push({ content: option.content });
        setWidgets(newWidgets);
        setShowOptions(false);
    };

    return (
        <div className="daily-programmer-page">
            <div className="widgets-container">
                {widgets.map((widget, index) => (
                    <div key={index} className="widget">
                        <div className="widget-header">
                            <button onClick={() => handleRemoveWidget(index)}>
                                {index === widgets.length - 1 ? '-' : '-'}
                            </button>
                        </div>
                        <div className="widget-content">
                            {widget.content && <div>{widget.content}</div>}
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
                        <div className="options-list-container">
                            <div className="options-list">
                                {dummyOptions.map((option, index) => (
                                    <div
                                        key={index}
                                        className="option"
                                        onClick={() => handleSelectOption(option)}
                                    >
                                        {option.title}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DailyProgrammerPage;

const dummyOptions = [
    { title: 'Option 1', content: 'Content for option 1' },
    { title: 'Option 2', content: 'Content for option 2' },
    { title: 'Option 3', content: 'Content for option 3' },
];
