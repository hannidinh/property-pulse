import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import Goback from "@/components/Goback";

const PropertyPage = async ({ params }) => {
    await connectDB();
    const property = await Property.findById(params.id).lean();
    return (
        <>
            <PropertyHeaderImage image={property.images[0]} />
            <Goback />
            <section className="bg-blue-50">
                <div className="container m-auto py-10 px-6">
                    <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                        {/* Property Info */}
                    </div>
                </div>
            </section>
        </>
    );
}

export default PropertyPage;