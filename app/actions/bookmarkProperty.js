'use server';
import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import mongoose from 'mongoose';
async function bookmarkProperty(propertyId) {
    await connectDB();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
        throw new Error('User ID is required');
    }

    const { userId } = sessionUser;

    //const { user } = await User.findById(userId); => cannot find user?
    const user = await User.findOne({ _id: userId });

    if (!user) {
        throw new Error(userId);
    }

    let isBookmarked = user.bookmarks?.includes(propertyId) || false;

    let message;

    if (isBookmarked) {
        // If already bookmarked, then remove
        user.bookmarks.pull(propertyId);
        message = 'Bookmark Removed';
        isBookmarked = false;
    } else {
        user.bookmarks.push(propertyId);
        message = 'Bookmark Added';
        isBookmarked = true;
    }

    await user.save();
    revalidatePath('/properties/saved', 'page');

    return {
        message,
        isBookmarked,
    };
}

export default bookmarkProperty;