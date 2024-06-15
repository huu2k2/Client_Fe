
import { Box, Skeleton } from '@mui/material';
import { BsFillPersonPlusFill } from 'react-icons/bs';
const MainBodySkeleton = () => {

    const handleShowSlideImg = () => {
        // setIsShow(!isShow)
    }
    return (
        <div className="w-[557px] ">

            <div className='w-[557px] h-[313px] relative '>
                <Skeleton
                    width={557}
                    height={313}
                    variant="rounded"
                />
            </div>
            <div className='flex justify-between mt-[10px] ' >
                <Skeleton
                    width={180}
                    height={102}
                    variant="rounded"
                />
                <Skeleton
                    width={180}
                    height={102}
                    variant="rounded"
                />
                <Skeleton
                    width={180}
                    height={102}
                    variant="rounded"
                />
            </div>



            <div className="nthd_flex_between_full h-fit pt-8  ">
                <div className="w-[196px] h-fit gap-6 flex flex-col">
                    <div className="nthd_flex_between_full">
                        <Skeleton
                            width={56}
                            height={56}

                            variant="circular"
                        />
                        <div>
                            <Skeleton
                                height={28}
                                width={132}
                                variant="text"
                            />
                            <Skeleton
                                height={28}
                                width={60}
                                variant="text"
                            />

                        </div>
                    </div>

                    <div
                        className="w-full rounded-lg border  px-[9px] py-[17px] 
          gap-2 nthd_text_medium_sm  text-gray-700 nthd_flex"
                    >
                        <BsFillPersonPlusFill />
                        <span> Theo doi</span>
                    </div>
                </div>

                <div className="w-[288px] h-[76px] nthd_flex_between">
                    <div className="w-[136px] h-full p-2 gap-2">
                        <h2 className=" nthd_text_normal_sm_text">Phong sap trong </h2>
                        <Skeleton ></Skeleton>
                    </div>

                    <div className="border border-gray-400 h-[40px] bg-[#E7E7E7]"></div>

                    <div className="w-[136px] h-full p-2 gap-2">
                        <h2 className=" nthd_text_normal_sm_text">Phong trong </h2>
                        <Skeleton ></Skeleton>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default MainBodySkeleton;
