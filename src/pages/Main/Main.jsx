import React, { useEffect, useState } from 'react';
import Header from "../../components/Layout/Header/Header";
import man from '../../assets/man.jpg';
import lip from '../../assets/bite.png';
import face from '../../assets/happy-face.png';
import blow from '../../assets/blow.png';
import back from '../../assets/back.mp4';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Main = () => {
    const user = useSelector((state) => state.users.user);
    const [responses, setResponses] = useState({ going: 0, maybe: 0, no: 0 });
    const [initials, setInitials] = useState([]);
    const eventId = "63f9b0efbd1b19a63e2c4f76"; // Replace with the actual event ID

    // Fetch responses and participants on component load
    useEffect(() => {
        axios.get(`https://cervback.onrender.com/events/${eventId}/responses`)
            .then((res) => {
                setResponses(res.data);
                setInitials(res.data.initials); // Set initials for participants
            })
            .catch((err) => console.error("Failed to fetch responses:", err));
    }, [eventId,responses]);

    // Function to handle response submission
    const handleResponse = (responseType) => {
        if (!user) {
            alert("Please log in to respond.");
            return;
        }

        axios.post(`https://cervback.onrender.com/events/${eventId}/respond`, { response: responseType }, {
            headers: { Authorization: `Bearer ${user.token}` },
        })
            .then((res) => {
                    setResponses(res.data);
                    toast.success('Your answer has been recorded')
                }
            )
            .catch((err) =>
            {console.error("Failed to submit response:", err);
                toast.error("There was an error in recording the response.");
            });
    };

    const generateRandomColor = () => {
        let color;
        do {
            color = `#${Math.floor(Math.random() * 16777215).toString(16)}`; // Generate random hex color
        } while (color === '#000000' || color.length < 7); // Ensure it's not black or incomplete
        return color;
    };

    return (
        <main className='main'>
            <div className="main__back">
                <video autoPlay muted loop className="main__video">
                    <source src={back} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <Header />
            <div className="container">
                <div className="main__block">
                    <div className="main__left">
                        <h1 className="main__title">¿CERVEZA JUNTOS?</h1>
                        <p className="main__text">Friday, Jan 17 <br /> 8:00 pm </p>
                        <a href='https://maps.app.goo.gl/WuPwGgE8VgDdYgzu7' className="main__text main__location">Location: click to see</a>
                        <p className="main__text">
                            {responses.going} going, {responses.maybe} maybe, {responses.no} nooo
                        </p>
                        <div className="main__circles">
                            {initials.map((initial, index) => (
                                <div style={{ backgroundColor: generateRandomColor() }} key={index} className="main__circle">{initial}</div>
                            ))}
                        </div>
                        <p className="main__album">Photo Album</p>
                        {user ? (
                            <>
                                <a href='https://drive.google.com/drive/folders/1Y9x4pr72nIwEHRigLgws6Isp_sy7eSAG?usp=sharing'
                                   className="main__text main__link">open it to refresh your memory</a>
                                <br />
                                <a href='https://drive.google.com/drive/folders/1Y9x4pr72nIwEHRigLgws6Isp_sy7eSAG?usp=sharing'
                                   className="main__text main__link">or upload photos</a>
                            </>
                        ) : (
                            <Link to='/login' className="main__text">Login to access</Link>
                        )}
                    </div>
                    <div className="main__right">
                        <img src={man} alt="BeerMan" className="main__img" />
                        <div className="main__box">
                            <div className="main__item" onClick={() => handleResponse('going')}>
                                <img className="main__icon" src={blow} alt="" />
                                <p className="main__text">Goinggg</p>
                            </div>
                            <div className="main__item" onClick={() => handleResponse('maybe')}>
                                <img className="main__icon" src={lip} alt="" />
                                <p className="main__text">Maybe</p>
                            </div>
                            <div className="main__item" onClick={() => handleResponse('no')}>
                                <img className="main__icon" src={face} alt="" />
                                <p className="main__text">Nooo</p>
                            </div>
                        </div>
                    </div>
                    <p className='main__side'>drink,DANCE,drnuk</p>
                </div>
            </div>
        </main>
    );
};

export default Main;
