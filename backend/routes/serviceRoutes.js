const express = require('express');
const router = express.Router();
const {
    getServices,
    getServiceBySlug,
    createServiceCategory,
    updateServiceCategory,
    deleteServiceCategory,
    addServiceItem,
    updateServiceItem,
    deleteServiceItem
} = require('../controllers/serviceController');

router.get('/', getServices);
router.post('/', createServiceCategory);
router.get('/:slug', getServiceBySlug);
router.put('/:slug', updateServiceCategory);
router.delete('/:slug', deleteServiceCategory);
router.post('/:slug/items', addServiceItem);
router.put('/items/:id', updateServiceItem);
router.delete('/items/:id', deleteServiceItem);

module.exports = router;
