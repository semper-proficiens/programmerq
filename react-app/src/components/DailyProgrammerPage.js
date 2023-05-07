import React, {useContext, useState} from 'react';
import '../styles/widgets.css';
import { DarkModeContext } from '../contexts/DarkModeContext';

const contentOptions = [
    { title: 'HackingBreaches', content: 'Oh no! X got hacked!' },
    { title: 'HackingCode', content: 'These are top PL for hacking' },
    { title: 'HackingTools', content: 'These are the top Tools for hacking' },
    { title: 'HackingSkills', content: 'These are the top Tools for hacking' },
];

function DailyProgrammerPage() {
    const [widgets, setWidgets] = useState([ ]);


    const [showOptions, setShowOptions] = useState(false);
    const { isDarkMode } = useContext(DarkModeContext);
    const [options, setOptions] = useState(contentOptions);

    const handleAddWidget = () => {
        setShowOptions(true);
        if (options.length === 0) {
            alert("There are no more options to select.");
            return;
        }
    };

    const handleRemoveWidget = (index) => {
        const newWidgets = [...widgets];
        newWidgets.splice(index, 1);
        setWidgets(newWidgets);
        setOptions([...options, { title: widgets[index].title, content: widgets[index].content }]);
    };

    const handleSelectOption = (option) => {
        const newWidget = { title: option.title, content: option.content };
        setWidgets([...widgets, newWidget]);
        setShowOptions(false);
        setOptions(options.filter((opt) => opt.title !== option.title));
    };

    return (
        <div className="daily-programmer-page">
            <div className="widgets-container">
                {widgets.map((widget, index) => (
                    <div key={index} className="widget">
                        <div
                            className={isDarkMode ? 'widget-header-dark' : 'widget-header-light'}
                        >
                            <div className="widget-title">{widget.title}</div>
                            <button onClick={() => handleRemoveWidget(index)}>
                                {index === widgets.length - 1 ? '-' : '-'}
                            </button>
                        </div>
                        <div
                            className={
                                isDarkMode ? 'widget-content-dark' : 'widget-content-light'
                            }
                        >
                            {widget.content && <div>{widget.content}</div>}
                        </div>
                    </div>
                ))}
                {widgets.length < 9 && (
                    <div
                        className={
                            isDarkMode ? "add-widget-dark" : "add-widget-light"
                        }
                        onClick={handleAddWidget}
                    >
                        <span>+</span>
                    </div>
                )}
                {showOptions && (
                    <div
                        className={
                            isDarkMode ? "options-container-dark" : "options-container-light"
                        }
                    >
                        <div
                            className={
                                isDarkMode ? "options-header-dark" : "options-header-light"
                            }
                        >
                            <button onClick={() => setShowOptions(false)}>X</button>
                        </div>
                        <div
                            className={
                                isDarkMode ? "options-message-dark" : "options-message-light"
                            }
                        >
                            Select one of the options to fill your widget:
                        </div>
                        <div
                            className={
                                isDarkMode
                                    ? "options-list-container-dark"
                                    : "options-list-container-light"
                            }
                        >
                            <div
                                className={
                                    isDarkMode ? "options-list-dark" : "options-list-light"
                                }
                            >
                                {options.map((option, index) => (
                                    <div
                                        key={index}
                                        className={
                                            isDarkMode ? "option-dark" : "option-light"
                                        }
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
