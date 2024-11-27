import React, { useState, useEffect } from 'react';

const LaunchItem = React.forwardRef(({ launch }, ref) => {
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        if (ref && ref.current) {
            ref.current.classList.add('loaded');
        }
    }, [ref]);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div className="launch__item" ref={ref}>
            <h2>
                {launch.mission_name}
                <span
                    className={`launch__status ${
                        launch.upcoming
                            ? 'launch__status--info'
                            : launch.launch_success
                            ? 'launch__status--success'
                            : 'launch__status--danger'
                    }`}
                >
                    {launch.upcoming ? 'Upcoming' : launch.launch_success ? 'Success' : 'Failed'}
                </span>
            </h2>

            <div className={`launch__body ${showDetails ? 'visible' : ''}`}>
                <div className="launch__details">
                    <div className="launch__meta">
                        <span className="launch__meta-item">{launch.launch_year}</span>
                        {launch.links.article_link && (
                            <a href={launch.links.article_link} target="_blank" rel="noopener noreferrer" className="launch__meta-item">
                                Article
                            </a>
                        )}
                        {launch.links.video_link && (
                            <a href={launch.links.video_link} target="_blank" rel="noopener noreferrer" className="launch__meta-item">
                                Video
                            </a>
                        )}
                    </div>
                    <div className="media">
                        {launch.links.mission_patch ? (
                            <img src={launch.links.mission_patch} alt={`${launch.mission_name} mission patch`} className="launch__image" />
                        ) : (
                            <div className="no-content">No Image Yet</div>
                        )}
                        <p className="launch__details-text">
                            {launch.details || <span className="no-content">No details available.</span>}
                        </p>
                    </div>
                </div>
            </div>

            {/* View/Hide Button */}
            <div className="launch__button-wrapper">
                <button className="btn btn--primary launch__toggle-btn" onClick={toggleDetails}>
                    {showDetails ? 'HIDE' : 'VIEW'}
                </button>
            </div>
        </div>
    );
});

export default LaunchItem;
