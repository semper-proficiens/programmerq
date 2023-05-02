import React, {useContext, useState} from 'react';
import '../styles/widgets.css';
import { DarkModeContext } from '../contexts/DarkModeContext';

function DailyProgrammerPage() {
    const [widgets, setWidgets] = useState([{ content: null }, { content: null }, { content: null }]);
    const [showOptions, setShowOptions] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const { isDarkMode } = useContext(DarkModeContext);

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
                        <div className={isDarkMode ? "widget-header-dark" : "widget-header-light"}>
                            <button onClick={() => handleRemoveWidget(index)}>
                                {index === widgets.length - 1 ? '-' : '-'}
                            </button>
                        </div>
                        <div className={isDarkMode ? "widget-content-dark" : "widget-content-light"}>
                            {widget.content && <div>{widget.content}</div>}
                        </div>
                    </div>
                ))}
                {widgets.length < 9 && (
                    <div className={isDarkMode ? "add-widget-dark" : "add-widget-light"} onClick={handleAddWidget}>
                        <span>+</span>
                    </div>
                )}
                {showOptions && (
                    <div className={isDarkMode ? "options-container-dark" : "options-container-light"}>
                        <div className={isDarkMode ? "options-header-dark" : "options-header-light"}>
                            <button onClick={() => setShowOptions(false)}>X</button>
                        </div>
                        <div className={isDarkMode ? "options-message-dark" : "options-message-light"}>Select one of the options to fill your widget:</div>
                        <div className={isDarkMode ? "options-list-container-dark" : "options-list-container-light"}>
                            <div className={isDarkMode ? "options-list-dark" : "options-list-light"}>
                                {dummyOptions.map((option, index) => (
                                    <div
                                        key={index}
                                        className={isDarkMode ? "option-dark" : "option-light"}
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
