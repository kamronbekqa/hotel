import Dacha from '../models/Dacha.js';

// @desc    Get all dachas
// @route   GET /api/dachas
// @access  Public
export const getAllDachas = async (req, res, next) => {
  try {
    const { type, status, search, sort, page = 1, limit = 10 } = req.query;

    // Build query
    const query = {};
    
    if (type) {
      query.type = type;
    }
    
    if (status) {
      query.status = status;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort
    let sortOption = { createdAt: -1 }; // Default: newest first
    
    if (sort === 'price-asc') {
      sortOption = { price: 1 };
    } else if (sort === 'price-desc') {
      sortOption = { price: -1 };
    } else if (sort === 'title') {
      sortOption = { title: 1 };
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const dachas = await Dacha.find(query)
      .sort(sortOption)
      .limit(parseInt(limit))
      .skip(skip);

    // Get total count for pagination
    const total = await Dacha.countDocuments(query);

    res.status(200).json({
      status: 'success',
      data: {
        dachas,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single dacha by ID
// @route   GET /api/dachas/:id
// @access  Public
export const getDachaById = async (req, res, next) => {
  try {
    const dacha = await Dacha.findById(req.params.id);

    if (!dacha) {
      return res.status(404).json({
        status: 'error',
        message: 'Dacha not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { dacha }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new dacha
// @route   POST /api/dachas
// @access  Private/Admin
export const createDacha = async (req, res, next) => {
  try {
    const dachaData = {
      ...req.body,
      // Ensure only admins can set custom status
      status: req.body.status || 'available'
    };

    const dacha = await Dacha.create(dachaData);

    res.status(201).json({
      status: 'success',
      message: 'Dacha created successfully',
      data: { dacha }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update dacha
// @route   PUT /api/dachas/:id
// @access  Private/Admin
export const updateDacha = async (req, res, next) => {
  try {
    const dacha = await Dacha.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!dacha) {
      return res.status(404).json({
        status: 'error',
        message: 'Dacha not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Dacha updated successfully',
      data: { dacha }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete dacha
// @route   DELETE /api/dachas/:id
// @access  Private/Admin
export const deleteDacha = async (req, res, next) => {
  try {
    const dacha = await Dacha.findByIdAndDelete(req.params.id);

    if (!dacha) {
      return res.status(404).json({
        status: 'error',
        message: 'Dacha not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Dacha deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
