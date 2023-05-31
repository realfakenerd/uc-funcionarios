import { clientsClaim } from 'workbox-core';
import { pageCache, googleFontsCache, staticResourceCache } from 'workbox-recipes';

self.__WB_DISABLE_DEV_LOGS = true;

clientsClaim();

pageCache();

googleFontsCache();

staticResourceCache();
