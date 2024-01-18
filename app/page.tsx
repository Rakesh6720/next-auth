import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth'
import homeIcon from "@/public/images/irl_event.svg";
import Image from 'next/image';

async function page() {
    const session = await getServerSession(authOptions);

    return (
        <div className='mt-[5rem]'>
            <div id="search-home" className='flex justify-center m-3'>
              <input type="text" placeholder='search events' className='px-2 py-1 border rounded-md w-2/3'/>
            </div>
            <div id="hero" className='flex justify-center items-center p-5 mx-5'>
                <div id="hero-left" className='flex flex-col w-2/3'>
                    <div id="headline">
                        <h2 className='font-bold text-2xl py-3'>The people platform -- Where interests become friendships</h2>
                    </div>
                    <div id="home-body" className='py-3'>
                        <p>Whatever your interest, from hiking and reading to networking and skill sharing, there are thousands of people who share it on Meetup. Events are happening every day—sign up to join the fun.</p>
                    </div>
                    <div id="button" className='py-3'>
                        <button className='bg-green-500 text-white p-3 rounded-md'>Join Meetup</button>
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