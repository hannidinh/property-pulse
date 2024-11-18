import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyImages from "@/components/PropertyImages";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import Goback from "@/components/Goback";
import PropertyDetails from "@/components/PropertyDetails";
import { convertToSerializableObject } from "@/utils/convertToObject";

const PropertyPage = async ({ params }) => {
    await connectDB();
    // Await params to access `id` properly
    const { id } = await params;
    const propertyDoc = await Property.findById(id).lean();
    const property = convertToSerializableObject(propertyDoc);
    if (!property) {
        return <h1 className="text-center text-2xl font-bold mt-10">Property Not Found</h1>
    }
    return (
        <>
            <PropertyHeaderImage image={property.images[0]} />
            <Goback />
            <section className="bg-blue-50">
                <div className="container m-auto py-10 px-6">
                    <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                        {/* Property Info */}
                        <PropertyDetails property={property} />
                    </div>
                </div>
            </section>
            <PropertyImages images={property.images} />
        </>
    );
}

export default PropertyPage;