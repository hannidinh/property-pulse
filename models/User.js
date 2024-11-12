import mongoose, { model, models } from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        required: [true, 'Email is required']
    },
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    image: {
        type: String
    },
    bookmarks: [
        {
            type: Schema.Type.ObjectId,
            ref: 'Property'
        }
    ]
}, {
    timestamps: true
})

const User = models.User || model('User', UserSchema);
export default User;