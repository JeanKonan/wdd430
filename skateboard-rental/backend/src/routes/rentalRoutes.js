import express from 'express';
import { Rental } from '../models/index.js';
import { Skateboard } from '../models/Skateboard.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/rentals - Get all rentals
router.get('/', authMiddleware, async (req, res) => {
    try {
        const rentals = await Rental.findAll({ where: { userId: req.user.id } });

        // if (!rentals || rentals.length === 0) {
        //     return res.status(404).json({
        //         success: false,
        //         message: 'No rentals found'
        //     });
        // }

        res.json({
            success: true,
            message: 'Rentals retrieved successfully',
            rentals: rentals || []
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching rentals',
            error: error.message
        })
    }
});

// POST /api/rentals - Create a new rental
router.post('/', authMiddleware, async (req, res) => {
    const { skateboardId, pickupDate, returnDate } = req.body;

    if (!skateboardId || !pickupDate || !returnDate) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required'
        });
    }

    try {
        const skateboard = await Skateboard.findByPk(skateboardId);

        if (!skateboard) {
            return res.status(404).json({
                success: false,
                message: 'Skateboard not found'
            });
        }

        const totalPrice = skateboard.pricePerHour * Math.ceil((new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60));

        const rental = await Rental.create({
            userId: req.user.id,
            skateboardId,
            pickupDate,
            returnDate,
            totalPrice
        });

        res.status(201).json({
            success: true,
            message: 'Rental created successfully',
            rental: rental
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating rental',
            error: error.message
        })
    }
});

// PATCH /api/rentals/:id/cancel - Cancel a rental (MUST come before GET /:id)
router.patch('/:id/cancel', authMiddleware, async (req, res) => {
    const { id } = req.params;

    try {
        const rental = await Rental.findByPk(id);

        if (!rental) {
            return res.status(404).json({
                success: false,
                message: 'Rental not found'
            });
        }

        // Only the owner can cancel their rental
        if (rental.userId !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to cancel this rental'
            });
        }

        // Can't cancel if already completed
        if (rental.status === 'completed') {
            return res.status(400).json({
                success: false,
                message: 'Cannot cancel a completed rental'
            });
        }

        // Update status to cancelled
        rental.status = 'cancelled';
        await rental.save();

        res.json({
            success: true,
            message: 'Rental cancelled successfully',
            rental: rental
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error cancelling rental',
            error: error.message
        });
    }
});

// GET /api/rentals/:id - Get rental by ID (MUST come after /:id/cancel)
router.get('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;

    try {
        const rental = await Rental.findByPk(id);

        if (!rental || rental.userId !== req.user.id) {
            return res.status(404).json({
                success: false,
                message: 'Rental not found'
            });
        }

        res.json({
            success: true,
            message: 'Rental retrieved successfully',
            rental: rental
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching rental',
            error: error.message
        })
    }
});

export { router as rentalRoutes };