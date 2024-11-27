import React, { useEffect, useState, useRef, useMemo } from 'react';
import { fetchLaunches } from '../../services/api'; 
import LaunchItem from '../LaunchItem';
import Loader from '../Loader';
import Search from '../Search';

const Index = () => {
    const [launches, setLaunches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const observer = useRef();

    // Fetch launches from the API
    const loadLaunches = async () => {
        setLoading(true);
        try {
            const newLaunches = await fetchLaunches((page - 1) * 10, 10, searchTerm);
            setLaunches((prev) => [...prev, ...newLaunches]);
            setHasMore(newLaunches.length > 0);
        } catch (error) {
            console.error('Error fetching launches:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadLaunches();
    }, [page]);

    // Memoize the filtered list
    const filteredLaunches = useMemo(() => {
        if (searchTerm) {
            return launches.filter((launch) =>
                launch.mission_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return launches;
    }, [launches, searchTerm]);

    const lastLaunchRef = (node) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                setPage((prev) => prev + 1);
            }
        });
        if (node) observer.current.observe(node);
    };

    return (
        <div>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div className="launch">
                <div className="launch__wrapper">
                    <div className="launch__list">
                        {filteredLaunches.map((launch, index) => {
                            if (filteredLaunches.length === index + 1) {
                                return <LaunchItem key={launch.flight_number} launch={launch} ref={lastLaunchRef} />;
                            } else {
                                return <LaunchItem key={launch.flight_number} launch={launch} />;
                            }
                        })}
                        {loading && <Loader />}
                        {!hasMore && <div className="max-reached">End of list.</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
