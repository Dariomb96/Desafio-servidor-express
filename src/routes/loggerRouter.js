import { Router } from "express";
import logger from '../middleware/logger.js';

const loggerRouter = Router();


loggerRouter.get('/', (req, res) => {
  logger.debug('Debug message');
  logger.info('Info message');
  logger.warn('Warning message');
  logger.error('Error message');
  res.send('Logger test complete');
});

export {loggerRouter};