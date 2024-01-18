import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth'
import homeIcon from "@/public/images/irl_event.svg";
import Image from 'next/image';

async function page() {
    const session = await getServerSession(authOptions);

    return (
        <div>
            <div id="search-home"></div>
            <div id="hero" className='flex'>
                <div id="hero-left" className='flex flex-col'>
                    <div id="headline">
                        <h2>The people platform -- Where interests become friendships</h2>
                    </div>
                    <div id="home-body">
                        <p>Whatever your interest, from hiking and reading to networking and skill sharing, there are thousands of people who share it on Meetup. Events are happening every day—sign up to join the fun.</p>
                    </div>
                    <div id="button">
                        <button>Join Meetup</button>
                    </div>
                </div>
                <div id="hero-right">
                    <Image priority src={homeIcon} alt="homepage"/>
                </div>
            </div>
        </div>
    )
}

export default page