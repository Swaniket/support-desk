const express = require("express");
const {getAdminKPI, getAllTickets} = require("../controllers/adminController")
const { protectAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

// @ GET: /api/admin/kpi
router.get("/kpi", protectAdmin, getAdminKPI);

// @ GET: /api/admin/allTickets
router.get("/allTickets", protectAdmin, getAllTickets);




module.exports = router;