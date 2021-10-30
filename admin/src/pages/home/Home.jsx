import Chart from '../../components/chart/Chart';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
import './home.css';
import WidgetSmall from '../../components/widgetSmall/WidgetSmall';
import WidgetLarge from '../../components/widgetLarge/WidgetLarge';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const MONTHS = useMemo(() =>
        [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ],
        []
    );

    const [userStats, setUserStats] = useState([]);

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await axios.get('/users/stats', {
                    headers: {
                        token: "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNzM5YmQyMDM0ZDhkZjE3ZWE2ZmVkZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNDk5NTU4NywiZXhwIjoxNjM1NDI3NTg3fQ.IC4yGHhz7eGw6O2QD5MQEjtVv-wa04OUm4ihvjEZ4uQ"
                    }
                });
                console.log(res.data);
                const statLists = res.data.sort(function(a, b){
                        return a._id - b._id;
                    }); //Sorting result ids by month
                statLists.map((item) => 
                    setUserStats((prev) => [
                        ...prev,
                        { name: MONTHS[item._id - 1], "New User": item.total}
                    ])
                );
            }
            catch (err) {
                console.log(err);
            }
        };
        getStats();
    }, [MONTHS]);

    return (
        <div className="home">
            <FeaturedInfo />
            <Chart data={userStats} title="User Analytics" grid dataKey="New User" />
            <div className="homeWidgets">
                <WidgetSmall />
                <WidgetLarge />
            </div>
        </div>
    )
}

export default Home;