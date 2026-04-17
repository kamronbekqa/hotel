import mongoose from 'mongoose';

const dachaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    minlength: [10, 'Description must be at least 10 characters'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be a positive number']
  },
  type: {
    type: String,
    required: [true, 'Type is required'],
    enum: {
      values: ['sale', 'rent'],
      message: 'Type must be either sale or rent'
    }
  },
  image: {
    type: String,
    default: '/uploads/default-dacha.jpg'
  },
  status: {
    type: String,
    enum: {
      values: ['available', 'booked'],
      message: 'Status must be either available or booked'
    },
    default: 'available'
  },
  features: {
    type: [String],
    default: []
  },
  location: {
    type: String,
    trim: true,
    default: ''
  },
  bedrooms: {
    type: Number,
    min: [0, 'Bedrooms must be a positive number'],
    default: 0
  },
  bathrooms: {
    type: Number,
    min: [0, 'Bathrooms must be a positive number'],
    default: 0
  },
  area: {
    type: Number,
    min: [0, 'Area must be a positive number'],
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update updatedAt before saving
dachaSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Dacha = mongoose.model('Dacha', dachaSchema);

export default Dacha;
