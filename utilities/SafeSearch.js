import ServerCookies from 'cookies';
import ClientCookies from 'cookie-cutter';

import * as rating from '@/utilities/AgeRating';

export const SafeSearch = (ctx) => {
    var isSafeSearch = true;
    if (!ctx.req) {
        isSafeSearch = ClientCookies.get('images.adult.enabled')?.toLowerCase() != "true";
    } else if (ctx.req.headers?.cookie) {
        const cookies = new ServerCookies(ctx.req);
        isSafeSearch = cookies?.get('images.adult.enabled')?.toLowerCase() != "true";
    }

    return isSafeSearch;
}

export const SetSafeSearch = (yes) => {
    ClientCookies.set('images.adult.enabled', yes ? 'false' : 'true');
}

export const SafeSearchImage = (ratings, image, isSafeSearch) => {
    return rating.Age(ratings) > 17 && isSafeSearch ? '/images/adult-only-warning.jpg' : image;
}