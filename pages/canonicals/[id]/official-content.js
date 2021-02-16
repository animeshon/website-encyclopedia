import withContainer, { withContainerProps } from '@/components/Container';
import CanonizableContent from '@/components/Canonical/CanonizableContent';

import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';
import { ByContent } from '@/utilities/Premiere';
import * as stat from '@/utilities/ContentStatus';
import { Type } from '@/utilities/MediaType';

import getContent from '@/queries/canonical/Content';
import { ExecuteQuery, PrepareQuery } from '@/utilities/Query';


export const getProps = async (ctx, client, type) => {
    const { id } = ctx.query;
    const data = await ExecuteQuery(client, PrepareQuery({ id: id }, getContent()));

    const contents = (data.contents || []).map(i => {
        const { id, __typename, status, runnings, images, names, descriptions, ageRatings, releaseDate } = i;
        if (names.length === 0 || __typename == "Doujinshi") {
            return;
        }
        return {
            id: id,
            type: __typename,
            name: locale.EnglishAny(names),
            description: locale.English(descriptions),
            image: image.ProfileAny(images, ageRatings),
            media: Type(__typename),
            //type: Subtype(__typename, type),
            releaseDate: ByContent(__typename, releaseDate, runnings),
            status: stat.Status(status),
        };
    }).filter(c => { return c != undefined });

    return {
        contents: contents,
        title: "Official Content"
    };
};

export default withContainer(CanonizableContent);
export const getServerSideProps = withContainerProps(getProps);
