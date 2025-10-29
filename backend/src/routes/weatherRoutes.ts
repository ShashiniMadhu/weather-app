import { Router } from 'express';
import { getAllWeather, getWeatherByCity, getCitiesList } from '../controllers/weatherController';
import { checkJwt } from '../middleware/auth';

const router = Router();

// Public routes (for testing without auth)
router.get('/cities', getCitiesList);

// Protected routes (require authentication)
router.get('/weather', checkJwt, getAllWeather);
router.get('/weather/:cityCode', checkJwt, getWeatherByCity);

export default router;