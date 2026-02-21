import express from 'express';
import { Skateboard } from '../models/Skateboard.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/skateboards - Get all skateboards
router.get('/', async (req, res) => {
    try {
        const skateboards = await Skateboard.findAll();

        if (!skateboards || skateboards.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No skateboards found'
            });
        }

        res.json({
            success: true,
            skateboards: skateboards
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching skateboards',
            error: error.message
        });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const skateboard = await Skateboard.findByPk(id);
    
            if (!skateboard) {
                
                return res.status(404).json({
                    success: false,
                    message: 'Skateboard not found'
                });
            }

            res.json({
                success: true,
                skateboard: skateboard
            })
        } catch(error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching skateboard',
                error: error.message
            });
        }
});

router.post('/', authMiddleware, async (req, res) => {
    const { name, brand, type, pricePerHour } = req.body;

    if (!name || !pricePerHour || !brand || !type) {
        return res.status(400).json({
            success: false,
            message: 'All fields (name, brand, type, pricePerHour) are required'
        });
    }

    try {
        const skateboard = await Skateboard.create({ name, brand, type, pricePerHour });

        res.status(201).json({
            success: true,
            message: 'Skateboard created successfully',
            skateboard: skateboard
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating skateboard',
            error: error.message
        });
    }
});

export { router as skateboardRoutes };