import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import HomeProperties from "@/components/HompeProperties";
import connectDB from "@/config/database";

const HomePage = () => {
    connectDB();
    return (
        <>
            <Hero />
            <InfoBoxes />
            <HomeProperties />
        </>
    );
}

export default HomePage;