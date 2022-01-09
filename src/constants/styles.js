import { isAndroid } from './screen';

export const blurRadius = isAndroid ? 3 : 8;
